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

import { RosDatatypes } from "@foxglove/studio-base/types/RosDatatypes";

// ts-prune-ignore-next
export const datatypes: RosDatatypes = new Map(
  Object.entries({
    "some/datatype": { definitions: [{ name: "index", type: "int32" }] },
  }),
);

// ts-prune-ignore-next
export const messages = Object.freeze([
  {
    topic: "/some/topic",
    receiveTime: { sec: 100, nsec: 0 },
    message: { index: 0 },
    sizeInBytes: 0,
  },
  {
    topic: "/some/topic",
    receiveTime: { sec: 101, nsec: 0 },
    message: { index: 1 },
    sizeInBytes: 0,
  },
  {
    topic: "/some/topic",
    receiveTime: { sec: 102, nsec: 0 },
    message: { index: 2 },
    sizeInBytes: 0,
  },
] as const);
