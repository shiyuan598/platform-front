// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Link, Text } from "@fluentui/react";

import { IDataSourceFactory, Ros2SocketDataSourceFactory } from "@foxglove/studio-base";

export default class Ros2UnavailableDataSourceFactory extends Ros2SocketDataSourceFactory {
  disabledReason = (
    <>
      <Text block as="p">
        ROS 2 connections require UDP sockets, which are not available in a web browser.{" "}
        <Link href="https://foxglove.dev/download" target="_blank" rel="noreferrer">
          Download our desktop app
        </Link>{" "}
        to connect to a ROS 2 system.
      </Text>
    </>
  );

  override initialize(): ReturnType<IDataSourceFactory["initialize"]> {
    return;
  }
}
