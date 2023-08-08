import { zhito } from "@zhito/proto";
import { useCallback, useEffect, useState } from "react";

import {
  Points
} from "@foxglove/regl-worldview";
import { useMessagesByTopic } from "@foxglove/studio-base/PanelAPI";
import { useDreamViewMapServer, useDreamviewPlayer, useDreamviewServer } from "@foxglove/studio-base/context/Dreamview/Dreamview";
import useGuaranteedContext from "@foxglove/studio-base/hooks/useGuaranteedContext";
import { TopicTreeContext } from "@foxglove/studio-base/panels/ThreeDimensionalViz/TopicTree/useTopicTree";
import { Point, MarkerArray, Marker, Color } from "@foxglove/studio-base/types/Messages";
import { ZHITO_MAP_TOPIC } from "@foxglove/studio-base/util/globalConstants";

export const LOCAL_MAP_RADIUS = 500;


const mapGeometryStore = new Map<string, MarkerArray>()
const colorMapping = {
  YELLOW: { r: 0XDA / 255, g: 0xA5 / 255, b: 0x20 / 255, a: 1 },//
  WHITE: { r: 0XCC / 255, g: 0xCC / 255, b: 0xCC / 255, a: 1 },//0xCCCCCC,
  CORAL: { r: 0XFF / 255, g: 0x7F / 255, b: 0x50 / 255, a: 1 },//0xFF7F50,
  RED: { r: 0XFF / 255, g: 0x66 / 255, b: 0x66 / 255, a: 1 },//0xFF6666,
  GREEN: { r: 0X00 / 255, g: 0x64 / 255, b: 0x00 / 255, a: 1 },//0x006400,
  BLUE: { r: 0X30 / 255, g: 0xA5 / 255, b: 0xFF / 255, a: 1 },//0x30A5FF,
  PURE_WHITE: { r: 0XFF / 255, g: 0xFF / 255, b: 0xFF / 255, a: 1 },//0xFFFFFF,
  DEFAULT: { r: 0XC0 / 255, g: 0xC0 / 255, b: 0xC0 / 255, a: 1 },//0xC0C0C0
};

type DrawProps = {
  points: Point[];
  color: Color;
  width: number;
  ns: string
}

function convertePoints(points: zhito.common.IPointENU[]): Point[] {
  return points.map(point => {
    return {
      x: point.x || 0,
      y: point.y || 0,
      z: point.z || 0

    }
  })
}
function drawSegmentsFromPoints(props: DrawProps) {
  const { ns, color, points } = props;
  const geometry: Marker = {
    type: 4,
    header: { frame_id: "world", stamp: { sec: 0, nsec: 0 }, seq: 0 },
    ns,
    id: Math.floor(Math.random() * 1e6),
    action: 0,
    pose: {
      position: { x: 0, y: 0, z: 0 },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
    scale: { x: 0.12, y: 1, z: 1 },
    color,
    frame_locked: true,
    points,
    // scaleInvariant: true,
  };
  return geometry;
}

function addLaneMesh(_laneType: string, points: zhito.common.IPointENU[], ns: string = "") {
  return drawSegmentsFromPoints({ points: convertePoints(points), color: colorMapping.WHITE, width: 2, ns });
}


function creteAllBoundTypes(markers: Marker[], boundary: zhito.hdmap.ILaneBoundary) {
  // collect all points in a boundary
  let boundaryPoints: Points[] = [];
  const showMapZaxis = true;
  if (boundary.curve?.segment) {
    boundary.curve.segment.forEach((segment) => {
      if (!segment?.line_segment?.point) {return;}
      if (showMapZaxis) {
        segment.line_segment.point.forEach(points => points.z = 0);
      }
      boundaryPoints = segment.line_segment.point;
    });
  }


  // collect all boundary types and the offset of each boundary type
  const typeOffsets = [], boundaryTypes = [];
  if (boundary.boundary_type?.[0]?.s) {
    typeOffsets.push(boundary.boundary_type[0].s);
    for (let i = 1; i < boundary.boundary_type.length; i++) {
      //@ts-ignore
      typeOffsets.push(boundary.boundary_type[i].s);
      //@ts-ignore
      boundaryTypes.push(boundary.boundary_type[i - 1].types[0]);
    }
    //@ts-ignore
    boundaryTypes.push(boundary.boundary_type[boundary.boundary_type.length - 1].types[0]);
  }


  // calculate length offset of each point and insert boundary type points
  const lenOffsets = [], splitedPointsList = []; // [[points]]
  let offsetSum = 0, typeOffsetIdx = 1, oneSegPoints = [];
  for (let i = 0; i < boundaryPoints.length; i++) {
    if (i > 0) {
      offsetSum += Math.sqrt(
        Math.pow(boundaryPoints[i].x - boundaryPoints[i - 1].x, 2) +
        Math.pow(boundaryPoints[i].y - boundaryPoints[i - 1].y, 2)
      );
    }
    lenOffsets.push(offsetSum);

    const loi = lenOffsets.length - 1;
    if (loi < 1 || typeOffsetIdx >= typeOffsets.length) {
      oneSegPoints.push(boundaryPoints[i]);
      continue;
    }
    //@ts-ignore
    while (lenOffsets[loi - 1] <= typeOffsets[typeOffsetIdx] &&
      //@ts-ignore
      typeOffsets[typeOffsetIdx] < lenOffsets[loi]) {
      //@ts-ignore
      const ratio = (typeOffsets[typeOffsetIdx] - lenOffsets[loi - 1]) /
        //@ts-ignore
        (lenOffsets[loi] - lenOffsets[loi - 1]);
      const px = boundaryPoints[i - 1].x +
        (boundaryPoints[i].x - boundaryPoints[i - 1].x) * ratio;
      const py = boundaryPoints[i - 1].y +
        (boundaryPoints[i].y - boundaryPoints[i - 1].y) * ratio;
      oneSegPoints.push({ x: px, y: py, z: boundaryPoints[i - 1].z });
      splitedPointsList.push(oneSegPoints);

      oneSegPoints = [];
      oneSegPoints.push({ x: px, y: py, z: boundaryPoints[i - 1].z });

      if (++typeOffsetIdx >= typeOffsets.length) {
        break;
      }
    }
    oneSegPoints.push(boundaryPoints[i]);
  }
  if (oneSegPoints.length > 0) {
    splitedPointsList.push(oneSegPoints);
  }

  for (let i = 0; i < splitedPointsList.length; i++) {
    //@ts-ignore
    const bd = addLaneMesh(boundaryTypes[i], splitedPointsList[i], "RightBoundary");
    markers.push(bd);
  }
}

function msgToGeometry(type: string, proto: zhito.hdmap.Road | zhito.hdmap.Lane): MarkerArray {
  const message: { markers: Marker[] } = {
    markers: []
  };
  if (type === "road") {
    (proto as zhito.hdmap.Road).section.forEach(section => {
      if (section.boundary && section.boundary.outer_polygon && section.boundary.outer_polygon.edge && section.boundary.outer_polygon.edge)
        {section.boundary.outer_polygon.edge.forEach(edge => {
          if (edge.curve && edge.curve.segment) {
            edge.curve.segment.forEach((segment, _index) => {
              if (segment.line_segment && segment.line_segment.point) {
                segment.line_segment.point.forEach(points => points.z = 0);
                const points = segment.line_segment.point;
                const boundary = addLaneMesh("CURB", points, "ROAD");
                message.markers.push(boundary);
              }

            });
          }

        });}
    });
  } else if (type === "lane") {
    const lane = proto as zhito.hdmap.Lane;
    const central_curve = (proto as zhito.hdmap.Lane).central_curve;
    const showMapZaxis = true;//STORE.options["showMapZaxis"]
    const showMapAllBound = false;
    if (central_curve && central_curve.segment) {
      const centralLine = central_curve.segment;
      centralLine.forEach(segment => {
        if (!segment || !segment.line_segment || !segment.line_segment.point) {return;}
        if (showMapZaxis) {
          segment.line_segment.point.forEach(points => points.z = 0);

        }
        const points = segment.line_segment.point;
        const centerLine = drawSegmentsFromPoints({ points: convertePoints(points), color: colorMapping.GREEN, width: 1, ns: "CenterLine" });
        message.markers.push(centerLine);
      });

      if (lane.right_boundary && lane.right_boundary.boundary_type) {
        if (showMapAllBound &&
          lane.right_boundary.boundary_type.length > 1) {
          console.info("[creteAllBoundTypes] right bound type size = %d",
            lane.right_boundary.boundary_type.length);
          creteAllBoundTypes(message.markers, lane.right_boundary);
        } else {
          if (lane.right_boundary.boundary_type[0] && lane.right_boundary.boundary_type[0].types) {
            const rightLaneType = lane.right_boundary.boundary_type[0].types[0];
            // TODO: this is a temp. fix for repeated boundary types.
            if (lane.right_boundary?.curve?.segment) {
              lane.right_boundary.curve.segment.forEach((segment, _index) => {
                if (!segment.line_segment?.point) {return;}
                if (showMapZaxis) {
                  segment.line_segment.point.forEach(points => points.z = 0);
                }
                const points = segment.line_segment.point;
                //@ts-ignore
                const boundary = addLaneMesh(rightLaneType, points, "RightBoundary");
                message.markers.push(boundary)
              });
            }

          }

        }
      }

      if (lane?.left_boundary?.boundary_type) {
        if (showMapAllBound &&
          lane?.left_boundary?.boundary_type.length > 1) {
          console.info("[creteAllBoundTypes] left bound type size = %d",
            lane.left_boundary.boundary_type.length);
          creteAllBoundTypes(message.markers, lane.left_boundary)
        } else {
          if (lane.left_boundary.boundary_type[0]?.types?.[0] &&
            lane.left_boundary.curve?.segment
          ) {
            const leftLaneType = lane.left_boundary.boundary_type[0].types[0];
            lane.left_boundary.curve.segment.forEach((segment, _index) => {
              if (!segment.line_segment?.point) {return;}
              if (showMapZaxis) {
                segment.line_segment.point.forEach(points => points.z = 0);
              }
              const points = segment.line_segment.point;
              //@ts-ignore
              const boundary = addLaneMesh(leftLaneType, points, "LeftBoundary");
              message.markers.push(boundary);
            });
          }

        }
      }

    }



  }
  return message;
}
export default function () {
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [updatePose, setUpdatePose] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  // const [mapElements, setMapElements] = useState<MarkerArray[]>([]);
  // const [mapElementIds, setMapElementIds] = useState<Record<string, string[]>>({});
  const { selectedTopicNames } = useGuaranteedContext(TopicTreeContext, "TopicTreeContext");

  const posTopic = "/zhito/localization/pose"
  const { [posTopic]: poseMsg } = useMessagesByTopic({
    topics: [posTopic],
    historySize: 1
  })
  const mapServer = useDreamViewMapServer();
  const server = useDreamviewServer();
  const requestMapElements = useCallback((msg: { mapElementIds: string[] }) => {
    const mapServer = useDreamViewMapServer();
    mapServer.requestMapData(msg.mapElementIds)
  }, []);

  const parseMap = useCallback(({ data: mapdata }) => {
    const types = Object.keys(mapdata);
    const geometrys: { markers: Marker[] } = { markers: [] }
    types.forEach(type => {
      const items = mapdata[type] as any[];
      if (items && items.length > 0) {
        items.forEach(item => {
          const id = item.id.id;
          if (!mapGeometryStore.get(id)) {
            const geometry = msgToGeometry(type, item);
            mapGeometryStore.set(id, geometry);
          }
          const geometry = mapGeometryStore.get(id) as MarkerArray;
          geometrys.markers = geometrys.markers.concat(geometry.markers)

        })
      }



    })
    const player = useDreamviewPlayer();
    const now = Date.now();
    const sec = Math.floor(now / 1000)
    const nsec = Math.floor((now - sec * 1000) * 1e6)
    geometrys.markers.forEach(marker => {
      marker.header.stamp.sec = sec;
      marker.header.stamp.nsec = nsec;
    })
    const msg = {
      receiveTime: { sec, nsec },
      topic: ZHITO_MAP_TOPIC,
      message: geometrys,
      sizeInBytes: 10000
    }
    //@ts-ignore
    player?._handleInternalMessage?.(msg);
    //@ts-ignore
    player?._parsedMessages?.push(msg);
  }, [])
  useEffect(() => {

    if (selectedTopicNames.includes(ZHITO_MAP_TOPIC)) {

      //@ts-ignore
      server.on("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.on("map", parseMap)
    }

    return () => {
      //@ts-ignore
      server.off("MapElementIds", requestMapElements)
      //@ts-ignore
      mapServer.off("map", parseMap)
    }
  }, [selectedTopicNames])
  useEffect(() => {
    if (!selectedTopicNames.includes(ZHITO_MAP_TOPIC)) {
      return;
    }
    const now = Date.now();
    const deltaTime = now - updateTime;
    if (deltaTime > 1000) {
      setUpdateTime(now);
      if (poseMsg && poseMsg.length > 0) {
        //@ts-ignore
        const currentPose = poseMsg[0]?.message.position;
        const [dx, dy] = [currentPose.x - updatePose.x, currentPose.y - updatePose.y];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > LOCAL_MAP_RADIUS / 2 && mapServer.ready && server.ready) {
          server.requestMapElementIdsByRadius(LOCAL_MAP_RADIUS * 1.5);
          setUpdatePose({ x: currentPose.x, y: currentPose.y })
        }
      }
    }

  }, [poseMsg, updateTime, selectedTopicNames]);
  // const grid = useMemo(() => {
  //   const width = 10;
  //   const halfWidth = width / 2;
  //   const subdivisions = 9;
  //   const step = width / (subdivisions + 1);

  //   const gridPoints: Point[] = [];
  //   for (let i = 0; i <= subdivisions + 1; i++) {
  //     gridPoints.push({ x: i * step - halfWidth, y: halfWidth, z: 0 });
  //     gridPoints.push({ x: i * step - halfWidth, y: -halfWidth, z: 0 });

  //     gridPoints.push({ x: halfWidth, y: i * step - halfWidth, z: 0 });
  //     gridPoints.push({ x: -halfWidth, y: i * step - halfWidth, z: 0 });
  //   }
  //   const grid: InstancedLineListMarker = {
  //     type: 108,
  //     header: { frame_id: "", stamp: { sec: 0, nsec: 0 }, seq: 0 },
  //     ns: "offline",
  //     id: "map",
  //     action: 0,
  //     pose: {
  //       position: { x: 0, y: 0, z: 0 },
  //       orientation: { x: 0, y: 0, z: 0, w: 1 },
  //     },
  //     scale: { x: 1, y: 1, z: 1 },
  //     color: DEFAULT_GRID_COLOR,
  //     frame_locked: false,
  //     points: gridPoints,
  //     scaleInvariant: true,
  //   };
  //   return grid;
  // }, [])


  return (<div />);
}
