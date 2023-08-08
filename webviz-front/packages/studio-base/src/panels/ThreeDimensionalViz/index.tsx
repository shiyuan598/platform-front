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

import { uniq, omit, debounce } from "lodash";
import React, { useCallback, useMemo, useState, useRef, useEffect, useLayoutEffect } from "react";
import { useLatest } from "react-use";

import { CameraState } from "@foxglove/regl-worldview";
import { useDataSourceInfo } from "@foxglove/studio-base/PanelAPI";
import {
  MessagePipelineContext,
  useMessagePipeline,
} from "@foxglove/studio-base/components/MessagePipeline";
import Panel from "@foxglove/studio-base/components/Panel";
import PanelContext from "@foxglove/studio-base/components/PanelContext";
import useCallbackWithToast from "@foxglove/studio-base/hooks/useCallbackWithToast";
import Layout from "@foxglove/studio-base/panels/ThreeDimensionalViz/TopicTree/Layout";
import helpContent from "@foxglove/studio-base/panels/ThreeDimensionalViz/index.help.md";
import {
  useTransformedCameraState,
  getNewCameraStateOnFollowChange,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/threeDimensionalVizUtils";
import {
  CoordinateFrame,
  DEFAULT_FRAME_IDS,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/transforms";
import {
  FollowMode,
  ThreeDimensionalVizConfig,
} from "@foxglove/studio-base/panels/ThreeDimensionalViz/types";
import { MutablePose } from "@foxglove/studio-base/types/Messages";
import { PanelConfigSchema, SaveConfig } from "@foxglove/studio-base/types/panels";
import { emptyPose } from "@foxglove/studio-base/util/Pose";

import useFrame from "./useFrame";
import useTransforms from "./useTransforms";

// The amount of time to wait before dispatching the saveConfig action to save the cameraState into the layout
export const CAMERA_STATE_UPDATE_DEBOUNCE_DELAY_MS = 250;

export type Save3DConfig = SaveConfig<ThreeDimensionalVizConfig>;

export type Props = {
  config: ThreeDimensionalVizConfig;
  saveConfig: Save3DConfig;
};

const TIME_ZERO = { sec: 0, nsec: 0 };

function selectCurrentTime(ctx: MessagePipelineContext) {
  return ctx.playerState.activeData?.currentTime ?? TIME_ZERO;
}

function selectIsPlaying(ctx: MessagePipelineContext) {
  return ctx.playerState.activeData?.isPlaying ?? false;
}

function BaseRenderer(props: Props): JSX.Element {
  const { config: savedConfig, saveConfig } = props;

  // Migration and defaults for config
  const config = useMemo<ThreeDimensionalVizConfig>(() => {
    // Migrate old colorOverrideBySourceIdxByVariable field to new colorOverrideByVariable The new
    // field drops the "BySourceIdx" which powered the base/feature branch feature that no longer
    // exists.
    const colorOverrideByVariable: NonNullable<
      ThreeDimensionalVizConfig["colorOverrideByVariable"]
    > = {
      ...savedConfig.colorOverrideByVariable,
    };
    for (const [variable, colorOverrideByColumn] of Object.entries(
      savedConfig.colorOverrideBySourceIdxByVariable ?? {},
    )) {
      if (variable in colorOverrideByVariable) {
        continue;
      }

      const prevColorOverride = colorOverrideByColumn[0];
      if (prevColorOverride) {
        colorOverrideByVariable[variable] = prevColorOverride;
      }
    }

    // Previous 3d panel configurations had followTf as `string | boolean`
    // We now require followTf to be a string. Clear any non-string value by unsetting followTf
    const oldFollowTf = savedConfig.followTf;
    if (oldFollowTf != undefined && typeof oldFollowTf !== "string") {
      savedConfig.followTf = undefined;
    }

    savedConfig.followMode ??= "follow";

    return {
      colorOverrideByVariable,
      ...savedConfig,
    };
  }, [savedConfig]);

  const { autoSyncCameraState = false, followMode = "follow", followTf } = config;

  const { updatePanelConfigs } = React.useContext(PanelContext) ?? {};

  const { topics } = useDataSourceInfo();

  const [subscribedTopics, setSubscribedTopics] = useState<string[]>([]);
  const setSubscriptions = useCallback((newTopics: string[]) => {
    setSubscribedTopics(uniq(newTopics));
  }, []);

  const { reset: resetFrame, frame } = useFrame(subscribedTopics);
  const transforms = useTransforms(topics, frame, resetFrame);
  const currentTime = useMessagePipeline(selectCurrentTime);
  const isPlaying = useMessagePipeline(selectIsPlaying);

  const orphanedFrame = useMemo(() => new CoordinateFrame("(empty)", undefined), []);

  const renderFrame = useMemo<CoordinateFrame>(() => {
    // If the user specified a followTf, do not fall back to any other (valid) frame
    if (followTf) {
      return transforms.frame(followTf) ?? new CoordinateFrame(followTf, undefined);
    }

    // Try the conventional list of transform ids
    for (const frameId of DEFAULT_FRAME_IDS) {
      const curFrame = transforms.frame(frameId);
      if (curFrame) {
        return curFrame;
      }
    }

    // Fall back to the root of the first transform (lexicographically), if any
    const firstFrameId = Array.from(transforms.frames().keys()).sort()[0];
    return firstFrameId != undefined
      ? transforms.frame(firstFrameId)?.root() ?? orphanedFrame
      : orphanedFrame;
  }, [followTf, transforms, orphanedFrame]);

  const fixedFrame = useMemo(() => renderFrame?.root(), [renderFrame]);

  // We use useState to store the cameraState instead of using config directly in order to
  // speed up the pan/rotate performance of the 3D panel. This allows us to update the cameraState
  // immediately instead of setting the new cameraState by dispatching a saveConfig.
  const [configCameraState, setConfigCameraState] = useState(config.cameraState);
  useEffect(() => setConfigCameraState(config.cameraState), [config]);

  // unfollowPoseSnapshot has the pose of the follow frame in the fixed frame when following was
  // turned off.
  const unfollowPoseSnapshot = useRef<MutablePose | undefined>();

  // We always orient the camera to the render frame. The render frame continues to move relative to
  // the fixed frame, but we want to keep the camera stationary. We calculate the location of the
  // snapshot pose in render frame coordinates.
  //
  // This new pose tells us where to place the camera within the render frame to create the
  // appearance that the camera is stationary.
  const poseInRenderRef = useRef<MutablePose | undefined>();
  poseInRenderRef.current = unfollowPoseSnapshot.current
    ? renderFrame.applyLocal(emptyPose(), unfollowPoseSnapshot.current, fixedFrame, currentTime)
    : undefined;

  const transformedCameraState = useTransformedCameraState({
    configCameraState,
    followTf,
    followMode,
    transforms,
    poseInRenderFrame: poseInRenderRef.current,
  });

  const renderFrameLatest = useLatest(renderFrame);
  const currentTimeLatest = useLatest(currentTime);
  const transformsLatest = useLatest(transforms);

  // When the fixed frame changes, we clear any unfollow pose. The next effect will attempt to set
  // a new unfollowPoseSnapshot if we are able to detect one for the new fixed frame.
  useLayoutEffect(() => {
    unfollowPoseSnapshot.current = undefined;
  }, [fixedFrame]);

  // When starting up in no-follow or partial follow, we try to initialize the unfollowPoseSnapshot
  // to the location of the follow frame within its root frame.
  //
  // This effect depends on fixedFrame, transforms, followTf so it runs repeatedly during
  // initialization until a stable unfollowPoseSnapshot is obtained.
  useLayoutEffect(() => {
    // Bail if
    if (followMode === "follow-orientation") {
      return;
    }

    // Bail if we already have an unfollow pose or don't have a follow frame to looku[]
    if (unfollowPoseSnapshot.current || followTf == undefined) {
      return;
    }

    // get the current root frame for the render frame we are _currently_ following but want to stop following
    const followFrame = transforms.frame(followTf);
    if (!followFrame) {
      return;
    }

    // Bail if the fixed frame is the follow frame. There is no need to set the unfollow pose snapshot
    // in this case.
    if (fixedFrame.id === followFrame.id) {
      unfollowPoseSnapshot.current = undefined;
      return;
    }

    // calculate the pose of our follow frame in our root frame
    let rootFramePose: MutablePose | undefined = emptyPose();
    rootFramePose = fixedFrame.applyLocal(
      rootFramePose,
      rootFramePose,
      followFrame,
      currentTimeLatest.current,
    );
    if (!rootFramePose) {
      return;
    }
    unfollowPoseSnapshot.current = rootFramePose;
  }, [followTf, followMode, transforms, fixedFrame, currentTimeLatest]);

  // use callbackInputsRef to make sure the input changes don't trigger `onFollowChange` or `onAlignXYAxis` to change
  const callbackInputsRef = useRef({
    transformedCameraState,
    configCameraState,
    configFollowMode: config.followMode,
    configFollowTf: config.followTf,
  });
  callbackInputsRef.current = {
    transformedCameraState,
    configCameraState,
    configFollowMode: config.followMode,
    configFollowTf: config.followTf,
  };
  const onFollowChange = useCallbackWithToast(
    (newFollowTf?: string, newFollowMode?: FollowMode) => {
      const { configFollowMode: prevFollowMode, configFollowTf: prevFollowTf } =
        callbackInputsRef.current;
      const newCameraState = getNewCameraStateOnFollowChange({
        prevCameraState: callbackInputsRef.current.configCameraState,
        prevFollowTf,
        prevFollowMode,
        newFollowTf,
        newFollowMode,
      });

      // When entering follow-orientation mode, we no longer transform the camera state
      if (prevFollowMode !== "follow-orientation" && newFollowMode === "follow-orientation") {
        unfollowPoseSnapshot.current = undefined;
      }

      // When activating follow (follow position) or no-follow we record a snapshot of the render frame
      // in the root frame.
      if (prevFollowMode === "follow-orientation" && newFollowMode !== "follow-orientation") {
        const renderId = renderFrameLatest.current.id;

        // get the current root frame for the render frame we are _currently_ following but want to stop following
        const rootFrameForFollow = transformsLatest.current.frame(renderId)?.root();
        if (!rootFrameForFollow) {
          throw new Error(`Could not find frame [${renderId}]`);
        }

        // calculate the pose of our current render frame in our root frame
        let rootFramePose: MutablePose | undefined = emptyPose();
        rootFramePose = rootFrameForFollow.applyLocal(
          rootFramePose,
          rootFramePose,
          renderFrameLatest.current,
          currentTimeLatest.current,
        );
        if (!rootFramePose) {
          throw new Error(
            `Could not transform [${renderId}] to the root frame [${rootFrameForFollow.id}]`,
          );
        }
        unfollowPoseSnapshot.current = rootFramePose;
      }

      saveConfig({
        followTf: newFollowTf,
        followMode: newFollowMode,
        cameraState: newCameraState,
      });
    },
    [currentTimeLatest, renderFrameLatest, saveConfig, transformsLatest],
  );

  const onAlignXYAxis = useCallback(
    () =>
      saveConfig({
        followMode: "follow",
        cameraState: {
          ...omit(callbackInputsRef.current.transformedCameraState, [
            "target",
            "targetOrientation",
          ]),
          thetaOffset: 0,
        },
      }),
    [saveConfig],
  );

  const saveCameraState = useCallback(
    (newCameraStateObj: Partial<CameraState>) => saveConfig({ cameraState: newCameraStateObj }),
    [saveConfig],
  );
  const saveCameraStateDebounced = useMemo(
    () => debounce(saveCameraState, CAMERA_STATE_UPDATE_DEBOUNCE_DELAY_MS),
    [saveCameraState],
  );

  const onCameraStateChange = useCallback(
    (newCameraState: CameraState) => {
      const newCurrentCameraState = omit(newCameraState, ["target", "targetOrientation"]);
      setConfigCameraState(newCurrentCameraState);

      // If autoSyncCameraState is enabled, we can't wait for the debounce and need to call updatePanelConfig right away
      if (autoSyncCameraState) {
        updatePanelConfigs?.("3D Panel", (oldConfig) => ({
          ...oldConfig,
          cameraState: newCurrentCameraState,
        }));
      } else {
        saveCameraStateDebounced(newCurrentCameraState);
      }
    },
    [autoSyncCameraState, saveCameraStateDebounced, updatePanelConfigs],
  );

  return (
    <Layout
      cameraState={transformedCameraState}
      config={config}
      currentTime={currentTime}
      followMode={followMode}
      followTf={renderFrame.id}
      renderFrame={renderFrame}
      fixedFrame={fixedFrame}
      resetFrame={resetFrame}
      frame={frame}
      helpContent={helpContent}
      isPlaying={isPlaying}
      onAlignXYAxis={onAlignXYAxis}
      onCameraStateChange={onCameraStateChange}
      onFollowChange={onFollowChange}
      saveConfig={saveConfig}
      topics={topics}
      transforms={transforms}
      setSubscriptions={setSubscriptions}
    />
  );
}

const configSchema: PanelConfigSchema<ThreeDimensionalVizConfig> = [
  {
    key: "flattenMarkers",
    type: "toggle",
    title: "Flatten markers with a z-value of 0 to be located at the base frame's z value",
  },
  {
    key: "autoTextBackgroundColor",
    type: "toggle",
    title: "Automatically apply dark/light background color to text",
  },
  {
    key: "useThemeBackgroundColor",
    type: "toggle",
    title: "Automatically determine background color based on the color scheme",
  },
  { key: "customBackgroundColor", type: "color", title: "Background color" },
];

BaseRenderer.displayName = "ThreeDimensionalViz";
BaseRenderer.panelType = "3D Panel";
BaseRenderer.defaultConfig = {
  checkedKeys: ["name:Topics"],
  expandedKeys: ["name:Topics"],
  followTf: undefined,
  followMode: "follow",
  cameraState: {},
  modifiedNamespaceTopics: [],
  pinTopics: false,
  settingsByKey: {},
  autoSyncCameraState: false,
  autoTextBackgroundColor: true,
  diffModeEnabled: true,
  useThemeBackgroundColor: true,
  customBackgroundColor: "#842696",
} as ThreeDimensionalVizConfig;
BaseRenderer.supportsStrictMode = false;
BaseRenderer.configSchema = configSchema;

export default Panel(BaseRenderer);
