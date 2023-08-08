// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
  IDataSourceFactory,
  DataSourceFactoryInitializeArgs,
} from "@foxglove/studio-base/context/PlayerSelectionContext";
import RandomAccessPlayer from "@foxglove/studio-base/players/RandomAccessPlayer";
import { Player } from "@foxglove/studio-base/players/types";
import RecordDataProvider from "@foxglove/studio-base/randomAccessDataProviders/RecordDataProvider";
import MemoryCacheDataProvider from "@foxglove/studio-base/randomAccessDataProviders/MemoryCacheDataProvider";
import { getSeekToTime } from "@foxglove/studio-base/util/time";

class RecordLocalDataSourceFactory implements IDataSourceFactory {
  id = "record-local-file";
  type: IDataSourceFactory["type"] = "file";
  displayName = "Record";
  iconName: IDataSourceFactory["iconName"] = "OpenFile";
  supportedFileTypes = [".00000"];

  initialize(args: DataSourceFactoryInitializeArgs): Player | undefined {
    const file = args.file;
    if (!file) {
      return;
    }
    console.log("faintzz: create RecordDataProvider")
    const recordProvider = new RecordDataProvider({ file });
    const messageCacheProvider = new MemoryCacheDataProvider(recordProvider, {
      unlimitedCache: args.unlimitedMemoryCache,
    });

    return new RandomAccessPlayer(messageCacheProvider, {
      metricsCollector: args.metricsCollector,
      seekToTime: getSeekToTime(),
      name: file.name,
    });
  }
}

export default RecordLocalDataSourceFactory;
