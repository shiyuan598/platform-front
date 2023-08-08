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

class RecordRemoteDataSourceFactory implements IDataSourceFactory {
  id = "record-remote-file";
  type: IDataSourceFactory["type"] = "remote-file";
  displayName = "Record";
  iconName: IDataSourceFactory["iconName"] = "FileASPX";
  supportedFileTypes = [".00000"];

  initialize(args: DataSourceFactoryInitializeArgs): Player | undefined {
    const url = args.url;
    if (!url||url?.search(".00")===-1) {
      return;
    }
    const recordProvider = new RecordDataProvider({ url });
    const messageCacheProvider = new MemoryCacheDataProvider(recordProvider, {
      unlimitedCache: args.unlimitedMemoryCache,
    });

    return new RandomAccessPlayer(messageCacheProvider, {
      metricsCollector: args.metricsCollector,
      seekToTime: getSeekToTime(),
      name: "remote record",
    });
  }
}

export default RecordRemoteDataSourceFactory;
