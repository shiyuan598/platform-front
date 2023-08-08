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

import { ContextualMenu, makeStyles } from "@fluentui/react";
import MagnifyIcon from "@mdi/svg/svg/magnify.svg";
import cx from "classnames";
import { useCallback, useLayoutEffect, useRef, MouseEvent, useState, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useAsync } from "react-use";
import usePanZoom from "use-pan-and-zoom";
import { v4 as uuidv4 } from "uuid";

import KeyListener from "@foxglove/studio-base/components/KeyListener";
import { LegacyButton } from "@foxglove/studio-base/components/LegacyStyledComponents";
import { Item } from "@foxglove/studio-base/components/Menu";
import { MessageEvent, Topic } from "@foxglove/studio-base/players/types";
import { CompressedImage, Image } from "@foxglove/studio-base/types/Messages";
import WebWorkerManager from "@foxglove/studio-base/util/WebWorkerManager";
import { downloadFiles } from "@foxglove/studio-base/util/download";
import { getTimestampForMessage } from "@foxglove/studio-base/util/time";

import { Config, SaveImagePanelConfig } from "./index";
import { renderImage } from "./renderImage";
import { Dimensions, RawMarkerData, RenderOptions } from "./util";

type OnFinishRenderImage = () => void;
type Props = {
  topic?: Topic;
  image?: MessageEvent<unknown>;
  rawMarkerData: RawMarkerData;
  config: Config;
  saveConfig: SaveImagePanelConfig;
  onStartRenderImage: () => OnFinishRenderImage;
  renderInMainThread?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
    position: "relative",

    "&:hover > [data-zoom-menu]": {
      display: "block",
    },
    "&:hover > [data-magnify-icon]": {
      display: "block",
    },
  },
  magnify: {
    position: "absolute !important" as unknown as "absolute",
    bottom: 5,
    left: 0,
    zIndex: 102,
    opacity: 1,
    backgroundColor: `${theme.palette.neutralLight} !important`,
    display: "none",

    ".hoverScreenshot &": {
      display: "block",
    },
    svg: {
      width: 16,
      height: 16,
      fill: theme.semanticColors.bodyText,
      float: "left",
    },
    span: {
      color: "orange",
      float: "right",
      paddingLeft: 3,
    },
  },
  zoomContextMenu: {
    position: "absolute",
    bottom: 45,
    left: 0,
    zIndex: 102,
    opacity: 1,
    backgroundColor: theme.semanticColors.menuBackground,
    width: 145,
    borderRadius: "4%",
    display: "none",
    boxShadow: theme.effects.elevation64,

    ".hoverScreenshot &": {
      display: "block",
    },
  },
  round: {
    margin: 0,
    padding: "1px 5px 1px 5px",
    borderRadius: "100%",
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.neutralLighter}`,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px 8px 12px",
  },
  notInteractive: {
    opacity: 0.5,
  },
  errorMessage: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    color: theme.semanticColors.errorText,
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
  },
  canvasImageRenderingSmooth: {
    imageRendering: "auto",
  },
}));

const webWorkerManager = new WebWorkerManager(() => {
  return new Worker(new URL("ImageCanvas.worker", import.meta.url));
}, 1);

const emptyImage:Image = {
  header:{frame_id:"",stamp:{
    sec:0,nsec:0
  },seq:0},
  encoding: "empty",
  is_bigendian:true,
  step:1,
  width:1920,
  height:1080,
  data: new Uint8Array
  // encoding:"jo"

};
type RenderImage = (args: {
  topicName: string;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  zoomMode: "fit" | "fill" | "other";
  panZoom: { x: number; y: number; scale: number };
  viewport: { width: number; height: number };
  imageMessage?: Image | CompressedImage;
  imageMessageDatatype?: string;
  rawMarkerData: RawMarkerData;
  options?: RenderOptions;
}) => Promise<Dimensions | undefined>;

const supportsOffscreenCanvas =
  typeof HTMLCanvasElement.prototype.transferControlToOffscreen === "function";

export default function ImageCanvas(props: Props): JSX.Element {
  const { rawMarkerData, topic, image, config, saveConfig, onStartRenderImage } = props;
  const { mode } = config;
  const classes = useStyles();

  const renderInMainThread = (props.renderInMainThread ?? false) || !supportsOffscreenCanvas;

  // generic errors within the panel
  const [error, setError] = useState<Error | undefined>();

  const [zoomMode, setZoomMode] = useState<Config["mode"]>(mode);

  const canvasRef = useRef<HTMLCanvasElement>(ReactNull);

  // Use a debounce and 0 refresh rate to avoid triggering a resize observation while handling
  // and existing resize observation.
  // https://github.com/maslianok/react-resize-detector/issues/45
  const {
    width,
    height,
    ref: rootRef,
  } = useResizeDetector({
    refreshRate: 0,
    refreshMode: "debounce",
  });

  // The render function dispatches rendering to the main thread or a worker
  const [doRenderImage, setDoRenderImage] = useState<RenderImage | undefined>(undefined);

  // the canvas can only be transferred once, so we keep the transfer around
  const transfferedCanvasRef = useRef<OffscreenCanvas | undefined>(undefined);

  // setup the render function to render in the main thread or in the worker
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const id = uuidv4();

    if (renderInMainThread) {
      // Potentially performance-sensitive; await can be expensive
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const renderInMain = (args: {
        topicName: string;
        canvas: HTMLCanvasElement | OffscreenCanvas;
        zoomMode: "fit" | "fill" | "other";
        panZoom: { x: number; y: number; scale: number };
        viewport: { width: number; height: number };
        imageMessage?: Image | CompressedImage;
        imageMessageDatatype?: string;
        rawMarkerData: RawMarkerData;
        options?: RenderOptions;
      }) => {
        const targetWidth = args.viewport.width;
        const targetHeight = args.viewport.height;

        if (targetWidth !== canvas.width) {
          canvas.width = targetWidth;
        }
        if (targetHeight !== canvas.height) {
          canvas.height = targetHeight;
        }
        return renderImage(args);
      };

      setDoRenderImage(() => renderInMain);
    } else {
      const worker = webWorkerManager.registerWorkerListener(id);

      // Potentially performance-sensitive; await can be expensive
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      const workerRender = (args: {
        canvas: HTMLCanvasElement | OffscreenCanvas;
        zoomMode: "fit" | "fill" | "other";
        panZoom: { x: number; y: number; scale: number };
        viewport: { width: number; height: number };
        imageMessage?: Image | CompressedImage;
        imageMessageDatatype?: string;
        rawMarkerData: RawMarkerData;
        options?: RenderOptions;
      }) => {
        const {
          zoomMode: zoom,
          panZoom,
          viewport,
          imageMessage,
          imageMessageDatatype,
          rawMarkerData: rawMarkers,
          options,
        } = args;

        if (!imageMessage) {
          return Promise.resolve(undefined);
        }

        // Create a payload based on whether the image is a compressed image (format field present)
        // or a regular uncompressed image
        const msg =
          "format" in imageMessage
            ? {
                data: imageMessage.data,
                format: imageMessage.format,
              }
            : {
                data: imageMessage.data,
                width: imageMessage.width,
                height: imageMessage.height,
                encoding: imageMessage.encoding,
                is_bigendian: imageMessage.is_bigendian,
              };

        return worker.send<Dimensions | undefined>("renderImage", {
          id,
          zoomMode: zoom,
          panZoom,
          viewport,
          imageMessage: msg,
          imageMessageDatatype,
          rawMarkerData: JSON.parse(JSON.stringify(rawMarkers)),
          options,
        });
      };

      transfferedCanvasRef.current ??= canvas.transferControlToOffscreen();

      worker
        .send<void>("initialize", { id, canvas: transfferedCanvasRef.current }, [
          transfferedCanvasRef.current,
        ])
        .then(() => {
          setDoRenderImage(() => workerRender);
        })
        .catch((err) => {
          setError(err as Error);
        });
    }

    return () => {
      if (renderInMainThread) {
        return;
      }

      webWorkerManager.unregisterWorkerListener(id);
    };
  }, [renderInMainThread]);

  const {
    setPan,
    setZoom,
    // panX/panY need to be split apart because the pan object's identity may change on each render,
    // and we want to avoid unnecessary updates to useEffects/useMemos below
    pan: { x: panX, y: panY },
    zoom: scaleValue,
    setContainer,
    panZoomHandlers,
  } = usePanZoom({
    minZoom: 0.5,
    initialPan: config.pan,
    initialZoom: config.zoom,
  });

  useLayoutEffect(() => {
    if (canvasRef.current) {
      setContainer(canvasRef.current);
    }
  }, [setContainer]);

  const renderOptions = useMemo(() => {
    return {
      imageSmoothing: config.smooth,
      minValue: config.minValue,
      maxValue: config.maxValue,
      rotation: config.rotation ?? 0
    };
  }, [config.minValue, config.maxValue, config.smooth, config.rotation]);

  const devicePixelRatio = window.devicePixelRatio;
  const { error: renderError } = useAsync(async () => {
    if (!canvasRef.current || !doRenderImage) {
      return;
    }

    // we haven't detected a width/height yet so avoid rendering
    if (width == undefined || height == undefined) {
      return;
    }

    // can't set width/height of canvas after transferring control to offscreen
    // so we need to send the width/height to rpc
    const targetWidth = Math.floor(width * devicePixelRatio);
    const targetHeight = Math.floor(height * devicePixelRatio);

    const computedViewbox = {
      x: Math.floor(panX * devicePixelRatio),
      y: Math.floor(panY * devicePixelRatio),
      scale: scaleValue,
    };

    const imageMessage = (image?.message ?? emptyImage) as Image | CompressedImage | undefined;
    if (!imageMessage) {
       return
    }

    const finishRender = onStartRenderImage();
    try {
      return await doRenderImage({
        topicName: image?.topic || "",
        canvas: canvasRef.current ?? undefined,
        zoomMode: zoomMode ?? "fit",
        panZoom: computedViewbox,
        viewport: { width: targetWidth, height: targetHeight },
        imageMessage,
        imageMessageDatatype: topic?.datatype,
        rawMarkerData,
        options: renderOptions,
      });
    } finally {
      finishRender();
    }
  }, [
    doRenderImage,
    width,
    height,
    devicePixelRatio,
    panX,
    panY,
    scaleValue,
    image?.topic,
    image?.message,
    onStartRenderImage,
    zoomMode,
    topic?.datatype,
    topic?.name,
    rawMarkerData,
    renderOptions,
  ]);

  const [openZoomContext, setOpenZoomContext] = useState(false);

  const zoomIn = useCallback(() => {
    setZoom((oldZoom) => oldZoom * 1.1);
  }, [setZoom]);

  const zoomOut = useCallback(() => {
    setZoom((oldZoom) => oldZoom * 0.9);
  }, [setZoom]);

  const resetPanZoom = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, [setPan, setZoom]);

  const onZoomFit = useCallback(() => {
    setZoomMode("fit");
    resetPanZoom();
    setOpenZoomContext(false);
  }, [resetPanZoom]);

  const onZoomFill = useCallback(() => {
    setZoomMode("fill");
    resetPanZoom();
    setOpenZoomContext(false);
  }, [resetPanZoom]);

  const onZoom100 = useCallback(() => {
    setZoomMode("other");
    resetPanZoom();
    setOpenZoomContext(false);
  }, [resetPanZoom]);

  useLayoutEffect(() => {
    saveConfig({
      pan: { x: panX, y: panY },
      zoom: scaleValue,
    });
  }, [panX, panY, saveConfig, scaleValue]);

  const zoomContextMenu = useMemo(() => {
    return (
      <div className={classes.zoomContextMenu} data-zoom-menu>
        <div className={cx(classes.menuItem, classes.notInteractive)}>
          Scroll or use the buttons below to zoom
        </div>
        <div className={cx(classes.menuItem, classes.borderBottom)}>
          <LegacyButton className={classes.round} onClick={zoomOut} data-panel-minus-zoom>
            -
          </LegacyButton>
          <LegacyButton className={classes.round} onClick={zoomIn} data-panel-add-zoom>
            +
          </LegacyButton>
        </div>
        <Item className={classes.borderBottom} onClick={onZoom100} dataTest={"hundred-zoom"}>
          Zoom to 100%
        </Item>
        <Item className={classes.borderBottom} onClick={onZoomFit} dataTest={"fit-zoom"}>
          Zoom to fit
        </Item>
        <Item onClick={onZoomFill} dataTest={"fill-zoom"}>
          Zoom to fill
        </Item>
      </div>
    );
  }, [
    classes.borderBottom,
    classes.menuItem,
    classes.notInteractive,
    classes.round,
    classes.zoomContextMenu,
    onZoom100,
    onZoomFill,
    onZoomFit,
    zoomIn,
    zoomOut,
  ]);

  const [contextMenuEvent, setContextMenuEvent] = useState<
    MouseEvent<HTMLCanvasElement>["nativeEvent"] | undefined
  >(undefined);

  const onCanvasContextMenu = useCallback((ev: MouseEvent<HTMLCanvasElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setContextMenuEvent(ev.nativeEvent);
  }, []);

  const onDownloadImage = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !image || !topic) {
      return;
    }

    const imageMessage = image.message as Image | CompressedImage | undefined;
    if (!imageMessage) {
      return;
    }

    // re-render the image onto a new canvas to download the original image
    const tempCanvas = document.createElement("canvas");
    void renderImage({
      topicName:image.topic || "",
      canvas: tempCanvas,
      zoomMode: "other",
      panZoom: { x: 0, y: 0, scale: 1 },
      imageMessage,
      imageMessageDatatype: topic.datatype,
      rawMarkerData: { markers: [], transformMarkers: false },
      options: { ...renderOptions, resizeCanvas: true },
    }).then((dimensions) => {
      if (!dimensions) {
        return;
      }

      // context: https://stackoverflow.com/questions/37135417/download-canvas-as-png-in-fabric-js-giving-network-error
      // read the canvas data as an image (png)
      tempCanvas.toBlob((blob) => {
        if (!blob) {
          setError(
            new Error(`Failed to create an image from ${canvas.width}x${canvas.height} canvas`),
          );
          return;
        }
        // name the image the same name as the topic
        // note: the / characters in the file name will be replaced with _ by the browser
        // remove the leading / so the image name doesn't start with _
        const topicName = topic.name.slice(1);
        const stamp = getTimestampForMessage(image.message) ?? { sec: 0, nsec: 0 };
        const fileName = `${topicName}-${stamp.sec}-${stamp.nsec}`;
        downloadFiles([{ blob, fileName }]);
      }, "image/png");
    });
  }, [image, topic, renderOptions]);

  const keyDownHandlers = useMemo(() => {
    return {
      "=": zoomIn,
      "-": zoomOut,
      "0": onZoom100,
    };
  }, [onZoom100, zoomIn, zoomOut]);

  return (
    <div ref={rootRef} className={classes.root}>
      <KeyListener keyDownHandlers={keyDownHandlers} />
      {error && <div className={classes.errorMessage}>Error: {error.message}</div>}
      {renderError && <div className={classes.errorMessage}>Error: {renderError.message}</div>}
      <canvas
        onContextMenu={onCanvasContextMenu}
        {...panZoomHandlers}
        className={cx(classes.canvas, {
          [classes.canvasImageRenderingSmooth]: config.smooth === true,
        })}
        ref={canvasRef}
      />
      {contextMenuEvent && (
        <ContextualMenu
          target={contextMenuEvent}
          onDismiss={() => setContextMenuEvent(undefined)}
          items={[{ key: "download", text: "Download Image", onClick: onDownloadImage }]}
        />
      )}
      {openZoomContext && zoomContextMenu}
      <LegacyButton
        className={classes.magnify}
        onClick={() => setOpenZoomContext((old) => !old)}
        data-magnify-icon
      >
        <MagnifyIcon />
      </LegacyButton>
    </div>
  );
}
