// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { isEqual } from "lodash";
import protobufjs from "protobufjs";
import descriptor from "protobufjs/ext/descriptor";
import decompressLZ4 from "wasm-lz4";

import { ChannelInfo, McapReader, McapRecord } from "@foxglove/mcap";
import { parse as parseMessageDefinition } from "@foxglove/rosmsg";
import { LazyMessageReader } from "@foxglove/rosmsg-serialization";
import { MessageReader as ROS2MessageReader } from "@foxglove/rosmsg2-serialization";
import {
  Time,
  compare,
  isLessThan,
  isGreaterThan,
  isTimeInRangeInclusive,
} from "@foxglove/rostime";
import { MessageEvent, Topic } from "@foxglove/studio-base/players/types";
import {
  RandomAccessDataProvider,
  ExtensionPoint,
  GetMessagesResult,
  GetMessagesTopics,
  InitializationResult,
  Connection,
} from "@foxglove/studio-base/randomAccessDataProviders/types";
import { RosDatatypes } from "@foxglove/studio-base/types/RosDatatypes";

type Options = { file: File };

export default class McapDataProvider implements RandomAccessDataProvider {
  private options: Options;
  private messagesByChannel?: Map<number, MessageEvent<unknown>[]>;

  constructor(options: Options) {
    this.options = options;
  }

  async initialize(_extensionPoint: ExtensionPoint): Promise<InitializationResult> {
    const { file } = this.options;
    await decompressLZ4.isLoaded;

    const streamReader = (file.stream() as ReadableStream<Uint8Array>).getReader();

    const messagesByChannel = new Map<number, MessageEvent<unknown>[]>();
    const channelInfoById = new Map<
      number,
      {
        info: ChannelInfo;
        messageDeserializer: ROS2MessageReader | LazyMessageReader | protobufjs.Type;
      }
    >();

    let startTime: Time | undefined;
    let endTime: Time | undefined;
    function processRecord(record: McapRecord) {
      switch (record.type) {
        default:
          break;

        case "ChannelInfo": {
          const existingInfo = channelInfoById.get(record.id);
          if (existingInfo) {
            if (!isEqual(existingInfo.info, record)) {
              throw new Error(`differing channel infos for for ${record.id}`);
            }
            break;
          }
          let messageDeserializer;
          if (record.encoding === "ros1") {
            const parsedDefinitions = parseMessageDefinition(record.schema);
            messageDeserializer = new LazyMessageReader(parsedDefinitions);
          } else if (record.encoding === "ros2") {
            const parsedDefinitions = parseMessageDefinition(record.schema, {
              ros2: true,
            });
            messageDeserializer = new ROS2MessageReader(parsedDefinitions);
          } else if (record.encoding === "protobuf") {
            const decodedByteLength = protobufjs.util.base64.length(record.schema);
            const arr = new Uint8Array(decodedByteLength);
            protobufjs.util.base64.decode(record.schema, arr, 0);

            const descriptorMsg = descriptor.FileDescriptorSet.decode(arr);
            const MsgRoot = protobufjs.Root.fromDescriptor(descriptorMsg);
            const Deserializer = MsgRoot.root.lookupType(record.schemaName);
            messageDeserializer = Deserializer;
          } else {
            throw new Error(`unsupported schema format ${record.schema}`);
          }
          channelInfoById.set(record.id, { info: record, messageDeserializer });
          messagesByChannel.set(record.id, []);
          break;
        }

        case "Message": {
          const channelId = record.channelInfo.id;
          const channelInfo = channelInfoById.get(channelId);
          const messages = messagesByChannel.get(channelId);
          if (!channelInfo || !messages) {
            throw new Error(`message for channel ${channelId} with no prior channel info`);
          }
          const receiveTime = {
            sec: Number(record.timestamp / 1_000_000_000n),
            nsec: Number(record.timestamp % 1_000_000_000n),
          };
          if (!startTime || isLessThan(receiveTime, startTime)) {
            startTime = receiveTime;
          }
          if (!endTime || isGreaterThan(receiveTime, endTime)) {
            endTime = receiveTime;
          }

          if (channelInfo.messageDeserializer instanceof protobufjs.Type) {
            const protoMsg = channelInfo.messageDeserializer.decode(new Uint8Array(record.data));
            messages.push({
              topic: channelInfo.info.topic,
              receiveTime,
              message: channelInfo.messageDeserializer.toObject(protoMsg),
              sizeInBytes: record.data.byteLength,
            });
          } else {
            messages.push({
              topic: channelInfo.info.topic,
              receiveTime,
              message: channelInfo.messageDeserializer.readMessage(new Uint8Array(record.data)),
              sizeInBytes: record.data.byteLength,
            });
          }
          break;
        }
      }
    }

    const reader = new McapReader({
      decompressHandlers: {
        lz4: (buffer, decompressedSize) => decompressLZ4(buffer, Number(decompressedSize)),
      },
    });
    for (let result; (result = await streamReader.read()), !result.done; ) {
      reader.append(result.value);
      for (let record; (record = reader.nextRecord()); ) {
        processRecord(record);
      }
    }

    this.messagesByChannel = messagesByChannel;

    const topics: Topic[] = [];
    const connections: Connection[] = [];
    const datatypes: RosDatatypes = new Map([["TODO", { definitions: [] }]]);

    for (const { info } of channelInfoById.values()) {
      topics.push({
        name: info.topic,
        datatype: info.schemaName,
      });

      datatypes.set(info.schemaName, {
        definitions: [],
      });
    }

    return {
      start: startTime ?? { sec: 0, nsec: 0 },
      end: endTime ?? { sec: 0, nsec: 0 },
      topics,
      connections,
      providesParsedMessages: true,
      messageDefinitions: {
        type: "parsed",
        datatypes,
        messageDefinitionsByTopic: {},
        parsedMessageDefinitionsByTopic: {},
      },
      problems: [],
    };
  }

  async getMessages(
    start: Time,
    end: Time,
    subscriptions: GetMessagesTopics,
  ): Promise<GetMessagesResult> {
    if (!this.messagesByChannel) {
      throw new Error("initialization not completed");
    }
    const topics = subscriptions.parsedMessages;
    if (topics == undefined) {
      return {};
    }
    const topicsSet = new Set(topics);

    const parsedMessages: MessageEvent<unknown>[] = [];
    for (const messages of this.messagesByChannel.values()) {
      for (const message of messages) {
        if (
          isTimeInRangeInclusive(message.receiveTime, start, end) &&
          topicsSet.has(message.topic)
        ) {
          parsedMessages.push(message);
        }
      }
    }
    parsedMessages.sort((msg1, msg2) => compare(msg1.receiveTime, msg2.receiveTime));

    return { parsedMessages };
  }

  async close(): Promise<void> {
    // no-op
  }
}
