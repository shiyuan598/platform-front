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

import { flatten } from "lodash";
import { ComponentProps, useLayoutEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Mosaic, MosaicNode, MosaicWindow } from "react-mosaic-component";

import { useShallowMemo } from "@foxglove/hooks";
import MockMessagePipelineProvider from "@foxglove/studio-base/components/MessagePipeline/MockMessagePipelineProvider";
import AppConfigurationContext from "@foxglove/studio-base/context/AppConfigurationContext";
import {
  CurrentLayoutActions,
  SelectedPanelActions,
  useCurrentLayoutActions,
  useSelectedPanels,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import { HoverValueProvider } from "@foxglove/studio-base/context/HoverValueContext";
import PanelCatalogContext, {
  PanelCatalog,
  PanelInfo,
} from "@foxglove/studio-base/context/PanelCatalogContext";
import {
  UserNodeStateProvider,
  useUserNodeState,
} from "@foxglove/studio-base/context/UserNodeStateContext";
import { GlobalVariables } from "@foxglove/studio-base/hooks/useGlobalVariables";
import { LinkedGlobalVariables } from "@foxglove/studio-base/panels/ThreeDimensionalViz/Interactions/useLinkedGlobalVariables";
import { Diagnostic, UserNodeLog } from "@foxglove/studio-base/players/UserNodePlayer/types";
import {
  Frame,
  Topic,
  PlayerStateActiveData,
  Progress,
  PublishPayload,
  AdvertiseOptions,
} from "@foxglove/studio-base/players/types";
import MockCurrentLayoutProvider from "@foxglove/studio-base/providers/CurrentLayoutProvider/MockCurrentLayoutProvider";
import HelpInfoProvider from "@foxglove/studio-base/providers/HelpInfoProvider";
import { RosDatatypes } from "@foxglove/studio-base/types/RosDatatypes";
import { PanelConfigSchemaEntry, SavedProps, UserNodes } from "@foxglove/studio-base/types/panels";

export type Fixture = {
  frame?: Frame;
  topics?: Topic[];
  capabilities?: string[];
  activeData?: Partial<PlayerStateActiveData>;
  progress?: Progress;
  datatypes?: RosDatatypes;
  globalVariables?: GlobalVariables;
  layout?: MosaicNode<string>;
  linkedGlobalVariables?: LinkedGlobalVariables;
  userNodes?: UserNodes;
  userNodeDiagnostics?: { [nodeId: string]: readonly Diagnostic[] };
  userNodeFlags?: { id: string };
  userNodeLogs?: { [nodeId: string]: readonly UserNodeLog[] };
  userNodeRosLib?: string;
  savedProps?: SavedProps;
  publish?: (request: PublishPayload) => void;
  setPublishers?: (publisherId: string, advertisements: AdvertiseOptions[]) => void;
};

type Props = {
  children: React.ReactNode;
  fixture?: Fixture;
  panelCatalog?: PanelCatalog;
  omitDragAndDrop?: boolean;
  pauseFrame?: ComponentProps<typeof MockMessagePipelineProvider>["pauseFrame"];
  onMount?: (
    arg0: HTMLDivElement,
    actions: CurrentLayoutActions,
    selectedPanelActions: SelectedPanelActions,
  ) => void;
  onFirstMount?: (arg0: HTMLDivElement) => void;
  style?: React.CSSProperties;
};

function setNativeValue(element: unknown, value: unknown) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value")?.set; // eslint-disable-line @typescript-eslint/unbound-method
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set; // eslint-disable-line @typescript-eslint/unbound-method
  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value);
  } else {
    valueSetter?.call(element, value);
  }
}

export function triggerInputChange(
  node: HTMLInputElement | HTMLTextAreaElement,
  value: string = "",
): void {
  // force trigger textarea to change
  node.value = `${value} `;
  // trigger input change: https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
  setNativeValue(node, value);

  const ev = new Event("input", { bubbles: true });
  node.dispatchEvent(ev);
}

export function triggerInputBlur(node: HTMLInputElement | HTMLTextAreaElement): void {
  const ev = new Event("blur", { bubbles: true });
  node.dispatchEvent(ev);
}

export function triggerWheel(target: HTMLElement, deltaX: number): void {
  const event = new WheelEvent("wheel", { deltaX, bubbles: true, cancelable: true });
  target.dispatchEvent(event);
}

export const MosaicWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Mosaic
        className="mosaic-foxglove-theme" // prevent the default mosaic theme from being applied
        initialValue="mock"
        renderTile={(_id, path) => {
          return (
            <MosaicWindow title="" path={path} renderPreview={() => <div />}>
              {children}
            </MosaicWindow>
          );
        }}
      />
    </DndProvider>
  );
};

// empty catalog if one is not provided via props
class MockPanelCatalog implements PanelCatalog {
  async getConfigSchema(_type: string): Promise<PanelConfigSchemaEntry<string>[] | undefined> {
    return undefined;
  }
  getPanels(): readonly PanelInfo[] {
    return [];
  }
  getPanelByType(_type: string): PanelInfo | undefined {
    return undefined;
  }
}

function UnconnectedPanelSetup(props: Props): JSX.Element | ReactNull {
  const [mockPanelCatalog] = useState(() => props.panelCatalog ?? new MockPanelCatalog());
  const [mockAppConfiguration] = useState(() => ({
    get() {
      return undefined;
    },
    async set() {},
    addChangeListener() {},
    removeChangeListener() {},
  }));

  const hasMounted = useRef(false);

  const actions = useCurrentLayoutActions();
  const selectedPanels = useSelectedPanels();
  const { setUserNodeDiagnostics, addUserNodeLogs, setUserNodeRosLib } = useUserNodeState();
  const userNodeActions = useShallowMemo({
    setUserNodeDiagnostics,
    addUserNodeLogs,
    setUserNodeRosLib,
  });

  const [initialized, setInitialized] = useState(false);
  useLayoutEffect(() => {
    if (initialized) {
      return;
    }
    const {
      globalVariables,
      userNodes,
      layout,
      linkedGlobalVariables,
      userNodeDiagnostics,
      userNodeLogs,
      userNodeRosLib,
      savedProps,
    } = props.fixture ?? {};
    if (globalVariables) {
      actions.overwriteGlobalVariables(globalVariables);
    }
    if (userNodes) {
      actions.setUserNodes(userNodes);
    }
    if (layout != undefined) {
      actions.changePanelLayout({ layout });
    }
    if (linkedGlobalVariables) {
      actions.setLinkedGlobalVariables(linkedGlobalVariables);
    }
    if (userNodeDiagnostics) {
      for (const [nodeId, diagnostics] of Object.entries(userNodeDiagnostics)) {
        userNodeActions.setUserNodeDiagnostics(nodeId, diagnostics);
      }
    }
    if (userNodeLogs) {
      for (const [nodeId, logs] of Object.entries(userNodeLogs)) {
        userNodeActions.addUserNodeLogs(nodeId, logs);
      }
    }
    if (userNodeRosLib != undefined) {
      userNodeActions.setUserNodeRosLib(userNodeRosLib);
    }
    if (savedProps) {
      actions.savePanelConfigs({
        configs: Object.entries(savedProps).map(([id, config]) => ({ id, config })),
      });
    }
    setInitialized(true);
  }, [initialized, props.fixture, actions, userNodeActions]);

  const {
    frame = {},
    topics = [],
    datatypes,
    capabilities,
    activeData,
    progress,
    publish,
    setPublishers,
  } = props.fixture ?? {};
  let dTypes = datatypes;
  if (!dTypes) {
    const dummyDatatypes: RosDatatypes = new Map();
    for (const { datatype } of topics) {
      dummyDatatypes.set(datatype, { definitions: [] });
    }
    dTypes = dummyDatatypes;
  }
  const allData = flatten(Object.values(frame));
  const inner = (
    <div
      style={{ width: "100%", height: "100%", display: "flex", ...props.style }}
      ref={(el) => {
        const { onFirstMount, onMount } = props;
        if (el && onFirstMount && !hasMounted.current) {
          hasMounted.current = true;
          onFirstMount(el);
        }
        if (el && onMount) {
          onMount(el, actions, selectedPanels);
        }
      }}
    >
      <MockMessagePipelineProvider
        capabilities={capabilities}
        topics={topics}
        datatypes={dTypes}
        messages={allData}
        pauseFrame={props.pauseFrame}
        activeData={activeData}
        progress={progress}
        publish={publish}
        setPublishers={setPublishers}
      >
        <PanelCatalogContext.Provider value={mockPanelCatalog}>
          <AppConfigurationContext.Provider value={mockAppConfiguration}>
            {props.children}
          </AppConfigurationContext.Provider>
        </PanelCatalogContext.Provider>
      </MockMessagePipelineProvider>
    </div>
  );

  // Wait to render children until we've initialized state as requested in the fixture
  if (!initialized) {
    return ReactNull;
  }

  const { omitDragAndDrop = false } = props;
  return omitDragAndDrop ? inner : <MosaicWrapper>{inner}</MosaicWrapper>;
}

export default function PanelSetup(props: Props): JSX.Element {
  return (
    <UserNodeStateProvider>
      <HoverValueProvider>
        <MockCurrentLayoutProvider>
          <HelpInfoProvider>
            <UnconnectedPanelSetup {...props} />
          </HelpInfoProvider>
        </MockCurrentLayoutProvider>
      </HoverValueProvider>
    </UserNodeStateProvider>
  );
}
