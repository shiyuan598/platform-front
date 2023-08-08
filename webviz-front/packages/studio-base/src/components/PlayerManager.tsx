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

import {
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useToasts } from "react-toast-notifications";
import { useLatest, useMountedState } from "react-use";

import { useShallowMemo } from "@foxglove/hooks";
import Logger from "@foxglove/log";
import { AppSetting } from "@foxglove/studio-base/AppSetting";
import { MessagePipelineProvider } from "@foxglove/studio-base/components/MessagePipeline";
import { useAnalytics } from "@foxglove/studio-base/context/AnalyticsContext";
import ConsoleApiContext from "@foxglove/studio-base/context/ConsoleApiContext";
import {
  useCurrentLayoutActions,
  useCurrentLayoutSelector,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import { useLayoutManager } from "@foxglove/studio-base/context/LayoutManagerContext";
import PlayerSelectionContext, {
  DataSourceArgs,
  IDataSourceFactory,
  PlayerSelection,
} from "@foxglove/studio-base/context/PlayerSelectionContext";
import { useUserNodeState } from "@foxglove/studio-base/context/UserNodeStateContext";
import { useAppConfigurationValue } from "@foxglove/studio-base/hooks/useAppConfigurationValue";
import { GlobalVariables } from "@foxglove/studio-base/hooks/useGlobalVariables";
import useIndexedDbRecents from "@foxglove/studio-base/hooks/useIndexedDbRecents";
import useWarnImmediateReRender from "@foxglove/studio-base/hooks/useWarnImmediateReRender";
import AnalyticsMetricsCollector from "@foxglove/studio-base/players/AnalyticsMetricsCollector";
import OrderedStampPlayer from "@foxglove/studio-base/players/OrderedStampPlayer";
import UserNodePlayer from "@foxglove/studio-base/players/UserNodePlayer";
import { Player } from "@foxglove/studio-base/players/types";
import { UserNodes } from "@foxglove/studio-base/types/panels";

const log = Logger.getLogger(__filename);

const DEFAULT_MESSAGE_ORDER = "receiveTime";
const EMPTY_USER_NODES: UserNodes = Object.freeze({});
const EMPTY_GLOBAL_VARIABLES: GlobalVariables = Object.freeze({});

type PlayerManagerProps = {
  playerSources: IDataSourceFactory[];
};
export default function PlayerManager(props: PropsWithChildren<PlayerManagerProps>): JSX.Element {
  const { children, playerSources } = props;

  useWarnImmediateReRender();

  const { setUserNodeDiagnostics, addUserNodeLogs, setUserNodeRosLib } = useUserNodeState();
  const userNodeActions = useShallowMemo({
    setUserNodeDiagnostics,
    addUserNodeLogs,
    setUserNodeRosLib,
  });

  const isMounted = useMountedState();

  const analytics = useAnalytics();
  const metricsCollector = useMemo(() => new AnalyticsMetricsCollector(analytics), [analytics]);

  // When we implmenent per-data-connector UI settings we will move this into the appropriate
  // data sources. We might also consider this a studio responsibility and handle generically for
  // all data sources.
  const [unlimitedMemoryCache = false] = useAppConfigurationValue<boolean>(
    AppSetting.UNLIMITED_MEMORY_CACHE,
  );

  // When we implement per-data-connector UI settings we will move this into the foxglove data platform source.
  const consoleApi = useContext(ConsoleApiContext);

  const layoutStorage = useLayoutManager();
  const { setSelectedLayoutId } = useCurrentLayoutActions();

  const userNodes = useCurrentLayoutSelector(
    (state) => state.selectedLayout?.data?.userNodes ?? EMPTY_USER_NODES,
  );

  const [basePlayer, setBasePlayer] = useState<Player | undefined>();

  const globalVariables = useCurrentLayoutSelector(
    (state) => state.selectedLayout?.data?.globalVariables ?? EMPTY_GLOBAL_VARIABLES,
  );

  const messageOrder = useCurrentLayoutSelector(
    (state) => state.selectedLayout?.data?.playbackConfig.messageOrder ?? DEFAULT_MESSAGE_ORDER,
  );

  const { recents, addRecent } = useIndexedDbRecents();

  // We don't want to recreate the player when the these variables change, but we do want to
  // initialize it with the right order, so make a variable for its initial value we can use in the
  // dependency array to the player useMemo.
  //
  // Updating the player with new values in handled by effects below the player useMemo or within
  // the message pipeline
  const globalVariablesRef = useLatest(globalVariables);
  const messageOrderRef = useLatest(messageOrder);

  const player = useMemo<OrderedStampPlayer | undefined>(() => {
    if (!basePlayer) {
      return undefined;
    }

    const userNodePlayer = new UserNodePlayer(basePlayer, userNodeActions);
    const headerStampPlayer = new OrderedStampPlayer(userNodePlayer, messageOrderRef.current);
    headerStampPlayer.setGlobalVariables(globalVariablesRef.current);
    return headerStampPlayer;
  }, [basePlayer, globalVariablesRef, messageOrderRef, userNodeActions]);

  // Update player with new message order
  useLayoutEffect(() => player?.setMessageOrder(messageOrder), [player, messageOrder]);

  useLayoutEffect(() => void player?.setUserNodes(userNodes), [player, userNodes]);

  const { addToast } = useToasts();

  const [selectedSource, setSelectedSource] = useState<IDataSourceFactory | undefined>();

  const selectSource = useCallback(
    async (sourceId: string, args?: DataSourceArgs) => {
      log.debug(`Select Source: ${sourceId}`);

      // empty string sourceId
      if (!sourceId) {
        setSelectedSource(undefined);
        return;
      }

      const foundSource = playerSources.find((source) => source.id === sourceId);
      if (!foundSource) {
        addToast(`Unknown data source: ${sourceId}`, {
          appearance: "warning",
        });
        return;
      }

      metricsCollector.setProperty("player", sourceId);
      setSelectedSource(() => foundSource);

      // Sample sources don't need args or prompts to initialize
      if (foundSource.type === "sample") {
        const newPlayer = foundSource.initialize({
          consoleApi,
          metricsCollector,
          unlimitedMemoryCache,
        });

        setBasePlayer(newPlayer);

        if (foundSource.sampleLayout) {
          layoutStorage
            .saveNewLayout({
              name: foundSource.displayName,
              data: foundSource.sampleLayout,
              permission: "CREATOR_WRITE",
            })
            .then((newLayout) => {
              if (!isMounted()) {
                return;
              }
              setSelectedLayoutId(newLayout.id);
            })
            .catch((err) => {
              addToast((err as Error).message, { appearance: "error" });
            });
        }

        return;
      }

      if (!args) {
        addToast("Unable to initialize player: no args", { appearance: "error" });
        return;
      }

      try {
        switch (args.type) {
          case "connection": {
            const newPlayer = foundSource.initialize({
              ...args.params,
              consoleApi,
              metricsCollector,
              unlimitedMemoryCache,
            });
            setBasePlayer(newPlayer);

            if (args.params?.url) {
              addRecent({
                type: "connection",
                sourceId: foundSource.id,
                title: args.params?.url,
                label: foundSource.displayName,
                extra: args.params,
              });
            }

            return;
          }
          case "file": {
            const handle = args.handle;
            const files = args.files;

            // files we can try loading immediately
            // We do not add these to recents entries because putting File in indexedb results in
            // the entire file being stored in the database.
            if (files) {
              let file = files[0];
              const fileList: File[] = [];

              for (const curFile of files) {
                file ??= curFile;
                fileList.push(curFile);
              }
              const multiFile = foundSource.supportsMultiFile === true && fileList.length > 1;

              const newPlayer = foundSource.initialize({
                file: multiFile ? undefined : file,
                files: multiFile ? fileList : undefined,
                metricsCollector,
                unlimitedMemoryCache,
              });

              setBasePlayer(newPlayer);
              return;
            } else if (handle) {
              const permission = await handle.queryPermission({ mode: "read" });
              if (!isMounted()) {
                return;
              }

              if (permission !== "granted") {
                const newPerm = await handle.requestPermission({ mode: "read" });
                if (newPerm !== "granted") {
                  throw new Error(`Permission denied: ${handle.name}`);
                }
              }

              const file = await handle.getFile();
              if (!isMounted()) {
                return;
              }

              const newPlayer = foundSource.initialize({
                file,
                metricsCollector,
                unlimitedMemoryCache,
              });

              setBasePlayer(newPlayer);
              addRecent({
                type: "file",
                title: handle.name,
                sourceId: foundSource.id,
                handle,
              });

              return;
            }
          }
        }

        addToast("Unable to initialize player", { appearance: "error" });
      } catch (error) {
        addToast((error as Error).message, { appearance: "error" });
      }
    },
    [
      addRecent,
      addToast,
      consoleApi,
      isMounted,
      layoutStorage,
      metricsCollector,
      playerSources,
      setSelectedLayoutId,
      unlimitedMemoryCache,
    ],
  );

  // Select a recent entry by id
  const selectRecent = useCallback(
    (recentId: string) => {
      // find the recent from the list and initialize
      const foundRecent = recents.find((value) => value.id === recentId);
      if (!foundRecent) {
        addToast(`Failed to restore recent: ${recentId}`, {
          appearance: "error",
        });
        return;
      }

      switch (foundRecent.type) {
        case "connection": {
          void selectSource(foundRecent.sourceId, {
            type: "connection",
            params: foundRecent.extra,
          });
          break;
        }
        case "file": {
          void selectSource(foundRecent.sourceId, {
            type: "file",
            handle: foundRecent.handle,
          });
        }
      }
    },
    [recents, addToast, selectSource],
  );

  // Make a RecentSources array for the PlayerSelectionContext
  const recentSources = useMemo(() => {
    return recents.map((item) => {
      return { id: item.id, title: item.title, label: item.label };
    });
  }, [recents]);

  const value: PlayerSelection = {
    selectSource,
    selectRecent,
    selectedSource,
    availableSources: playerSources,
    recentSources,
  };

  return (
    <>
      <PlayerSelectionContext.Provider value={value}>
        <MessagePipelineProvider player={player} globalVariables={globalVariablesRef.current}>
          {children}
        </MessagePipelineProvider>
      </PlayerSelectionContext.Provider>
    </>
  );
}
