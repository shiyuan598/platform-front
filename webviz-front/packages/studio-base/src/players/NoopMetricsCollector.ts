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
import {
  PlayerMetricsCollectorInterface,
  SubscribePayload,
} from "@foxglove/studio-base/players/types";

export default class NoopMetricsCollector implements PlayerMetricsCollectorInterface {
  setProperty(_key: string, _value: string | number | boolean): void {
    // no-op
  }
  playerConstructed(): void {
    // no-op
  }
  initialized(_args?: { isSampleDataSource: boolean }): void {
    // no-op
  }
  play(_speed: number): void {
    // no-op
  }
  seek(_time: Time): void {
    // no-op
  }
  setSpeed(_speed: number): void {
    // no-op
  }
  pause(): void {
    // no-op
  }
  close(): void {
    // no-op
  }
  setSubscriptions(_subscriptions: SubscribePayload[]): void {
    // no-op
  }
  recordPlaybackTime(_time: Time): void {
    // no-op
  }
  recordBytesReceived(_bytes: number): void {
    // no-op
  }
  recordDataProviderPerformance(): void {
    // no-op
  }
  recordUncachedRangeRequest(): void {
    // no-op
  }
  recordTimeToFirstMsgs(): void {
    // no-op
  }
  recordDataProviderInitializePerformance(): void {
    // no-op
  }
  recordDataProviderStall(): void {
    // no-op
  }
}
