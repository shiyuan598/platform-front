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

import { MessageEvent } from "@foxglove/studio-base/players/types";
import {
  Image,
  ImageMarker,
  Color,
  CompressedImage,
  ImageMarkerArray,
  ImageMarkerType,
  Point2D,
} from "@foxglove/studio-base/types/Messages";
import sendNotification from "@foxglove/studio-base/util/sendNotification";

import PinholeCameraModel from "./PinholeCameraModel";
import {
  decodeYUV,
  decodeRGB8,
  decodeBGR8,
  decodeFloat1c,
  decodeBayerRGGB8,
  decodeBayerBGGR8,
  decodeBayerGBRG8,
  decodeBayerGRBG8,
  decodeMono8,
  decodeMono16,
  decodeRGBA,
} from "./decodings";
import { buildMarkerData, Dimensions, RawMarkerData, MarkerData, RenderOptions } from "./util";

// const UNCOMPRESSED_IMAGE_DATATYPES = [
//   "sensor_msgs/Image",
//   "sensor_msgs/msg/Image",
//   "ros.sensor_msgs.Image",
// ];
export const IMAGE_DATATYPES = [
  "sensor_msgs/Image",
  "sensor_msgs/msg/Image",
  "ros.sensor_msgs.Image",
  "sensor_msgs/CompressedImage",
  "sensor_msgs/msg/CompressedImage",
  "ros.sensor_msgs.CompressedImage",
  "zhito.drivers.CompressedImage"
];

// Just globally keep track of if we've shown an error in rendering, since typically when you get
// one error, you'd then get a whole bunch more, which is spammy.
let hasLoggedCameraModelError: boolean = false;

const emptyCanvas = document.createElement("canvas");
emptyCanvas.width = 1920;
emptyCanvas.height = 1080;
const emptyContext = emptyCanvas.getContext("2d") as CanvasRenderingContext2D;
emptyContext.fillStyle = "#222222";
emptyContext?.rect(0, 0, 1920, 1080);
emptyContext?.fill();
const emptyImageData = emptyContext.getImageData(0,0,1920,1080);
// Given a canvas, an image message, and marker info, render the image to the canvas.
export async function renderImage({
  topicName,
  canvas,
  zoomMode,
  panZoom,
  imageMessage,
  imageMessageDatatype,
  rawMarkerData,
  options,
}: {
  topicName:string;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  zoomMode: "fit" | "fill" | "other";
  panZoom: { x: number; y: number; scale: number };
  imageMessage?: Image | CompressedImage;
  imageMessageDatatype?: string;
  rawMarkerData: RawMarkerData;
  options?: RenderOptions;
}): Promise<Dimensions | undefined> {
  if (!imageMessage || imageMessageDatatype == undefined) {
    clearCanvas(canvas);
    return undefined;
  }

  const { imageSmoothing = true } = options ?? {};

  let markerData = undefined;
  try {
    markerData = buildMarkerData(rawMarkerData);
  } catch (error) {
    if (!hasLoggedCameraModelError) {
      sendNotification(`Failed to initialize camera model from CameraInfo`, error, "user", "warn");
      hasLoggedCameraModelError = true;
    }
  }

  try {
    let bitmap;
    if((imageMessage as CompressedImage)?.format=="h264"){
      bitmap = await decodeH264MessageToBitmap(topicName, imageMessage);//, imageMessageDatatype, options
    }else{
      bitmap = await decodeMessageToBitmap(imageMessage, imageMessageDatatype, options);
    }

    if (options?.resizeCanvas === true) {
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
    }
    const rotation = options?.rotation || 0;
    const dimensions = render({ canvas, zoomMode, panZoom, bitmap, imageSmoothing, markerData, rotation });
    bitmap.close();
    return dimensions;
  } catch (error) {
    // If there is an error, clear the image and re-throw it.
    clearCanvas(canvas);
    throw error;
  }
}

function toRGBA(color: Color) {
  return `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`;
}

function maybeUnrectifyPoint(cameraModel: PinholeCameraModel | undefined, point: Point2D): Point2D {
  return cameraModel?.unrectifyPoint(point) ?? point;
}

const playerMap = new Map();
function getPlayer(topicName:string|OffscreenCanvas){
  let player = playerMap.get(topicName)
  if(player){
    return player;
  }else{
    //@ts-ignore
    player = new Player({
      useWorker:false,// true / false
      // decode in a worker thread

      workerFile: "Broadway/Player/Decoder.js",
      // path to Decoder.js. Only neccessary when using worker. defaults to "Decoder.js"

      webgl: true,// "auto" / false
      // use webgl. defaults to "auto"
      size:{ width: 1920, height: 1080},
      // size { width: , height: }
      // initial size of the canvas. canvas will resize after video starts streaming.
    });
    // console.log("create new player for ",player)
    // player.canvas.style="position:absolute;left:0;top:0";
    // document.body.appendChild(player.canvas);
    playerMap.set(topicName,player);
    return player

  }
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
function decodeH264MessageToBitmap(
  topicName: string | OffscreenCanvas,
  imageMessage: Partial<Image> | Partial<CompressedImage>,
  // datatype: string,
  // options: RenderOptions = {},
): Promise<ImageBitmap> {

  const player = getPlayer(topicName);
  let time = 1;
  while(time>0){
    player.decode(imageMessage.data)
    time--;
  }
  //@ts-ignore
  return self.createImageBitmap(player.canvas);
}
// Potentially performance-sensitive; await can be expensive
// eslint-disable-next-line @typescript-eslint/promise-function-async
function decodeMessageToBitmap(
  imageMessage: Partial<Image> | Partial<CompressedImage>,
  datatype: string,
  options: RenderOptions = {rotation:0},
): Promise<ImageBitmap> {
  let image: ImageData | HTMLImageElement | Blob;
  const { data: rawData } = imageMessage;
  if (!(rawData instanceof Uint8Array)) {
    throw new Error("Message must have data of type Uint8Array");
  }

  // In a Websocket context, we don't know whether the message is compressed or
  // raw. Our subscription interface for the WebsocketPlayer can request
  // compressed verisons of topics, in which case the message datatype can
  // differ from the one recorded during initialization. So here we just check
  // for properties consistent with either datatype, and render accordingly.

  if (
    "encoding" in imageMessage &&
    imageMessage.encoding
  ) {
    const { is_bigendian, width, height, encoding } = imageMessage as Image;
    image = new ImageData(width, height);
    switch (encoding) {
      case "yuv422":
        decodeYUV(rawData as unknown as Int8Array, width, height, image.data);
        break;
      case "rgb8":
        decodeRGB8(rawData, width, height, image.data);
        break;
      case "bgr8":
      case "8UC3":
        decodeBGR8(rawData, width, height, image.data);
        break;
      case "32FC1":
        decodeFloat1c(rawData, width, height, is_bigendian, image.data);
        break;
      case "bayer_rggb8":
        decodeBayerRGGB8(rawData, width, height, image.data);
        break;
      case "bayer_bggr8":
        decodeBayerBGGR8(rawData, width, height, image.data);
        break;
      case "bayer_gbrg8":
        decodeBayerGBRG8(rawData, width, height, image.data);
        break;
      case "bayer_grbg8":
        decodeBayerGRBG8(rawData, width, height, image.data);
        break;
      case "mono8":
      case "8UC1":
        decodeMono8(rawData, width, height, image.data);
        break;
      case "mono16":
      case "16UC1":
        decodeMono16(rawData, width, height, is_bigendian, image.data, options);
        break;
      case "empty":
        image = emptyImageData;
        break;
      case "rgba":
        decodeRGBA(rawData, width, height, image.data);
        break;
      default:
        throw new Error(`Unsupported encoding ${encoding}`);
    }
  } else if (
    IMAGE_DATATYPES.includes(datatype) ||
    ("format" in imageMessage && imageMessage.format)
  ) {
    const { format } = imageMessage as CompressedImage;
    image = new Blob([rawData], { type: `image/${format}` });
  } else {
    throw new Error(`Message type is not usable for rendering images.`);
  }

  return self.createImageBitmap(image);
}



function clearCanvas(canvas?: HTMLCanvasElement | OffscreenCanvas) {
  if (canvas) {
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function render({
  canvas,
  zoomMode,
  panZoom,
  bitmap,
  imageSmoothing,
  markerData,
  rotation
}: {
  canvas: HTMLCanvasElement | OffscreenCanvas;
  zoomMode: "fit" | "fill" | "other";
  panZoom: { x: number; y: number; scale: number };
  bitmap: ImageBitmap;
  imageSmoothing: boolean;
  markerData: MarkerData | undefined;
  rotation: number;
}): Dimensions | undefined {
  const bitmapDimensions = { width: 1920, height: 1080 };
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.imageSmoothingEnabled = imageSmoothing;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { markers = [], cameraModel } = markerData ?? {};

  const viewportW = canvas.width;
  const viewportH = canvas.height;

  let imageViewportScale = viewportW / bitmapDimensions.width;

  const calculatedHeight = bitmapDimensions.height * imageViewportScale;

  // if we are trying to fit and the height exeeds viewport, we need to scale on height
  if (zoomMode === "fit" && calculatedHeight > viewportH) {
    imageViewportScale = viewportH / bitmapDimensions.height;
  }

  // if we are trying to fill and the height doesn't fill viewport, we need to scale on height
  if (zoomMode === "fill" && calculatedHeight < viewportH) {
    imageViewportScale = viewportH / bitmapDimensions.height;
  }

  if (zoomMode === "other") {
    imageViewportScale = 1;
  }

  ctx.save();

  // translate x/y from the center of the canvas
  ctx.translate(viewportW / 2, viewportH / 2);
  ctx.translate(panZoom.x, panZoom.y);

  ctx.scale(panZoom.scale, panZoom.scale);
  ctx.scale(imageViewportScale, imageViewportScale);

  ctx.rotate(rotation/180*Math.PI);

  // center the image in the viewport
  // also sets 0,0 as the upper left corner of the image since markers are drawn from 0,0 on the image
  ctx.translate(-bitmapDimensions.width / 2, -bitmapDimensions.height / 2);

  // force set to 1080p
  ctx.drawImage(bitmap, 0, 0, 1920, 1080);

  // The bitmap images from the image message may be resized to conserve space
  // while the markers are positioned relative to the original image size.
  // Original width/height are the image dimensions for the marker positions
  // These dimensions are used to scale the markers positions separately from the bitmap size
  const { originalWidth = bitmapDimensions.width, originalHeight = bitmapDimensions.height } = markerData ?? {};
  ctx.scale(bitmapDimensions.width / originalWidth, bitmapDimensions.height / originalHeight);

  try {
    paintMarkers(ctx, markers as MessageEvent<ImageMarker | ImageMarkerArray>[], cameraModel);
  } catch (err) {
    console.warn("error painting markers:", err);
  } finally {
    ctx.restore();
  }
  return bitmapDimensions;
}

function paintMarkers(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  messages: MessageEvent<ImageMarker | ImageMarkerArray>[],
  cameraModel: PinholeCameraModel | undefined,
) {
  for (const { message } of messages) {
    ctx.save();
    try {
      if (Array.isArray((message as Partial<ImageMarkerArray>).markers)) {
        for (const marker of (message as ImageMarkerArray).markers) {
          paintMarker(ctx, marker, cameraModel);
        }
      } else {
        paintMarker(ctx, message as ImageMarker, cameraModel);
      }
    } catch (e) {
      console.error("Unable to paint marker to ImageView", e, message);
    } finally {
      ctx.restore();
    }
  }
}

function paintMarker(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  marker: ImageMarker,
  cameraModel: PinholeCameraModel | undefined,
) {
  //@ts-ignore
  marker["thickness"] = 4;
  switch (marker.type) {
    case ImageMarkerType.CIRCLE: {
      paintCircle(
        ctx,
        marker.position,
        marker.thickness,
        1.0,
        marker.outline_color,
        marker.filled ? marker.fill_color : undefined,
        cameraModel,
      );
      break;
    }

    case ImageMarkerType.LINE_LIST: {
      if (marker.points.length % 2 !== 0) {
        sendNotification(
          `ImageMarker LINE_LIST has an odd number of points`,
          `LINE_LIST marker "${marker.ns}$${marker.ns ? ":" : ""}${marker.id}" has ${
            marker.points.length
          } point${marker.points.length !== 1 ? "s" : ""}, expected an even number`,
          "user",
          "error",
        );
        break;
      }

      const hasExactColors = marker.outline_colors.length === marker.points.length / 2;

      for (let i = 0; i < marker.points.length; i += 2) {
        // Support the case where outline_colors is half the length of points,
        // one color per line, and where outline_colors matches the length of
        // points (although we only use the first color in this case). Fall back
        // to marker.outline_color as needed
        const outlineColor = hasExactColors
          ? marker.outline_colors[i / 2]!
          : marker.outline_colors.length > i
          ? marker.outline_colors[i]!
          : marker.outline_color;
        paintLine(
          ctx,
          marker.points[i]!,
          marker.points[i + 1]!,
          //@ts-ignore
          marker.thickness,
          outlineColor,
          cameraModel,
        );
      }

      break;
    }

    case ImageMarkerType.LINE_STRIP:
    case ImageMarkerType.POLYGON: {
      if (marker.points.length === 0) {
        break;
      }
      ctx.beginPath();
      const { x, y } = maybeUnrectifyPoint(cameraModel, marker.points[0]!);
      ctx.moveTo(x, y);
      for (let i = 1; i < marker.points.length; i++) {
        const maybeUnrectifiedPoint = maybeUnrectifyPoint(cameraModel, marker.points[i]!);
        ctx.lineTo(maybeUnrectifiedPoint.x, maybeUnrectifiedPoint.y);
      }
      if (marker.type === ImageMarkerType.POLYGON) {
        ctx.closePath();
        if (marker.filled && marker.fill_color.a > 0) {
          ctx.fillStyle = toRGBA(marker.fill_color);
          ctx.fill();
        }
      }
      if (marker.outline_color.a > 0 && marker.thickness > 0) {
        ctx.strokeStyle = toRGBA(marker.outline_color);
        //@ts-ignore
        ctx.lineWidth = marker["thickness"];
        ctx.stroke();
      }
      break;
    }

    case ImageMarkerType.POINTS: {
      for (let i = 0; i < marker.points.length; i++) {
        const point = marker.points[i]!;
        // This is not a typo. ImageMarker has an array for outline_colors but
        // not fill_colors, even though points are filled and not outlined. We
        // only fall back to fill_color if both outline_colors[i] and
        // outline_color are fully transparent
        const fillColor =
          marker.outline_colors.length > i
            ? marker.outline_colors[i]!
            : marker.outline_color.a > 0
            ? marker.outline_color
            : marker.fill_color;
        paintCircle(ctx, point, marker.scale, marker.scale, undefined, fillColor, cameraModel);
      }
      break;
    }

    case ImageMarkerType.TEXT: {
      // TEXT (our own extension on visualization_msgs/Marker)
      const { x, y } = maybeUnrectifyPoint(cameraModel, marker.position);
      const text = marker.text?.data ?? "";
      if (!text) {
        break;
      }

      const fontSize = marker.scale * 12;
      const padding = 4 * marker.scale;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textBaseline = "bottom";
      if (marker.filled) {
        const metrics = ctx.measureText(text);
        const height =
          "fontBoundingBoxAscent" in metrics
            ? metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
            : fontSize * 1.2;
        ctx.fillStyle = toRGBA(marker.fill_color);
        ctx.fillRect(x, y - height, Math.ceil(metrics.width + 2 * padding), Math.ceil(height));
      }
      ctx.fillStyle = toRGBA(marker.outline_color);
      ctx.fillText(text, x + padding, y);
      break;
    }

    default: {
      sendNotification(
        `Unrecognized ImageMarker type ${marker.type}`,
        `Marker "${marker.ns}$${marker.ns ? ":" : ""}${marker.id}" has an unrecognized type ${
          marker.type
        }`,
        "user",
        "error",
      );
    }
  }
}

function paintLine(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  pointA: Point2D,
  pointB: Point2D,
  thickness: number,
  outlineColor: Color,
  cameraModel: PinholeCameraModel | undefined,
) {
  debugger
  if (thickness <= 0 || outlineColor.a <= 0) {
    return;
  }

  const { x: x1, y: y1 } = maybeUnrectifyPoint(cameraModel, pointA);
  const { x: x2, y: y2 } = maybeUnrectifyPoint(cameraModel, pointB);

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.lineWidth = thickness;
  ctx.strokeStyle = toRGBA(outlineColor);
  ctx.stroke();
}

function paintCircle(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  point: Point2D,
  radius: number,
  thickness: number,
  outlineColor: Color | undefined,
  fillColor: Color | undefined,
  cameraModel: PinholeCameraModel | undefined,
) {
  // perf-sensitive: function params instead of options object to avoid allocations
  const hasFill = fillColor != undefined && fillColor.a > 0;
  const hasStroke = outlineColor != undefined && thickness > 0;//&& outlineColor.a > 0
  if (radius <= 0 || (!hasFill && !hasStroke)) {
    return;
  }

  const { x, y } = maybeUnrectifyPoint(cameraModel, point);
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);

  // if (hasFill) {
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.fill();
  // }

  // if (hasStroke) {
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "red";
    ctx.stroke();
  // }
}
