// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Link, Stack, Text, useTheme } from "@fluentui/react";
import { ReactElement, useEffect } from "react";

import { AppSetting } from "@foxglove/studio-base/AppSetting";
import { useSessionStorageValue } from "@foxglove/studio-base/hooks/useSessionStorageValue";

export function LaunchingInDesktopScreen(): ReactElement {
  const theme = useTheme();
  const [, setLaunchPreference] = useSessionStorageValue(AppSetting.LAUNCH_PREFERENCE);

  const cleanWebURL = new URL(window.location.href);
  cleanWebURL.searchParams.delete("launch");

  function openWeb() {
    setLaunchPreference("web");
    window.location.href = cleanWebURL.href;
  }

  useEffect(() => {
    const desktopURL = new URL("foxglove://open");
    cleanWebURL.searchParams.forEach((v, k) => {
      if (k && v) {
        desktopURL.searchParams.set(k, v);

        // Temporarily send both sets of params until desktop app is updated to
        // use new ds.* parameters.
        switch (k) {
          case "ds":
            desktopURL.searchParams.set("type", v);
            break;
          case "ds.deviceId":
            desktopURL.searchParams.set("deviceId", v);
            break;
          case "ds.end":
            desktopURL.searchParams.set("end", v);
            break;
          case "ds.start":
            desktopURL.searchParams.set("start", v);
            break;
          case "ds.url":
            desktopURL.searchParams.set("url", v);
            break;
          case "time":
            desktopURL.searchParams.set("seekTo", v);
            break;
        }
      }
    });

    window.location.href = desktopURL.href;
  });

  return (
    <Stack horizontalAlign="center" verticalAlign="center" verticalFill>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        tokens={{ childrenGap: theme.spacing.l1, maxWidth: 480 }}
        styles={{ root: { textAlign: "center" } }}
      >
        <Text variant="xxLarge">Zhito WebVis Loading…</Text>

        <Stack tokens={{ childrenGap: theme.spacing.s2 }}>
          <Text>
            <Link onClick={openWeb}>访问网页版本</Link>
          </Text>
          <Text>
            <Link href="https://zhito.com/download">下载客户端</Link>
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
