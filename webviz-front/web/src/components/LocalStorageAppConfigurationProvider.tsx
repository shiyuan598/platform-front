// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PropsWithChildren, useState } from "react";

import {
  AppConfigurationContext,
  AppConfiguration,
  ChangeHandler,
  AppConfigurationValue,
} from "@foxglove/studio-base";

const KEY_PREFIX = "studio.app-configuration.";

type LocalStorageAppConfigurationProviderProps = {
  // Default values for app configuration items which have never been set by a user
  defaults?: {
    [key: string]: AppConfigurationValue;
  };
};

export default function LocalStorageAppConfigurationProvider(
  props: PropsWithChildren<LocalStorageAppConfigurationProviderProps>,
): JSX.Element {
  const { defaults } = props;

  const [ctx] = useState<AppConfiguration>(() => {
    const changeListeners = new Map<string, Set<ChangeHandler>>();
    return {
      get(key: string): AppConfigurationValue {
        const value = localStorage.getItem(KEY_PREFIX + key);
        try {
          return value == undefined ? defaults?.[key] : JSON.parse(value);
        } catch {
          return undefined;
        }
      },
      async set(key: string, value: AppConfigurationValue): Promise<void> {
        if (value == undefined) {
          localStorage.removeItem(KEY_PREFIX + key);
        } else {
          localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
        }
        const listeners = changeListeners.get(key);
        if (listeners) {
          // Copy the list of listeners to protect against mutation during iteration
          [...listeners].forEach((listener) => listener(value));
        }
      },

      addChangeListener(key: string, cb: ChangeHandler): void {
        let listeners = changeListeners.get(key);
        if (!listeners) {
          listeners = new Set();
          changeListeners.set(key, listeners);
        }
        listeners.add(cb);
      },

      removeChangeListener(key: string, cb: ChangeHandler): void {
        const listeners = changeListeners.get(key);
        if (listeners) {
          listeners.delete(cb);
        }
      },
    };
  });

  return (
    <AppConfigurationContext.Provider value={ctx}>
      {props.children}
    </AppConfigurationContext.Provider>
  );
}
