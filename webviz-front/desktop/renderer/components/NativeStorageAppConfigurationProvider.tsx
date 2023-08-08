// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PropsWithChildren } from "react";
import { useAsync } from "react-use";

import Log from "@foxglove/log";
import { AppConfigurationContext, AppConfigurationValue } from "@foxglove/studio-base";

import { useNativeStorage } from "../context/NativeStorageContext";
import NativeStorageAppConfiguration from "../services/NativeStorageAppConfiguration";

const log = Log.getLogger(__filename);

type NativeStorageAppConfigurationProviderProps = {
  // Default values for app configuration items which have never been set by a user
  defaults?: {
    [key: string]: AppConfigurationValue;
  };
};

export default function NativeStorageAppConfigurationProvider(
  props: PropsWithChildren<NativeStorageAppConfigurationProviderProps>,
): React.ReactElement | ReactNull {
  const { defaults, children } = props;
  const storage = useNativeStorage();

  const { value, error } = useAsync(async () => {
    log.debug("Initializing app configuration");
    return await NativeStorageAppConfiguration.Initialize(storage, { defaults });
  }, [defaults, storage]);

  if (error) {
    throw error;
  }

  // do not render any children until the configuration is loaded
  if (!value) {
    return ReactNull;
  }

  return (
    <AppConfigurationContext.Provider value={value}>{children}</AppConfigurationContext.Provider>
  );
}
