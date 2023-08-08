// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2019-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import * as Proto from "@zhito/proto";
import { isEqual, sortBy } from "lodash";
import roslib from "roslib";
import { v4 as uuidv4 } from "uuid";

import Log from "@foxglove/log";
import type { RosGraph } from "@foxglove/ros1";
import { parse as parseMessageDefinition } from "@foxglove/rosmsg";
import { LazyMessageReader } from "@foxglove/rosmsg-serialization";
import { MessageReader as ROS2MessageReader } from "@foxglove/rosmsg2-serialization";
import {
  Time,
  add as addTimes,
  fromMillis,
  subtract as subtractTimes,
  toSec,
} from "@foxglove/rostime";
import { ParameterValue } from "@foxglove/studio";
import { updateDreamviewPlayer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import PlayerProblemManager from "@foxglove/studio-base/players/PlayerProblemManager";
import {
  AdvertiseOptions,
  MessageEvent,
  Player,
  PlayerCapabilities,
  PlayerState,
  PublishPayload,
  SubscribePayload,
  Topic,
  ParsedMessageDefinitionsByTopic,
  PlayerPresence,
  PlayerMetricsCollectorInterface,
} from "@foxglove/studio-base/players/types";
import { RosDatatypes } from "@foxglove/studio-base/types/RosDatatypes";
import { bagConnectionsToDatatypes } from "@foxglove/studio-base/util/bagConnectionsHelper";
import debouncePromise from "@foxglove/studio-base/util/debouncePromise";
import { WEBVIZ_LANE_TOPIC, WEBVIZ_LOC_OFFSET_TOPIC, WEBVIZ_ZIC_OFFSET_TOPIC, ZHITO_MAP_DATATYPE, ZHITO_MAP_PROTO, ZHITO_MAP_TOPIC } from "@foxglove/studio-base/util/globalConstants";
import { getTopicsByTopicName } from "@foxglove/studio-base/util/selectors";
import { TimestampMethod } from "@foxglove/studio-base/util/time";


const log = Log.getLogger(__dirname);

const CAPABILITIES = [
  PlayerCapabilities.advertise,
  PlayerCapabilities.getParameters,
  PlayerCapabilities.setParameters,
];

const TYPE_DEFS = {
  "zhito2ros_msg/ZhitoProto": `
  string proto
  uint8[] data
  `,
  "webviz/Float": `
  float32 value
  `,
  "zhito2ros_msg/ZhitoPose2": `


  geometry_msgs/Point  position

  # A quaternion that represents the rotation from the IMU coordinate
  # (Right/Forward/Up) to the
  # world coordinate (East/North/Up).
  geometry_msgs/Quaternion orientation

  # Linear velocity of the VRP in the map reference frame.
  # East/north/up in meters per second.
  geometry_msgs/Point linear_velocity

  # Linear acceleration of the VRP in the map reference frame.
  # East/north/up in meters per second.
  geometry_msgs/Point linear_acceleration
  # Angular velocity of the vehicle in the map reference frame.
  # Around east/north/up axes in radians per second.
  geometry_msgs/Point angular_velocity

  # Heading
  # The heading is zero when the car is facing East and positive when facing
  # North.
  float64 heading

  # Linear acceleration of the VRP in the vehicle reference frame.
  # Right/forward/up in meters per square second.
  geometry_msgs/Point linear_acceleration_vrf

  # Angular velocity of the VRP in the vehicle reference frame.
  # Around right/forward/up axes in radians per second.
  geometry_msgs/Point angular_velocity_vrf

  # Roll/pitch/yaw that represents a rotation with intrinsic sequence z-x-y.
  # in world coordinate (East/North/Up)
  # The roll, in (-pi/2, pi/2), corresponds to a rotation around the y-axis.
  # The pitch, in [-pi, pi), corresponds to a rotation around the x-axis.
  # The yaw, in [-pi, pi), corresponds to a rotation around the z-axis.
  # The direction of rotation follows the right-hand rule.
  geometry_msgs/Point euler_angles

  # Linear velocity of the VRP in the vehicle reference frame.
  # Right/forward/up in meters per square second.
  geometry_msgs/Point linear_velocity_vrf

  geometry_msgs/Point  position_llh # 纬度，经度，高度 rad rad 米
  `
}

// let msgCount = 0
// let msgTotalTime = 1
// let startTime;
// Connects to `rosbridge_server` instance using `roslibjs`. Currently doesn't support seeking or
// showing simulated time, so current time from Date.now() is always used instead. Also doesn't yet
// support raw ROS messages; instead we use the CBOR compression provided by roslibjs, which
// unmarshalls into plain JS objects.
export default class RosbridgePlayer implements Player {
  public onlinePlayer:boolean;
  private _url: string; // WebSocket URL.
  private _rosClient?: roslib.Ros; // The roslibjs client when we're connected.
  private _id: string = uuidv4(); // Unique ID for this player.
  private _listener?: (arg0: PlayerState) => Promise<void>; // Listener for _emitState().
  private _closed: boolean = false; // Whether the player has been completely closed using close().
  private _providerTopics?: Topic[]; // Topics as published by the WebSocket.
  private _providerDatatypes?: RosDatatypes; // Datatypes as published by the WebSocket.
  private _publishedTopics = new Map<string, Set<string>>(); // A map of topic names to the set of publisher IDs publishing each topic.
  private _subscribedTopics = new Map<string, Set<string>>(); // A map of topic names to the set of subscriber IDs subscribed to each topic.
  private _parameterInstances = new Map<string, roslib.Param>();
  private _parameters = new Map<string, ParameterValue>(); // rosparams
  private _services = new Map<string, Set<string>>(); // A map of service names to service provider IDs that provide each service.
  private _messageReadersByDatatype: {
    [datatype: string]: LazyMessageReader | ROS2MessageReader;
  } = {};
  private _start?: Time; // The time at which we started playing.
  private _clockTime?: Time; // The most recent published `/clock` time, if available
  private _clockReceived: Time = { sec: 0, nsec: 0 }; // The local time when `_clockTime` was last received
  // active subscriptions
  private _topicSubscriptions = new Map<string, roslib.Topic>();
  private _requestedSubscriptions: SubscribePayload[] = []; // Requested subscriptions by setSubscriptions()
  private _parsedMessages: MessageEvent<unknown>[] = []; // Queue of messages that we'll send in next _emitState() call.
  private _messageOrder: TimestampMethod = "receiveTime";
  private _requestTopicsTimeout?: ReturnType<typeof setTimeout>; // setTimeout() handle for _requestTopics().
  // active publishers for the current connection
  private _topicPublishers = new Map<string, roslib.Topic>();
  // which topics we want to advertise to other nodes
  private _advertisements: AdvertiseOptions[] = [];
  private _parsedMessageDefinitionsByTopic: ParsedMessageDefinitionsByTopic = {};
  private _parsedTopics: Set<string> = new Set();
  private _receivedBytes: number = 0;
  private _metricsCollector: PlayerMetricsCollectorInterface;
  private _hasReceivedMessage = false;
  private _presence: PlayerPresence = PlayerPresence.NOT_PRESENT;
  private _problems = new PlayerProblemManager();
  private _emitTimer?: ReturnType<typeof setTimeout>;
  private _pageActive: boolean

  constructor({
    url,
    metricsCollector,
  }: {
    url: string;
    metricsCollector: PlayerMetricsCollectorInterface;
  }) {
    this.onlinePlayer = true;
    this._presence = PlayerPresence.INITIALIZING;
    this._metricsCollector = metricsCollector;
    this._url = url;
    this._start = fromMillis(Date.now());
    this._metricsCollector.playerConstructed();
    this._open();
    this._pageActive = true;
    updateDreamviewPlayer(this);
  }

  private _open = (): void => {
    if (this._closed) {
      return;
    }
    if (this._rosClient != undefined) {
      throw new Error(`Attempted to open a second Rosbridge connection`);
    }

    document.addEventListener('visibilitychange', () => { //浏览器切换事件
      if (document.visibilityState == 'hidden') { //状态判断
        this._pageActive = false;
      } else {
        this._pageActive = true;
      }
    })
    this._problems.removeProblem("rosbridge:connection-failed");
    log.info(`Opening connection to ${this._url}`);

    // `workersocket` will open the actual WebSocket connection in a WebWorker.
    const rosClient = new roslib.Ros({ url: this._url, transportLibrary: "workersocket" });

    rosClient.on("connection", () => {
      if (this._closed) {
        return;
      }
      this._presence = PlayerPresence.PRESENT;
      this._problems.removeProblem("rosbridge:connection-failed");
      this._rosClient = rosClient;

      this._setupPublishers();
      void this._requestTopics();
    });

    rosClient.on("error", (err) => {
      if (err) {
        this._problems.addProblem("rosbridge:error", {
          severity: "warn",
          message: "Rosbridge error",
          error: err,
        });
        this._emitState();
      }
    });

    rosClient.on("close", () => {
      this._presence = PlayerPresence.RECONNECTING;

      if (this._requestTopicsTimeout) {
        clearTimeout(this._requestTopicsTimeout);
      }
      for (const [topicName, topic] of this._topicSubscriptions) {
        topic.unsubscribe();
        this._topicSubscriptions.delete(topicName);
      }
      rosClient.close(); // ensure the underlying worker is cleaned up
      delete this._rosClient;

      this._problems.addProblem("rosbridge:connection-failed", {
        severity: "error",
        message: "Connection failed",
        tip: `Check that the rosbridge WebSocket server at ${this._url} is reachable.`,
      });

      this._emitState();

      // Try connecting again.
      setTimeout(this._open, 3000);
    });
  };

  private _requestTopics = async (): Promise<void> => {
    // clear problems before each topics request so we don't have stale problems from previous failed requests
    this._problems.removeProblems((id) => id.startsWith("requestTopics:"));

    if (this._requestTopicsTimeout) {
      clearTimeout(this._requestTopicsTimeout);
    }
    const rosClient = this._rosClient;
    if (!rosClient || this._closed) {
      return;
    }

    try {
      const result = await new Promise<{
        topics: string[];
        types: string[];
        typedefs_full_text: string[];
      }>((resolve, reject) => rosClient.getTopicsAndRawTypes(resolve, reject));

      const topicsMissingDatatypes: string[] = [];
      const topics: Topic[] = [];
      const datatypeDescriptions = [];
      const messageReaders: Record<string, LazyMessageReader | ROS2MessageReader> = {};

      // Automatically detect the ROS version based on the datatypes.
      // The rosbridge server itself publishes /rosout so the topic should be reliably present.
      let rosVersion: 1 | 2;
      if (result.types.includes("rcl_interfaces/msg/Log")) {
        rosVersion = 2;
        this._problems.removeProblem("unknownRosVersion");
      } else if (result.types.includes("rosgraph_msgs/Log")) {
        rosVersion = 1;
        this._problems.removeProblem("unknownRosVersion");
      } else {
        rosVersion = 1;
        this._problems.addProblem("unknownRosVersion", {
          severity: "warn",
          message: "Unable to detect ROS version, assuming ROS 1",
        });
      }

      for (let i = 0; i < result.topics.length; i++) {
        const topicName = result.topics[i]!;
        const type = result.types[i];
        const proto = type === "zhito2ros_msg/ZhitoProto" ? await this.getParameter(topicName + "/proto", true) : "";
        let messageDefinition = result.typedefs_full_text[i];
        if (messageDefinition === "" || !messageDefinition) {
          //@ts-ignore
          messageDefinition = TYPE_DEFS[type as string] ?? "";
        }
        if (type == undefined || messageDefinition == undefined) {
          topicsMissingDatatypes.push(topicName);
          continue;
        }
        topics.push({ name: topicName, datatype: type, proto });
        datatypeDescriptions.push({ type, messageDefinition });
        const parsedDefinition = parseMessageDefinition(messageDefinition, {
          ros2: rosVersion === 2,
        });
        messageReaders[type] ??=
          rosVersion === 1
            ? new LazyMessageReader(parsedDefinition)
            : new ROS2MessageReader(parsedDefinition);
        this._parsedMessageDefinitionsByTopic[topicName] = parsedDefinition;
      }

      // Sort them for easy comparison. If nothing has changed here, bail out.
      const sortedTopics = sortBy(topics, "name");
      if (isEqual(sortedTopics, this._providerTopics)) {
        return;
      }

      if (topicsMissingDatatypes.length > 0) {
        this._problems.addProblem("requestTopics:missing-types", {
          severity: "warn",
          message: "Could not resolve all message types",
          tip: `Message types could not be found for these topics: ${topicsMissingDatatypes.join(
            ",",
          )}`,
        });
      }

      if (this._providerTopics == undefined) {
        this._metricsCollector.initialized();
      }

      this._providerTopics = sortedTopics.concat([{
        name: ZHITO_MAP_TOPIC,
        datatype: ZHITO_MAP_DATATYPE,
        proto: ZHITO_MAP_PROTO
      },{
        name: WEBVIZ_LOC_OFFSET_TOPIC,
        datatype: "std_msgs/Float32",
        proto: ""
      },{
        name: WEBVIZ_ZIC_OFFSET_TOPIC,
        datatype: "std_msgs/Float32",
        proto: ""
      },{
        name: WEBVIZ_LANE_TOPIC,
        datatype: "zhito2ros_msg/ZhitoProto",
        proto: "zhito.map.ILane"
      },{
        name: "/EmptyImage",
        datatype:"sensor_msgs/Image"
      }]);
      this._providerDatatypes = bagConnectionsToDatatypes(datatypeDescriptions, {
        ros2: rosVersion === 2,
      });
      this._messageReadersByDatatype = messageReaders;

      // Try subscribing again, since we might now be able to subscribe to some new topics.
      this.setSubscriptions(this._requestedSubscriptions);

      // Fetch the full graph topology
      try {
        const graph = await this._getSystemState();
        this._publishedTopics = graph.publishers;
        this._subscribedTopics = graph.subscribers;
        this._services = graph.services;
      } catch (error) {
        this._problems.addProblem("requestTopics:system-state", {
          severity: "error",
          message: "Failed to fetch node details from rosbridge",
          error,
        });
        this._publishedTopics = new Map();
        this._subscribedTopics = new Map();
        this._services = new Map();
      }
    } catch (error) {
      this._problems.addProblem("requestTopics:error", {
        severity: "error",
        message: "Failed to fetch topics from rosbridge",
        error,
      });
    } finally {
      this._emitState();

      // Regardless of what happens, request topics again in a little bit.
      this._requestTopicsTimeout = setTimeout(this._requestTopics, 3000);
    }
  };

  // Potentially performance-sensitive; await can be expensive
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  private _emitState = debouncePromise(() => {
    if (!this._listener || this._closed) {
      return Promise.resolve();
    }

    const { _providerTopics, _providerDatatypes, _start } = this;
    if (!_providerTopics || !_providerDatatypes || !_start) {
      return this._listener({
        name: this._url,
        presence: this._presence,
        progress: {},
        capabilities: CAPABILITIES,
        playerId: this._id,
        activeData: undefined,
        problems: this._problems.problems(),
        urlState: {
          url: this._url,
        },
      });
    }

    // When connected
    // Time is always moving forward even if we don't get messages from the server.
    if (this._presence === PlayerPresence.PRESENT) {
      if (this._emitTimer != undefined) {
        clearTimeout(this._emitTimer);
      }
      this._emitTimer = setTimeout(this._emitState, 100);
    }

    const currentTime = this._getCurrentTime();
    const messages = this._parsedMessages;
    this._parsedMessages = [];
    return this._listener({
      name: this._url,
      presence: this._presence,
      progress: {},
      capabilities: CAPABILITIES,
      playerId: this._id,
      problems: this._problems.problems(),
      urlState: {
        url: this._url,
      },

      activeData: {
        messages,
        totalBytesReceived: this._receivedBytes,
        messageOrder: this._messageOrder,
        startTime: _start,
        endTime: currentTime,
        currentTime,
        isPlaying: true,
        speed: 1,
        // We don't support seeking, so we need to set this to any fixed value. Just avoid 0 so
        // that we don't accidentally hit falsy checks.
        lastSeekTime: 1,
        topics: _providerTopics,
        datatypes: _providerDatatypes,
        publishedTopics: this._publishedTopics,
        subscribedTopics: this._subscribedTopics,
        services: this._services,
        parameters: this._parameters,
        refreshParameters: this.refreshParameters,
        parsedMessageDefinitionsByTopic: this._parsedMessageDefinitionsByTopic,
      },
    });
  });

  setListener(listener: (arg0: PlayerState) => Promise<void>): void {
    this._listener = listener;
    this._emitState();
  }

  close(): void {
    this._closed = true;
    if (this._rosClient) {
      this._rosClient.close();
    }
    if (this._emitTimer != undefined) {
      clearTimeout(this._emitTimer);
      this._emitTimer = undefined;
    }
    this._metricsCollector.close();
    this._hasReceivedMessage = false;
  }

  setSubscriptions(subscriptions: SubscribePayload[]): void {
    this._requestedSubscriptions = subscriptions;

    if (!this._rosClient || this._closed) {
      return;
    }

    // Subscribe to additional topics used by Ros1Player itself
    this._addInternalSubscriptions(subscriptions);

    this._parsedTopics = new Set(subscriptions.map(({ topic }) => topic));

    // See what topics we actually can subscribe to.
    const availableTopicsByTopicName = getTopicsByTopicName(this._providerTopics ?? []);
    const topicNames = subscriptions
      .map(({ topic }) => topic)
      .filter((topicName) => availableTopicsByTopicName[topicName]);

    // Subscribe to all topics that we aren't subscribed to yet.
    for (const topicName of topicNames) {
      if (this._topicSubscriptions.has(topicName)) {
        continue;
      }
      const topic = new roslib.Topic({
        ros: this._rosClient,
        name: topicName,
        compression: "cbor-raw",
      });
      const availTopic = availableTopicsByTopicName[topicName];
      if (!availTopic) {
        continue;
      }

      const { datatype } = availTopic;
      const messageReader = this._messageReadersByDatatype[datatype];
      if (!messageReader) {
        continue;
      }

      const problemId = `message:${topicName}`;
      topic.subscribe((message) => {
        if (!this._providerTopics||!this._pageActive) {
          return;
        }
        try {
          const receiveTime = fromMillis(Date.now());
          const buffer = (message as { bytes: ArrayBuffer }).bytes;
          const bytes = new Uint8Array(buffer);

          // This conditional can be removed when the ROS2 deserializer supports size()
          if (messageReader instanceof LazyMessageReader) {
            const msgSize = messageReader.size(bytes);
            if (msgSize > bytes.byteLength) {
              this._problems.addProblem(problemId, {
                severity: "error",
                message: `Message buffer not large enough on ${topicName}`,
                error: new Error(
                  `Cannot read ${msgSize} byte message from ${bytes.byteLength} byte buffer`,
                ),
              });
              this._emitState();
              return;
            }
          }

          let innerMessage = messageReader.readMessage(bytes);

          try {
            const protoMsg = innerMessage as { proto: string, data: ArrayBuffer }
            if (protoMsg.proto) {
              const keys = protoMsg.proto.split(".");
              let decoder = Proto as any;
              keys.map(key => {
                decoder = decoder[key] || {};
              })
              if (decoder?.decode) {
                innerMessage = decoder.decode(protoMsg.data) as unknown
              }
              // console.log(protoMsg.proto, "innerMessage.proto")
            }
          } catch (e) {
            console.error("decode err:", e)
            return;
          }

          if (datatype === "zhito2ros_msg/ZhitoJson") {
            try {
              //@ts-ignore
              if (innerMessage.data !== "") {
                const message = innerMessage as { type: string, data: string }
                const data = JSON.parse(message.data)
                innerMessage = { type: message.type, data } as unknown
              }

            } catch (e) { return }

          }



          if (!this._hasReceivedMessage) {
            this._hasReceivedMessage = true;
            this._metricsCollector.recordTimeToFirstMsgs();
          }

          if (this._parsedTopics.has(topicName)) {
            const msg: MessageEvent<unknown> = {
              topic: topicName,
              receiveTime,
              message: innerMessage,
              sizeInBytes: bytes.byteLength,
            };

            this._parsedMessages.push(msg);
            this._handleInternalMessage(msg);


          }
          this._problems.removeProblem(problemId);
        } catch (error) {
          this._problems.addProblem(problemId, {
            severity: "error",
            message: `Failed to parse message on ${topicName}`,
            error,
          });
        }

        this._emitState();
      });
      this._topicSubscriptions.set(topicName, topic);
    }

    // Unsubscribe from topics that we are subscribed to but shouldn't be.
    for (const [topicName, topic] of this._topicSubscriptions) {
      if (!topicNames.includes(topicName)) {
        topic.unsubscribe();
        this._topicSubscriptions.delete(topicName);
      }
    }
  }

  setPublishers(publishers: AdvertiseOptions[]): void {
    // Since `setPublishers` is rarely called, we can get away with just throwing away the old
    // Roslib.Topic objects and creating new ones.
    for (const publisher of this._topicPublishers.values()) {
      publisher.unadvertise();
    }
    this._topicPublishers.clear();
    this._advertisements = publishers;
    this._setupPublishers();
  }

  async setParameter(key: string, value: ParameterValue): Promise<boolean> {
    return await new Promise(resolve => {
      if (!this._rosClient) {
        resolve(false);
        return;
      }

      const paramInstace = this._getParamInstance(key, this._rosClient);
      paramInstace.set(value, (_response): void => {
        resolve(true);
      })
      // throw new Error("Parameter editing is not supported by the Rosbridge connection");
    })
  }

  async getParameter(key: string, useCache: boolean = false): Promise<ParameterValue> {
    return await new Promise((resolve, reject) => {
      if (!this._rosClient) {
        reject("rosClient not init");
        return;
      }
      if (useCache && this._parameters.get(key) !== undefined) {
        resolve(this._parameters.get(key));
      } else {
        const paramInstace = this._getParamInstance(key, this._rosClient);
        paramInstace.get((response): void => {
          this._parameters.set(key, response);
          resolve(response);
        })
      }

      // throw new Error("Parameter editing is not supported by the Rosbridge connection");
    })
  }

  async refreshParameters(): Promise<boolean> {
    return await new Promise(resolve => {
      if (!this._rosClient) {
        resolve(false);
      } else {
        this._rosClient.getParams((paramlist: string[]) => {
          paramlist.map(name => {
            this.getParameter(name).then(value => {
              this._parameters.set(name, value)
            }).catch(_err => {

            });
          })
        })
      }
    })

  }

  _getParamInstance(key: string, ros: roslib.Ros): roslib.Param {
    let instance = this._parameterInstances.get(key);
    if (!instance) {
      instance = new roslib.Param({
        ros,
        name: key
      })
      this._parameterInstances.set(key, instance);
    }
    return instance;
  }

  publish({ topic, msg }: PublishPayload): void {
    const publisher = this._topicPublishers.get(topic);
    if (!publisher) {
      throw new Error(
        `Tried to publish on a topic that is not registered as a publisher: ${topic}`,
      );
    }
    publisher.publish(msg);
  }

  // Bunch of unsupported stuff. Just don't do anything for these.
  startPlayback(): void {
    // no-op
  }
  pausePlayback(): void {
    // no-op
  }
  seekPlayback(_time: Time): void {
    // no-op
  }
  setPlaybackSpeed(_speedFraction: number): void {
    // no-op
  }
  requestBackfill(): void {
    // no-op
  }
  setGlobalVariables(): void {
    // no-op
  }

  sendLocalMessage<T>(topicName:string, data:T):void{
    const now = Date.now();
    const sec = Math.floor(now / 1000);
    const nsec = Math.floor((now - sec * 1000) * 1e6);
    const msg = {
      receiveTime: { sec, nsec },
      topic: topicName,
      message: data,
      sizeInBytes: undefined
    }
    //@ts-ignore
    this._handleInternalMessage(msg);
    //@ts-ignore
    this._parsedMessages.push(msg);
  }

  private _setupPublishers(): void {
    // This function will be called again once a connection is established
    if (!this._rosClient) {
      return;
    }

    if (this._advertisements.length <= 0) {
      return;
    }

    for (const { topic, datatype } of this._advertisements) {
      this._topicPublishers.set(
        topic,
        new roslib.Topic({
          ros: this._rosClient,
          name: topic,
          messageType: datatype,
          queue_size: 0,
        }),
      );
    }
  }

  private _addInternalSubscriptions(subscriptions: SubscribePayload[]): void {
    // Always subscribe to /clock if available
    if (subscriptions.find((sub) => sub.topic === "/clock") == undefined) {
      subscriptions.unshift({
        topic: "/clock",
        requester: { type: "other", name: "Ros1Player" },
      });
    }
  }

  private _handleInternalMessage(msg: MessageEvent<unknown>): void {
    const maybeClockMsg = msg.message as { clock?: Time };

    if (msg.topic === "/clock" && maybeClockMsg.clock && !isNaN(maybeClockMsg.clock?.sec)) {
      const time = maybeClockMsg.clock;
      const seconds = toSec(maybeClockMsg.clock);
      if (isNaN(seconds)) {
        return;
      }

      if (this._clockTime == undefined) {
        this._start = time;
      }

      this._clockTime = time;
      this._clockReceived = msg.receiveTime;
    }
  }

  private _getCurrentTime(): Time {
    const now = fromMillis(Date.now());
    if (this._clockTime == undefined) {
      return now;
    }

    const delta = subtractTimes(now, this._clockReceived);
    return addTimes(this._clockTime, delta);
  }

  private async _getSystemState(): Promise<RosGraph> {
    const output: RosGraph = {
      publishers: new Map<string, Set<string>>(),
      subscribers: new Map<string, Set<string>>(),
      services: new Map<string, Set<string>>(),
    };

    const addEntry = (map: Map<string, Set<string>>, key: string, value: string) => {
      let entries = map.get(key);
      if (entries == undefined) {
        entries = new Set<string>();
        map.set(key, entries);
      }
      entries.add(value);
    };

    return await new Promise((resolve, reject) => {
      this._rosClient?.getNodes(async (nodes) => {
        await Promise.all(
          nodes.map((node) => {
            this._rosClient?.getNodeDetails(
              node,
              (subscriptions, publications, services) => {
                publications.forEach((pub) => addEntry(output.publishers, pub, node));
                subscriptions.forEach((sub) => addEntry(output.subscribers, sub, node));
                services.forEach((srv) => addEntry(output.services, srv, node));
              },
              reject,
            );
          }),
        );

        resolve(output);
      }, reject);
    });
  }
}
