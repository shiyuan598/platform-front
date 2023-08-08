// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import { Time } from "@foxglove/rostime";
import BagDataProvider from "@foxglove/studio-base/randomAccessDataProviders/BagDataProvider";

import rawMessageDefinitionsToParsed from "./rawMessageDefinitionsToParsed";
import {
  RandomAccessDataProvider,
  InitializationResult,
  ExtensionPoint,
  GetMessagesResult,
  GetMessagesTopics,
} from "./types";

// Parses raw messages as returned by `BagDataProvider`.
export default class Ros1ParseMessagesDataProvider implements RandomAccessDataProvider {
  private _provider: BagDataProvider;

  private _datatypeNamesByTopic: {
    [topic: string]: string;
  } = {};

  constructor(provider: BagDataProvider) {
    this._provider = provider;
  }

  async initialize(extensionPoint: ExtensionPoint): Promise<InitializationResult> {
    const result = await this._provider.initialize(extensionPoint);
    const { topics } = result;
    if (result.providesParsedMessages) {
      throw new Error(
        "ParseMessagesDataProvider should not be used with a provider provides already-parsed messages",
      );
    }
    const messageDefinitions =
      result.messageDefinitions.type === "parsed"
        ? result.messageDefinitions
        : rawMessageDefinitionsToParsed(result.messageDefinitions, topics);

    topics.forEach(({ name, datatype }) => {
      this._datatypeNamesByTopic[name] = datatype;
    });
    // Initialize the readers asynchronously - we can load data without having the readers ready to parse it.
    return { ...result, providesParsedMessages: true, messageDefinitions };
  }

  async getMessages(start: Time, end: Time, topics: GetMessagesTopics): Promise<GetMessagesResult> {
    // Kick off the request to the data provder to get the messages
    // This might trigger some background reading so we can do some other work before waiting

    const { parsedMessages, encodedMessages } = await this._provider.getMessages(start, end, {
      parsedMessages: topics.parsedMessages,
      encodedMessages: topics.encodedMessages,
    });

    return {
      parsedMessages,
      encodedMessages,
    };
  }

  async close(): Promise<void> {
    return await this._provider.close();
  }
}
