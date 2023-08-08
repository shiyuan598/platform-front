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
import { renderHook } from "@testing-library/react-hooks";

import MockMessagePipelineProvider from "@foxglove/studio-base/components/MessagePipeline/MockMessagePipelineProvider";
import { MessageEvent } from "@foxglove/studio-base/players/types";
import MockCurrentLayoutProvider from "@foxglove/studio-base/providers/CurrentLayoutProvider/MockCurrentLayoutProvider";
import { RosDatatypes } from "@foxglove/studio-base/types/RosDatatypes";

import { useLatestMessageDataItem } from "./useLatestMessageDataItem";

const topics = [{ name: "/topic", datatype: "datatype" }];
const datatypes: RosDatatypes = new Map(
  Object.entries({
    datatype: {
      definitions: [{ name: "value", type: "uint32", isArray: false, isComplex: false }],
    },
  }),
);
const fixtureMessages: MessageEvent<unknown>[] = [
  {
    topic: "/topic",
    receiveTime: { sec: 0, nsec: 0 },
    message: { value: 0 },
    sizeInBytes: 0,
  },
  {
    topic: "/topic",
    receiveTime: { sec: 1, nsec: 0 },
    message: { value: 1 },
    sizeInBytes: 0,
  },
  {
    topic: "/topic",
    receiveTime: { sec: 2, nsec: 0 },
    message: { value: 2 },
    sizeInBytes: 0,
  },
];

describe("useLatestMessageDataItem", () => {
  it("returns undefined by default", async () => {
    const { result } = renderHook(({ path }) => useLatestMessageDataItem(path), {
      initialProps: { path: "/topic.value" },
      wrapper({ children }) {
        return (
          <MockCurrentLayoutProvider>
            <MockMessagePipelineProvider topics={topics} datatypes={datatypes}>
              {children}
            </MockMessagePipelineProvider>
          </MockCurrentLayoutProvider>
        );
      },
    });
    expect(result.all).toEqual([undefined]);
  });

  it("uses the latest message", async () => {
    const { result, rerender } = renderHook(({ path }) => useLatestMessageDataItem(path), {
      initialProps: { path: "/topic.value", messages: [fixtureMessages[0]!] },
      wrapper({ children, messages }) {
        return (
          <MockCurrentLayoutProvider>
            <MockMessagePipelineProvider messages={messages} topics={topics} datatypes={datatypes}>
              {children}
            </MockMessagePipelineProvider>
          </MockCurrentLayoutProvider>
        );
      },
    });
    expect(result.all).toEqual([
      { messageEvent: fixtureMessages[0], queriedData: [{ path: "/topic.value", value: 0 }] },
    ]);

    rerender({ path: "/topic.value", messages: [fixtureMessages[1]!, fixtureMessages[2]!] });
    expect(result.all).toEqual([
      { messageEvent: fixtureMessages[0], queriedData: [{ path: "/topic.value", value: 0 }] },
      { messageEvent: fixtureMessages[2], queriedData: [{ path: "/topic.value", value: 2 }] },
    ]);
  });

  it("only keeps messages that match the path", async () => {
    const { result } = renderHook(({ path }) => useLatestMessageDataItem(path), {
      initialProps: { path: "/topic{value==1}.value" },
      wrapper({ children }) {
        return (
          <MockCurrentLayoutProvider>
            <MockMessagePipelineProvider
              messages={fixtureMessages}
              topics={topics}
              datatypes={datatypes}
            >
              {children}
            </MockMessagePipelineProvider>
          </MockCurrentLayoutProvider>
        );
      },
    });
    expect(result.all).toEqual([
      {
        messageEvent: fixtureMessages[1],
        queriedData: [{ path: "/topic{value==1}.value", value: 1 }],
      },
    ]);
  });

  it("changing the path gives the new queriedData from the message", async () => {
    const { result, rerender } = renderHook(({ path }) => useLatestMessageDataItem(path), {
      initialProps: { path: "/topic{value==1}.value" },
      wrapper({ children }) {
        return (
          <MockCurrentLayoutProvider>
            <MockMessagePipelineProvider
              messages={fixtureMessages}
              topics={topics}
              datatypes={datatypes}
            >
              {children}
            </MockMessagePipelineProvider>
          </MockCurrentLayoutProvider>
        );
      },
    });

    rerender({ path: "/topic{value==1}" });
    expect(result.all).toEqual([
      {
        messageEvent: fixtureMessages[1],
        queriedData: [{ path: "/topic{value==1}.value", value: 1 }],
      },
      {
        messageEvent: fixtureMessages[1],
        queriedData: [{ path: "/topic{value==1}", value: fixtureMessages[1]?.message }],
      },
    ]);
  });
});
