// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { isEqual, sortBy } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { Sockets } from "@foxglove/electron-socket/renderer";
import Logger from "@foxglove/log";
import { RosNode } from "@foxglove/ros2";
import { RosMsgDefinition } from "@foxglove/rosmsg";
import { definitions as commonDefs } from "@foxglove/rosmsg-msgs-common";
import { definitions as foxgloveDefs } from "@foxglove/rosmsg-msgs-foxglove";
import { Time, fromMillis } from "@foxglove/rostime";
import { ParameterValue } from "@foxglove/studio";
import OsContextSingleton from "@foxglove/studio-base/OsContextSingleton";
import PlayerProblemManager from "@foxglove/studio-base/players/PlayerProblemManager";
import {
  AdvertiseOptions,
  MessageEvent,
  Player,
  PlayerMetricsCollectorInterface,
  PlayerPresence,
  PlayerState,
  PlayerProblem,
  PublishPayload,
  SubscribePayload,
  Topic,
} from "@foxglove/studio-base/players/types";
import debouncePromise from "@foxglove/studio-base/util/debouncePromise";
import rosDatatypesToMessageDefinition from "@foxglove/studio-base/util/rosDatatypesToMessageDefinition";
import { getTopicsByTopicName } from "@foxglove/studio-base/util/selectors";
import { TimestampMethod } from "@foxglove/studio-base/util/time";

const log = Logger.getLogger(__filename);
const rosLog = Logger.getLogger("ROS2");

const CAPABILITIES: string[] = [];

enum Problem {
  Connection = "Connection",
  Parameters = "Parameters",
  Graph = "Graph",
  Publish = "Publish",
}

type Ros2PlayerOpts = {
  domainId: number;
  metricsCollector: PlayerMetricsCollectorInterface;
};

// Connects to a ROS 2 network using RTPS over UDP, discovering peers via UDP multicast.
export default class Ros2Player implements Player {
  private _domainId: number; // ROS 2 DDS (RTPS) domain
  private _rosNode?: RosNode; // Our ROS node when we're connected.
  private _id: string = uuidv4(); // Unique ID for this player.
  private _listener?: (arg0: PlayerState) => Promise<void>; // Listener for _emitState().
  private _closed = false; // Whether the player has been completely closed using close().
  private _providerTopics?: Topic[]; // Topics as advertised by peers
  private _providerDatatypes = new Map<string, RosMsgDefinition>(); // All known ROS 2 message definitions.
  private _publishedTopics = new Map<string, Set<string>>(); // A map of topic names to the set of publisher IDs publishing each topic.
  private _subscribedTopics = new Map<string, Set<string>>(); // A map of topic names to the set of subscriber IDs subscribed to each topic.
  // private _services = new Map<string, Set<string>>(); // A map of service names to service provider IDs that provide each service.
  // private _parameters = new Map<string, ParameterValue>(); // rosparams
  private _start?: Time; // The time at which we started playing.
  // private _clockTime?: Time; // The most recent published `/clock` time, if available
  // private _clockReceived: Time = { sec: 0, nsec: 0 }; // The local time when `_clockTime` was last received
  private _requestedSubscriptions: SubscribePayload[] = []; // Requested subscriptions by setSubscriptions()
  private _parsedMessages: MessageEvent<unknown>[] = []; // Queue of messages that we'll send in next _emitState() call.
  private _messageOrder: TimestampMethod = "receiveTime";
  private _requestTopicsTimeout?: ReturnType<typeof setTimeout>; // setTimeout() handle for _requestTopics().
  private _hasReceivedMessage = false;
  private _metricsCollector: PlayerMetricsCollectorInterface;
  private _presence: PlayerPresence = PlayerPresence.INITIALIZING;
  private _problems = new PlayerProblemManager();
  private _emitTimer?: ReturnType<typeof setTimeout>;

  constructor({ domainId, metricsCollector }: Ros2PlayerOpts) {
    log.info(`initializing Ros2Player (domainId=${domainId})`);
    this._domainId = domainId;
    this._metricsCollector = metricsCollector;
    this._start = fromMillis(Date.now());
    this._metricsCollector.playerConstructed();

    // The ros1ToRos2Type() hack can be removed when @foxglove/rosmsg-msgs-* packages are updated to
    // natively support ROS 2
    for (const dataType in commonDefs) {
      const msgDef = (commonDefs as Record<string, RosMsgDefinition>)[dataType]!;
      this._providerDatatypes.set(dataType, msgDef);
      this._providerDatatypes.set(ros1ToRos2Type(dataType), msgDef);
    }
    for (const dataType in foxgloveDefs) {
      const msgDef = (foxgloveDefs as Record<string, RosMsgDefinition>)[dataType]!;
      if (!this._providerDatatypes.has(dataType)) {
        this._providerDatatypes.set(dataType, msgDef);
        this._providerDatatypes.set(ros1ToRos2Type(dataType), msgDef);
      }
    }

    void this._open();
  }

  private _open = async (): Promise<void> => {
    const os = OsContextSingleton;
    if (this._closed || os == undefined) {
      return;
    }
    this._presence = PlayerPresence.INITIALIZING;

    const net = await Sockets.Create();
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const udpSocketCreate = () => net.createUdpSocket();

    if (this._rosNode == undefined) {
      const rosNode = new RosNode({
        name: "/foxglovestudio",
        domainId: this._domainId,
        udpSocketCreate,
        getNetworkInterfaces: os.getNetworkInterfaces,
        log: rosLog,
      });
      this._rosNode = rosNode;

      // rosNode.on("paramUpdate", ({ key, value, prevValue, callerId }) => {
      //   log.debug("paramUpdate", key, value, prevValue, callerId);
      //   this._parameters = new Map(rosNode.parameters);
      // });
    }

    await this._rosNode.start();
    await this._requestTopics();
    this._presence = PlayerPresence.PRESENT;
  };

  private _addProblem(
    id: string,
    problem: PlayerProblem,
    { skipEmit = false }: { skipEmit?: boolean } = {},
  ): void {
    this._problems.addProblem(id, problem);
    if (!skipEmit) {
      this._emitState();
    }
  }

  // private _clearProblem(id: string, skipEmit = false): void {
  //   if (this._problems.removeProblem(id)) {
  //     if (!skipEmit) {
  //       this._emitState();
  //     }
  //   }
  // }

  private _clearPublishProblems({ skipEmit = false }: { skipEmit?: boolean } = {}) {
    if (
      this._problems.removeProblems(
        (id) =>
          id.startsWith("msgdef:") || id.startsWith("advertise:") || id.startsWith("publish:"),
      )
    ) {
      if (!skipEmit) {
        this._emitState();
      }
    }
  }

  private _requestTopics = async (): Promise<void> => {
    if (this._requestTopicsTimeout) {
      clearTimeout(this._requestTopicsTimeout);
    }
    const rosNode = this._rosNode;
    if (!rosNode || this._closed) {
      return;
    }

    try {
      const topicArrays = rosNode.getPublishedTopics();
      const topics = topicArrays.map(([name, datatype]) => ({ name, datatype }));
      // Sort them for easy comparison
      const sortedTopics: Topic[] = sortBy(topics, "name");

      if (this._providerTopics == undefined) {
        this._metricsCollector.initialized();
      }

      if (!isEqual(sortedTopics, this._providerTopics)) {
        this._providerTopics = sortedTopics;
      }

      // Try subscribing again, since we might now be able to subscribe to some new topics.
      this.setSubscriptions(this._requestedSubscriptions);

      // Subscribe to all parameters
      // try {
      //   const params = await rosNode.subscribeAllParams();
      //   if (!isEqual(params, this._parameters)) {
      //     this._parameters = new Map();
      //     params.forEach((value, key) => this._parameters.set(key, value));
      //   }
      //   this._clearProblem(Problem.Parameters, true);
      // } catch (error) {
      //   this._addProblem(
      //     Problem.Parameters,
      //     {
      //       severity: "warn",
      //       message: "ROS parameter fetch failed",
      //       tip: `Ensure that roscore is running and accessible at: ${this._url}`,
      //       error,
      //     },
      //     true,
      //   );
      // }

      // Fetch the full graph topology
      await this._updateConnectionGraph(rosNode);

      this._presence = PlayerPresence.PRESENT;
      this._emitState();
    } catch (error) {
      this._presence = PlayerPresence.INITIALIZING;
      this._addProblem(
        Problem.Connection,
        {
          severity: "error",
          message: "ROS connection failed",
          tip: `Ensure a ROS 2 DDS system is running on the local network and UDP multicast is supported`,
          error,
        },
        { skipEmit: false },
      );
    } finally {
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

    const providerTopics = this._providerTopics;
    const start = this._start;
    if (!providerTopics || !start) {
      return this._listener({
        presence: this._presence,
        progress: {},
        capabilities: CAPABILITIES,
        playerId: this._id,
        problems: this._problems.problems(),
        activeData: undefined,
      });
    }

    // Time is always moving forward even if we don't get messages from the server.
    // If we are not connected, don't emit updates since we are not longer getting new data
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
      presence: this._presence,
      progress: {},
      capabilities: CAPABILITIES,
      playerId: this._id,
      problems: this._problems.problems(),

      activeData: {
        messages,
        totalBytesReceived: this._rosNode?.receivedBytes() ?? 0,
        messageOrder: this._messageOrder,
        startTime: start,
        endTime: currentTime,
        currentTime,
        isPlaying: true,
        speed: 1,
        // We don't support seeking, so we need to set this to any fixed value. Just avoid 0 so
        // that we don't accidentally hit falsy checks.
        lastSeekTime: 1,
        topics: providerTopics,
        datatypes: this._providerDatatypes,
        publishedTopics: this._publishedTopics,
        subscribedTopics: this._subscribedTopics,
        // services: this._services,
        // parameters: this._parameters,
        parsedMessageDefinitionsByTopic: {},
      },
    });
  });

  setListener(listener: (arg0: PlayerState) => Promise<void>): void {
    this._listener = listener;
    this._emitState();
  }

  close(): void {
    this._closed = true;
    if (this._rosNode) {
      void this._rosNode.shutdown();
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

    if (!this._rosNode || this._closed) {
      return;
    }

    // Subscribe to additional topics used by Ros1Player itself
    this._addInternalSubscriptions(subscriptions);

    // See what topics we actually can subscribe to.
    const availableTopicsByTopicName = getTopicsByTopicName(this._providerTopics ?? []);
    const topicNames = subscriptions
      .map(({ topic }) => topic)
      .filter((topicName) => availableTopicsByTopicName[topicName]);

    // Subscribe to all topics that we aren't subscribed to yet.
    for (const topicName of topicNames) {
      const availTopic = availableTopicsByTopicName[topicName];
      if (!availTopic || this._rosNode.subscriptions.has(topicName)) {
        continue;
      }

      const { datatype: dataType } = availTopic;

      // Try to retrieve the ROS message definition for this topic
      let msgDefinition: RosMsgDefinition[] | undefined;
      try {
        msgDefinition = rosDatatypesToMessageDefinition(this._providerDatatypes, dataType);
      } catch (error) {
        this._addProblem(`msgdef:${topicName}`, {
          severity: "warn",
          message: `Unknown message definition for "${topicName}"`,
          tip: `Only core ROS 2 data types are currently supported`,
        });
      }

      const subscription = this._rosNode.subscribe({ topic: topicName, dataType, msgDefinition });

      subscription.on("message", (timestamp, message, data, _pub) =>
        this._handleMessage(topicName, timestamp, message, data.byteLength, true),
      );
    }

    // Unsubscribe from topics that we are subscribed to but shouldn't be.
    for (const topicName of this._rosNode.subscriptions.keys()) {
      if (!topicNames.includes(topicName)) {
        {
          this._rosNode.unsubscribe(topicName);
        }
      }
    }
  }

  private _handleMessage = (
    topic: string,
    timestamp: Time,
    message: unknown,
    sizeInBytes: number,
    // This is a hot path so we avoid extra object allocation from a parameters struct
    // eslint-disable-next-line @foxglove/no-boolean-parameters
    external: boolean,
  ): void => {
    if (this._providerTopics == undefined) {
      return;
    }

    // const receiveTime = fromMillis(Date.now());
    const receiveTime = timestamp;

    if (external && !this._hasReceivedMessage) {
      this._hasReceivedMessage = true;
      this._metricsCollector.recordTimeToFirstMsgs();
    }

    const msg: MessageEvent<unknown> = { topic, receiveTime, message, sizeInBytes };
    this._parsedMessages.push(msg);
    this._handleInternalMessage(msg);

    this._emitState();
  };

  setPublishers(_publishers: AdvertiseOptions[]): void {
    if (!this._rosNode || this._closed) {
      return;
    }

    // const validPublishers = publishers.filter(({ topic }) => topic.length > 0 && topic !== "/");
    // const topics = new Set<string>(validPublishers.map(({ topic }) => topic));

    // Clear all problems related to publishing
    this._clearPublishProblems({ skipEmit: false });

    // Unadvertise any topics that were previously published and no longer appear in the list
    // for (const topic of this._rosNode.publications.keys()) {
    //   if (!topics.has(topic)) {
    //     this._rosNode.unadvertise(topic);
    //   }
    // }

    // // Unadvertise any topics where the dataType changed
    // for (const { topic, datatype } of validPublishers) {
    //   const existingPub = this._rosNode.publications.get(topic);
    //   if (existingPub != undefined && existingPub.dataType !== datatype) {
    //     this._rosNode.unadvertise(topic);
    //   }
    // }

    // // Advertise new topics
    // for (const { topic, datatype: dataType, datatypes } of validPublishers) {
    //   if (this._rosNode.publications.has(topic)) {
    //     continue;
    //   }

    //   const msgdefProblemId = `msgdef:${topic}`;
    //   const advertiseProblemId = `advertise:${topic}`;

    //   // Try to retrieve the ROS message definition for this topic
    //   let msgdef: RosMsgDefinition[];
    //   try {
    //     msgdef = rosDatatypesToMessageDefinition(datatypes, dataType);
    //   } catch (error) {
    //     this._addProblem(msgdefProblemId, {
    //       severity: "warn",
    //       message: `Unknown message definition for "${topic}"`,
    //       tip: `Try subscribing to the topic "${topic} before publishing to it`,
    //     });
    //     continue;
    //   }

    //   // Advertise this topic to ROS as being published by us
    //   this._rosNode.advertise({ topic, dataType, messageDefinition: msgdef }).catch((error) =>
    //     this._addProblem(advertiseProblemId, {
    //       severity: "error",
    //       message: `Failed to advertise "${topic}"`,
    //       error,
    //     }),
    //   );
    // }

    this._emitState();
  }

  setParameter(_key: string, _value: ParameterValue): void {
    // log.debug(`Ros1Player.setParameter(key=${key}, value=${value})`);
    // this._rosNode?.setParameter(key, value);
  }

  publish(_payload: PublishPayload): void {
    // const problemId = `publish:${topic}`;
    // if (this._rosNode != undefined) {
    //   if (this._rosNode.isAdvertising(topic)) {
    //     this._rosNode
    //       .publish(topic, msg)
    //       .then(() => this._clearProblem(problemId))
    //       .catch((error) =>
    //         this._addProblem(problemId, {
    //           severity: "error",
    //           message: `Publishing to ${topic} failed`,
    //           error,
    //         }),
    //       );
    //   } else {
    //     this._addProblem(problemId, {
    //       severity: "warn",
    //       message: `Unable to publish to "${topic}"`,
    //       tip: `ROS1 may be disconnected. Please try again in a moment`,
    //     });
    //   }
    // }
  }

  // Bunch of unsupported stuff. Just don't do anything for these.
  requestBackfill(): void {
    // no-op
  }
  setGlobalVariables(): void {
    // no-op
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

  private _handleInternalMessage(_msg: MessageEvent<unknown>): void {
    // const maybeClockMsg = msg.message as { clock?: Time };
    // if (msg.topic === "/clock" && maybeClockMsg.clock && !isNaN(maybeClockMsg.clock?.sec)) {
    //   const time = maybeClockMsg.clock;
    //   const seconds = toSec(maybeClockMsg.clock);
    //   if (isNaN(seconds)) {
    //     return;
    //   }
    //   if (this._clockTime == undefined) {
    //     this._start = time;
    //   }
    //   this._clockTime = time;
    //   this._clockReceived = msg.receiveTime;
    // }
  }

  private async _updateConnectionGraph(_rosNode: RosNode): Promise<void> {
    //     try {
    //       const graph = await rosNode.getSystemState();
    //       if (
    //         !isEqual(this._publishedTopics, graph.publishers) ||
    //         !isEqual(this._subscribedTopics, graph.subscribers) ||
    //         !isEqual(this._services, graph.services)
    //       ) {
    //         this._publishedTopics = graph.publishers;
    //         this._subscribedTopics = graph.subscribers;
    //         this._services = graph.services;
    //       }
    //       this._clearProblem(Problem.Graph, true);
    //     } catch (error) {
    //       this._addProblem(
    //         Problem.Graph,
    //         {
    //           severity: "warn",
    //           message: "Unable to update connection graph",
    //           tip: `The connection graph contains information about publishers and subscribers. A
    // stale graph may result in missing topics you expect. Ensure that roscore is reachable at ${this._url}.`,
    //           error,
    //         },
    //         true,
    //       );
    //       this._publishedTopics = new Map();
    //       this._subscribedTopics = new Map();
    //       this._services = new Map();
    //     }
  }

  private _getCurrentTime(): Time {
    const now = fromMillis(Date.now());
    return now;
    // if (this._clockTime == undefined) {
    //   return now;
    // }

    // const delta = subtractTimes(now, this._clockReceived);
    // return addTimes(this._clockTime, delta);
  }
}

function ros1ToRos2Type(dataType: string): string {
  const parts = dataType.split("/");
  if (parts.length === 2) {
    return `${parts[0]}/msg/${parts[1]}`;
  }
  return dataType;
}
