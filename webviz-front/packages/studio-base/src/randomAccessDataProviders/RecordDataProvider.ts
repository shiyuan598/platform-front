// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { definitions as commonDefs } from "@foxglove/rosmsg-msgs-common";
import {
  Time,
  compare,
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
import { RecordReader } from "@foxglove/studio-base/randomAccessDataProviders/record/RecordParser";
import { nanoToTime } from "@foxglove/studio-base/randomAccessDataProviders/record/util";

type Options = { file?: File, url?: string };

export default class McapDataProvider implements RandomAccessDataProvider {
  private options: Options;
  private messagesByChannel?: Map<string, MessageEvent<unknown>[]>;

  constructor(options: Options) {
    this.options = options;
  }

  async initialize(_extensionPoint: ExtensionPoint): Promise<InitializationResult> {
    const { file,url } = this.options;
    // const streamReader = (file.stream() as ReadableStream<Uint8Array>).getReader();
    let arrayBuffer:ArrayBuffer = file ? await file.arrayBuffer() : await fetch(url??"").then(res=>res.arrayBuffer());
    // if(file){
    //   arrayBuffer =
    // } else if(url){
    //   arrayBuffer =
    // }

    const messagesByChannel = new Map<string, MessageEvent<unknown>[]>();

    let startTime: Time | undefined;
    let endTime: Time | undefined;

    const reader = new RecordReader();
    const topics: Topic[] = [];
    const datatypes: RosDatatypes = new Map([["TODO", { definitions: [] }]]);
    reader.read(new Uint8Array(arrayBuffer), topics, messagesByChannel, datatypes);


    this.messagesByChannel = messagesByChannel;

    const header = reader.header;
    if(header){
      startTime = nanoToTime(header.begin_time as number)
      endTime = nanoToTime(header.end_time as number)
    }
    const connections: Connection[] = [];

    datatypes.set("tf2_msgs/TFMessage",commonDefs["tf2_msgs/TFMessage"])
    datatypes.set("zhito2ros_msg/ZhitoImageMarkerArray",commonDefs["visualization_msgs/MarkerArray"])
    datatypes.set("zhito2ros_msg/ZhitoProto", {
      definitions: [
        {
            "type": "string",
            "isArray": false,
            "name": "proto",
            "isComplex": false
        },
        {
            "type": "uint8",
            "isArray": true,
            "name": "data",
            "isComplex": false
        }
    ],
    });
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
