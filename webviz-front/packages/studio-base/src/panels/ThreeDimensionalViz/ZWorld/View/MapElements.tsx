// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// import { useWorldStore } from "@foxglove/studio-base/panels/ThreeDimensionalViz/ZWorld/Store";
import { Billboard, Text } from "@react-three/drei";
import { zhito } from "@zhito/proto";
// import { Mesh } from "three";
import * as THREE from "three";
import { Euler, Vector3 } from "three";

import { DashedLine, Segments } from "./BaseElements";

const showMapZaxis = true;
const showMapAllBound = true;
const zOffsetFactor = 1;
const colorMapping = {
    YELLOW: 0XDAA520,
    WHITE: 0xCCCCCC,
    CORAL: 0xFF7F50,
    RED: 0xFF6666,
    GREEN: 0x006400,
    GRAY: 0x444444,
    BLUE: 0x30A5FF,
    PURE_WHITE: 0xFFFFFF,
    DEFAULT: 0xC0C0C0
};
const Colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff]
let ColorIndex = 0;

export function applyOffset(points:zhito.common.IPointENU[], offset:{x:number,y:number}):Vector3[]{
    return points.map(p=>{
        // const p = PointENUToVector3(point);
        // p.setX();
        // p.x = ;
        // p.y = ;
        // p.setY((p.y??0) - offset.y);
        return {
            x:(p.x??0) - offset.x,
            y:(p.y??0) - offset.y,
            z:0} as Vector3;
    })
}

interface ILane {
    index?:string
    picked:boolean,
    lane: zhito.hdmap.ILane
    show_center: boolean
    show_id: boolean
    showPoint:boolean
    dynamicOrigin:{x:number,y:number}
    showUnknown:boolean }
export const Lane = ({ lane,index, picked,show_center, show_id, showPoint,dynamicOrigin,showUnknown }:ILane): JSX.Element => {
    // lane?.central_curve?.segment?.map(segment=>applyOffset(segment.line_segment?.point ?? [], dynamicOrigin));
    // lane.right_boundary?.curve?.segment?.forEach((segment, _index) =>  applyOffset(segment.line_segment?.point ?? [], dynamicOrigin));
    // lane.left_boundary?.curve?.segment?.forEach((segment, _index) =>  applyOffset(segment.line_segment?.point ?? [], dynamicOrigin));
    // console.log(lane?.central_curve?.segment)
    const name = `MAP_LANE_${lane.id?.id}`
    const drewObjects: JSX.Element[] = [];
    const central_line = lane?.central_curve?.segment;
    let overRiderColor = 0x000000;
    if(!picked){
        overRiderColor = 0x444444;
    }
    if (show_id) {
        overRiderColor =!picked?overRiderColor: Colors[ColorIndex] as number;
        ColorIndex++;ColorIndex=ColorIndex%Colors.length;
        const points = applyOffset(lane.central_curve?.segment?.[0]?.line_segment?.point ?? [], dynamicOrigin);
        drewObjects.push(<LaneID points={points} color={overRiderColor} id={`LANE-${index??""} ${lane.id?.id??""}`}/>)
    }


    central_line?.forEach(segment => {
        if (showMapZaxis) {
            segment.line_segment?.point?.forEach(points => points.z = 0);
        }
        // compute offset todo

        if (show_center) {
            // const points = coordinates.applyOffsetToArray(segment.line_segment.point);.
            const points = applyOffset(segment.line_segment?.point ?? [], dynamicOrigin)  as Vector3[]; ;//segment.line_segment?.point
            const centerLine = <Segments {...{ points, showPoint, name,color: overRiderColor ? overRiderColor : colorMapping.GREEN, opacity: 0.6, linewidth: 1, zOffset: zOffsetFactor, transparent: true }}></Segments>;
            // centerLine.name = "CentralLine-" + lane?.id?.id;
            drewObjects.push(centerLine);
        }

    });

    if (showMapAllBound &&
        lane.right_boundary?.boundary_type?.length && lane.right_boundary?.boundary_type?.length > 1) {
        addAllBoundTypes(lane?.id?.id || "", lane.right_boundary, drewObjects, dynamicOrigin, showUnknown);
    } else {
        const rightLaneType = lane.right_boundary?.boundary_type?.[0]?.types?.[0];
        // TODO: this is a temp. fix for repeated boundary types.
        lane.right_boundary?.curve?.segment?.forEach((segment, _index) => {
            if (showMapZaxis) {
                segment.line_segment?.point?.forEach(points => points.z = 0);
            }
            // const points = coordinates.applyOffsetToArray(segment.line_segment.point);
            const points = applyOffset(segment.line_segment?.point ?? [], dynamicOrigin)  as Vector3[];//segment.line_segment?.point as Vector3[] || [];
            const boundary = <LaneMesh
                picked={picked}
                name={name}
                showPoint={showPoint}
                laneType={rightLaneType as unknown as string}
                points={points}
                overRiderColor={overRiderColor}
                showUnknown={showUnknown}/>//(rightLaneType as unknown as string, points);
            // boundary.name = "RightBoundary-" + lane?.id?.id;
            // drewObjects.push(<Text3D color={0xffffff} position={points[0] || new Vector3()} text={lane?.id?.id ?? ""} />)
            // scene.add(boundary);
            drewObjects.push(boundary);
        });
    }

    if (showMapAllBound &&
        lane.left_boundary?.boundary_type && lane.left_boundary.boundary_type.length > 1) {
        addAllBoundTypes(lane?.id?.id || "", lane.left_boundary, drewObjects, dynamicOrigin, showUnknown);
    } else {
        const leftLaneType = (lane.left_boundary?.boundary_type?.[0]?.types?.[0] as unknown as string) || "";
        lane.left_boundary?.curve?.segment?.forEach((segment, _index) => {
            if (showMapZaxis) {
                segment.line_segment?.point?.forEach(points => points.z = 0);
            }
            // const points = coordinates.applyOffsetToArray(segment.line_segment.point);
            const points = applyOffset(segment.line_segment?.point ?? [], dynamicOrigin)  as Vector3[];
            const boundary = <LaneMesh picked={picked} name={name} showPoint={showPoint} laneType={leftLaneType} points={points} overRiderColor={overRiderColor} showUnknown={showUnknown}/>//addLaneMesh(, points);
            // boundary.name = "LeftBoundary-" + lane?.id?.id;
            // scene.add(boundary);
            // drewObjects.push(<Text3D color={0xffffff} position={points[0] || new Vector3()} text={lane?.id?.id ?? ""} />)
            drewObjects.push(boundary);
        });
    }

    return <>{...drewObjects}</>;
}

const LaneText = ({text,position,euler,color,name}:{text:string,position:Vector3,euler:Euler,color:number,name?:string})=>{
    return <Billboard
            follow={false} // Follow the camera (default=true)
            lockX={false} // Lock the rotation on the x axis (default=false)
            lockY={false} // Lock the rotation on the y axis (default=false)
            lockZ={false} // Lock the rotation on the z axis (default=false)
        ><Text
            name={name}
            position={position}
            rotation={euler}
            scale={[1, 1, 1]}
            anchorX="center" // default
            anchorY="middle" // default
            onClick={(e) => (e.stopPropagation())}
            onPointerOver={(e) => (e.stopPropagation())}
            color={color}
            fontSize={2}
            maxWidth={200}
            lineHeight={1}
            direction={'auto'}
            letterSpacing={0.02}
            textAlign={'center'}
        >
                {text}
            </Text>
        </Billboard>
}

function PointENUToVector3(point:zhito.common.IPointENU|undefined){
    if(point){
        return new Vector3(point.x||0,point.y||0,point.z||0);
    }else{
        return new Vector3()
    }

}
export const LaneID = ({ points, color, id }: { points: zhito.common.IPointENU[], color: number, id:string }) => {
    const central_line = points;//lane.central_curve?.segment?.[0]?.line_segment?.point;
    const name = `MAP_LANE_${id}`
    if (central_line && central_line.length > 1) {
        const index = Math.floor((central_line.length - 1) / 2);
        // const startPosition = PointENUToVector3(central_line[0]);
        // const endPosition = PointENUToVector3(central_line[central_line.length - 1]);
        const centerPosition = PointENUToVector3(central_line[index]);
        const rotation = new Vector3();
        const p1 = central_line[index] as zhito.common.IPointENU;
        const p2 = central_line[index + 1] as zhito.common.IPointENU;
        rotation.setX(0);
        rotation.setY(0);
        //@ts-ignore
        rotation.setZ(Math.atan2(p2.y - p1.y, p2.x - p1.x));
        const euler = new Euler().setFromVector3(rotation);
        return<>
            {/* <LaneText text={`lane ${id} start`} position={startPosition} euler={euler} color={color}/> */}
            <LaneText name={name} text={`${id}`} position={centerPosition} euler={euler} color={color}/>
            {/* <LaneText text={`lane ${id} end`} position={endPosition} euler={euler} color={color}/> */}
        </>
    }else{
        return <></>
    }
}

export const Road = ({ road,dynamicOrigin, showUnknown,showPoint,picked }: { road: zhito.hdmap.IRoad,dynamicOrigin:{x:number,y:number}, showUnknown:boolean,showPoint:boolean,picked:boolean }): JSX.Element => {
    const drewObjects: JSX.Element[] = [];
    const name = `MAP_ROAD_${road.id?.id}`
    road.section?.forEach(section => {
        section.boundary?.outer_polygon?.edge?.forEach(edge => {
            edge.curve?.segment?.forEach((segment, _index) => {
                if (showMapZaxis) {
                    segment.line_segment?.point?.forEach(points => points.z = 0);
                }
                // const points = coordinates.applyOffsetToArray(segment.line_segment.point);
                const points = applyOffset(segment.line_segment?.point ?? [], dynamicOrigin)  as Vector3[];

                const boundary = <LaneMesh picked={!!picked} name={name} showPoint={showPoint} laneType={"CURB"} points={points} showUnknown={showUnknown}/>//addLaneMesh("CURB", );
                // boundary.name = "Road-" + road?.id?.id;
                // scene.add(boundary);
                drewObjects.push(boundary);
            });
        });
    });

    return <>{...drewObjects}</>;
}

// add all repeated boundary types
const addAllBoundTypes = (_laneId: string, boundary: zhito.hdmap.ILaneBoundary, drewObjects: JSX.Element[], dynamicOrigin:{x:number,y:number},showUnknown:boolean) => {
    // collect all points in a boundary
    const name = `MAP_LANE_${_laneId}`
    let boundaryPoints: zhito.common.IPointENU[] = [];
    boundary.curve?.segment?.forEach((segment) => {
        if (showMapZaxis) {
            segment.line_segment?.point?.forEach(points => points.z = 0);
        }
        // boundaryPoints = coordinates.applyOffsetToArray(segment.line_segment?.point);
        boundaryPoints = applyOffset(segment.line_segment?.point || [],dynamicOrigin);
    });

    // collect all boundary types and the offset of each boundary type
    const typeOffsets = [], boundaryTypes = [];
    typeOffsets.push(boundary.boundary_type?.[0]?.s);
    for (let i = 1; i < (boundary.boundary_type?.length as number); i++) {
        typeOffsets.push(boundary.boundary_type?.[i]?.s);
        boundaryTypes.push(boundary.boundary_type?.[i - 1]?.types?.[0]);
    }
    boundaryTypes.push(boundary.boundary_type?.[boundary.boundary_type.length - 1]?.types?.[0]);

    // calculate length offset of each point and insert boundary type points
    const lenOffsets = [], splitedPointsList = []; // [[points]]
    let offsetSum = 0, typeOffsetIdx = 1, oneSegPoints = [];
    for (let i = 0; i < boundaryPoints.length; i++) {
        if (i > 0) {
            offsetSum += Math.sqrt(
                //@ts-ignore
                Math.pow(boundaryPoints[i]?.x - boundaryPoints[i - 1].x, 2) +
                //@ts-ignore
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
            //@ts-ignore
            const px = boundaryPoints[i - 1].x +
                //@ts-ignore
                (boundaryPoints[i].x - boundaryPoints[i - 1].x) * ratio;
            //@ts-ignore
            const py = boundaryPoints[i - 1].y +
                //@ts-ignore
                (boundaryPoints[i].y - boundaryPoints[i - 1].y) * ratio;
            // console.info("[addAllBoundTypes] laneId = %s, idx = %d, ratio = %f",
            //     laneId, typeOffsetIdx, ratio);
            //@ts-ignore
            oneSegPoints.push({ x: px, y: py, z: boundaryPoints[i - 1].z });
            splitedPointsList.push(oneSegPoints);

            oneSegPoints = [];
            //@ts-ignore
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
        // const bd = addLaneMesh(, );
        const points = splitedPointsList[i].map(p => new Vector3(p?.x, p?.y, p?.z))
        //@ts-ignore
        const bd = <LaneMesh name={name} laneType={boundaryTypes[i] || "SOLID_WHITE"} points={points}  showUnknown={showUnknown}/>
        // bd.name = "RightBoundary-" + laneId + "-" + i;

        // drewObjects.push(<Text3D color={0xffffff} position={points?.[0] || new Vector3()} text={laneId ?? ""} />)
        // scene.add(bd);
        drewObjects.push(bd);
    }
}


const LaneMesh = React.memo(({ picked,laneType, name,points,overRiderColor, showPoint, showUnknown }:
    { laneType: string, name?:string,points: Vector3[],overRiderColor?:number,showPoint?:boolean,showUnknown:boolean,picked:boolean }) => {

    const widthScale = picked ? 1 : 0.5;
    const zOffsetFactor = picked ? 10 :1;
    const opacityFactor = picked ? 1 : 0.5;
    switch (laneType) {
        case "DOTTED_YELLOW":
            return <DashedLine {...{ points,name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.YELLOW, linewidth: 4*widthScale, dashSize: 4, gapSize: 4, zOffset: zOffsetFactor, opacity: 1*opacityFactor, matrixAutoUpdate: false }} />
        // return drawDashedLineFromPoints(
        // points, colorMapping.YELLOW, 4, 3, 3, zOffsetFactor, 1, false);
        case "DOTTED_WHITE":
            return <DashedLine {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.GRAY, linewidth: 2*widthScale, dashSize: 1, gapSize: 0.5, zOffset: zOffsetFactor, opacity: 0.4*opacityFactor, matrixAutoUpdate: false }} />
        case "SOLID_YELLOW":
            return <Segments {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.YELLOW, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor, matrixAutoUpdate: false }} />
        case "SOLID_WHITE":
            return <Segments {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.GRAY, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor, matrixAutoUpdate: false }} />
        case "DOUBLE_YELLOW":
            // eslint-disable-next-line no-case-declarations
            const left = <Segments {...{ showPoint, name,points, color: overRiderColor ? overRiderColor : colorMapping.YELLOW, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor }} />

            // eslint-disable-next-line no-case-declarations
            const right = <Segments {...{
                showPoint, name,points: points.map(point =>
                    new THREE.Vector3(point.x + 0.3, point.y + 0.3, point.z)), color: overRiderColor ? overRiderColor : colorMapping.YELLOW, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor
            }} />

            // left.add(right);
            return <>{left}{right}</>;
        case "CURB":
            return <Segments {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : 0xDB3E00, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor }} />
        case "NO_MARK":
            return showUnknown ? <Segments {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.DEFAULT, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor }} /> : <></>;
        default:
            return <Segments {...{ points, name,showPoint, color: overRiderColor ? overRiderColor : colorMapping.DEFAULT, linewidth: 3*widthScale, zOffset: zOffsetFactor, opacity: 1*opacityFactor }} />

    }
})
