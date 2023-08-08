import { zhito } from "@foxglove/studio-base/../../zhito-proto"
import { ImageMarker, ImageMarkerArray, Point } from "@foxglove/studio-base/types/Messages"

const COLOR_RED = { r: 255, g: 0, b: 0, a: 1 }
const COLOR_YELLOW = { r: 255, g: 255, b: 0, a: 1 }
const COLOR_WHITE = { r: 255, g: 255, b: 255, a: 1 }
// const COLOR_GREEN = { r: 0, g: 255, b: 0, a: 1 }
const ImageMarkerType = {
  CIRCLE: 0,
  LINE_STRIP: 1,
  LINE_LIST: 2,
  POLYGON: 3,
  POINTS: 4,
  // TEXT is not part of visualization_msgs/ImageMarker, but we include it to
  // support existing frameworks that have extended this message definition
  TEXT: 5,
}
function emptyImageMarker() {
  return {
    header: {
      frame_id: "",
      stamp: { sec: 0, nsec: 0 },
      seq: 0,
    },
    ns: "",
    id: 0,
    type: 0,
    action: 0,
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    outline_color: COLOR_RED,
    filled: false,
    fill_color: COLOR_RED,
    lifetime: { sec: 0, nsec: 0 },
    points: [] as Point[],
    outline_colors: [],
    thickness: 1,
    // `text` is not part of visualization_msgs/ImageMarker, but we include it to
    // support existing frameworks that have extended this message definition
    text: { data: "" },
  }
}
export const zlocVisToImageMarker = (vis: zhito.zloc.visualization.ZlocVisualization): ImageMarkerArray  => {
  const markers = [] as ImageMarker[]
  let index = 0;
  const sec = (vis.perception?.measurement_time??(Date.now()/1000)) + 0.05
  const time = secToTime(sec)
  // empty marker to sync timestamp
  const emarker = emptyImageMarker();
  emarker.header.stamp = time;
  markers.push(emarker);
  if (vis.map_reproject) {
    let line_segments = vis.map_reproject.line_segment || [];
    for (let line_segment of line_segments) {
      const marker = emptyImageMarker();
      marker.header.stamp = time;
      marker.id = index++;
      marker.ns = "map_reproject";
      const point = { x: 0, y: 0, z: 0 };
      for (let line_segment_point of (line_segment.line_segment_points||[])) {
        point.x = line_segment_point.x ?? 0;
        point.y = line_segment_point.y ?? 0;
        point.z = 0.0;
        marker.points.push({...point});
      }
      marker.outline_color = COLOR_YELLOW;
      marker.fill_color = marker.outline_color;
      marker.outline_color.r = 0.0;
      marker.outline_color.g = 255.0;
      marker.outline_color.b = 0.0;
      marker.outline_color.a = 1.0;
      marker.type = ImageMarkerType.LINE_STRIP;
      markers.push(marker);
    }
  }

  if (vis.perception) {
    const line_segments = vis.perception.line_segment ?? [];
    for (let line_segment of line_segments) {
      const marker = emptyImageMarker();
      marker.header.stamp = time;
      marker.id = index++;
      marker.ns = "per";
      const point = { x: 0, y: 0, z: 0 };
      const line_segment_points = line_segment.line_segment_points ?? []
      for (let line_segment_point of line_segment_points) {
        point.x = line_segment_point.x??0;
        point.y = line_segment_point.y??0;
        point.z = 0.0;
        marker.points.push({...point});
      }
      marker.outline_color = COLOR_RED;
      marker.fill_color = marker.outline_color;
      marker.outline_color.r = 255.0;
      marker.outline_color.g = 0.0;
      marker.outline_color.b = 0.0;
      marker.outline_color.a = 1.0;
      marker.type = ImageMarkerType.LINE_STRIP;
      markers.push(marker);
    }
  }
  return { markers }
}

export const perceptionLocToImageMarker = (loc: zhito.perception.PerceptionLocMessage): ImageMarkerArray => {
  const markers = [] as ImageMarker[]
  let index = 0;
  const time = secToTime(loc.measurement_time)
  const emarker = emptyImageMarker();
  emarker.header.stamp = time;
  markers.push(emarker);
  for (let line_segment of loc.line_segment) {
    const marker = emptyImageMarker();
    marker.header.frame_id = loc.header?.frame_id ?? "";
    marker.header.stamp = time;
    marker.id = index++;
    marker.ns = "imageMarker";
    const point = { x: 0, y: 0, z: 0 };
    for (let line_segment_point of (line_segment.line_segment_points || [])) {
      point.x = line_segment_point.x ?? 0;
      point.y = line_segment_point.y ?? 0;
      marker.points.push({ ...point });
    }
    switch (line_segment.line_segment_color) {
      case zhito.perception.PerceptionLineSegment.LineSegmentColor.OTHER:
        marker.outline_color = COLOR_RED;
        break;
      case zhito.perception.PerceptionLineSegment.LineSegmentColor.WHITE:
        marker.outline_color = COLOR_WHITE;
        break;
      case zhito.perception.PerceptionLineSegment.LineSegmentColor.YELLOW:
        marker.outline_color = COLOR_YELLOW;
        break;
      default:
        marker.outline_color = COLOR_RED;
        break;
    }
    marker.fill_color = marker.outline_color;
    marker.type = ImageMarkerType.LINE_STRIP;
    markers.push(marker);
  }

  for (let sign of loc.sign) {
    const marker = emptyImageMarker();
    marker.header.frame_id = loc.header?.frame_id ?? "";
    marker.header.stamp = time;
    marker.id = index++;
    marker.ns = "signMarker";
    const point = { x: 0, y: 0, z: 0 }
    for (let signPoint of (sign.points || [])) {
      point.x = signPoint.x ?? 0;
      point.y = signPoint.y ?? 0;
      marker.points.push({ ...point });
    }
    if (marker.points[0]) {
      marker.points.push(marker.points[0]);
    }


    marker.outline_color = COLOR_RED;

    marker.fill_color = marker.outline_color;
    marker.type = ImageMarkerType.LINE_STRIP;
    markers.push(marker);
  }
  return { markers }
}

// export const protoToImageMarker = (messageEvent: MessageEvent, datatype: string): MessageEvent => {
//   const markers: ImageMarker[] = [];
//   if (datatype === "zhito.zloc.visualization.ZlocVisualization") {
//     const message = messageEvent.message as zhito.zloc.visualization.ZlocVisualization;
//   } else if (datatype === "zhito.perception.PerceptionLocMessage") {
//     const message = messageEvent.message as zhito.perception.PerceptionLocMessage;
//     perceptionLocToImageMarker(message)
//   }
//   return {
//     ...messageEvent,
//     message: { markers }
//   }
// }

export const secToTime = (sec: number) => {
  const intsec = Math.floor(sec);
  return {
    sec: intsec,
    nsec: (sec - intsec) * 1e9,
  }
}
export const nanoToTime = (ns: bigint | number | string) => {
  const intnumber = (typeof ns === "bigint") ? ns : BigInt(ns);
  return {
    sec: Number(intnumber / 1_000_000_000n),
    nsec: Number(intnumber % 1_000_000_000n),
  }
}
