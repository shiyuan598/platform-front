import React, { useRef, useEffect } from "react"
import { Shape } from "three"
import { extend,  useFrame } from "@react-three/fiber"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
import { Line2 } from "three/examples/jsm/lines/Line2"


extend({ LineMaterial, LineGeometry, Line2 })

export const Line2D = () => {
  // const { size, scene } = useThree()
  const lRef = useRef()
  // let sqcircle
  const lineGeom = new LineGeometry()

  const width = 15
  const height = 15
  const x1 = -width / 2
  const y = -height / 2
  const radius = 5
  const roundedRect = new Shape()
  roundedRect.moveTo(x1, y + radius)
  roundedRect.lineTo(x1, y + height - radius)
  roundedRect.quadraticCurveTo(x1, y + height, x1 + radius, y + height)
  roundedRect.lineTo(x1 + width - radius, y + height)
  roundedRect.quadraticCurveTo(x1 + width, y + height, x1 + width, y + height - radius)
  roundedRect.lineTo(x1 + width, y + radius)
  roundedRect.quadraticCurveTo(x1 + width, y, x1 + width - radius, y)
  roundedRect.lineTo(x1 + radius, y)
  roundedRect.quadraticCurveTo(x1, y, x1, y + radius)
  const points = roundedRect.getPoints().reduce((acc, { x, y }) => [...acc, x, y, 0], [], [])
  //  geom.setPositions(points)
  lineGeom.setPositions(points)
  // sqcircle = points
  /*
  const ref = useUpdate((geom) => {
    const width = 150
    const height = 150
    const x1 = -width / 2
    const y = -height / 2
    const radius = 50
    const roundedRect = new Shape()
    roundedRect.moveTo(x1, y + radius)
    roundedRect.lineTo(x1, y + height - radius)
    roundedRect.quadraticCurveTo(x1, y + height, x1 + radius, y + height)
    roundedRect.lineTo(x1 + width - radius, y + height)
    roundedRect.quadraticCurveTo(x1 + width, y + height, x1 + width, y + height - radius)
    roundedRect.lineTo(x1 + width, y + radius)
    roundedRect.quadraticCurveTo(x1 + width, y, x1 + width - radius, y)
    roundedRect.lineTo(x1 + radius, y)
    roundedRect.quadraticCurveTo(x1, y, x1, y + radius)
    const points = roundedRect.getPoints().reduce((acc, { x, y }) => [...acc, x, y, 0], [], [])
    geom.setPositions(points)
    lineGeom.setPositions(points)
    sqcircle = points
  }, [])
*/
  //const points = useMemo(() => sqcircle, [])
  // const points = useMemo(() => [new Vector3(-10, 0, 0), new Vector3(0, 10, 0), new Vector3(10, 0, 0)], [])

  // const onUpdate = useCallback(self => self.setFromPoints(points), [points])

  //const update = useCallback(self => ( self.computeLineDistances()), [])

  //lineGeom.setPositions(sqcircle)
  /*
lineGeom.setPositions([
  0,
  window.innerHeight / 2,
  -2,
  0,
  -window.innerHeight / 2,
  -2
]);
*/
  const lineSolidMat = new LineMaterial({
    color: 0x0000ff,
    linewidth: 10
  })
  lineSolidMat.resolution.set(window.innerWidth, window.innerHeight)

  const lineMat = new LineMaterial({
    color: 0x0000ff,
    linewidth: 0.2,
    // dashed: true,
    worldUnits:true,
    dashSize: 15,
    gapSize: 5,
    dashScale: 1
  })
  lineMat.defines.USE_DASH = ""
  lineMat.resolution.set(window.innerWidth, window.innerHeight)

  const makeLine = () => new Line2(lineGeom, lineMat)
  const line = makeLine()

  // const spacing = 100

  useEffect(() => {
    //  lRef.current.computeLineDistances()

    //  const lineGroup = new Group();
    //  scene.add(lineGroup);
    // lRef.current

    line.computeLineDistances()
    //  line.material.color.set('#ffffff')
    //  line.position.set(i * spacing - window.innerWidth / 2, 0, 0);
    //lineGroup.add(line);
    lRef.current.add(line)
    // lineGroup.position.z = 1
  }, [line])

  useFrame(() => {
    // lRef.current.computeLineDistances()
  })

  function clickHandler() {
    console.log(lRef.current)
    console.log(line.material)
    line.material = lineSolidMat
    //line.computeLineDistances();
    /*  line.material.dashScale=1
    line.material.dash=false
    line.material.dashSize=1
    line.material.gapSize=1
*/

    // lRef.current.computeLineDistances()
  }

  function setColor(val) {
    line.material.color.set(val)
  }

  return (
    <group
      ref={lRef}
      onClick={clickHandler}
      position={[0,0.01,0]}
      onPointerOver={() => {
        //console.log('hover')
        setColor("orange")
      }}
      onPointerOut={() => setColor("#2d383a")}
      >
      {/*
    <line2
    ref ={lRef}
    onClick={clickHandler}
   // onUpdate={update}
    >
      <lineGeometry attach="geometry" onUpdate={onUpdate}  />
      <lineMaterial 
        attach="material" 
        color={'purple'} 
        linewidth={20} 
        dashSize={5}
        dashScale={1}
        gapSize={5}
        resolution={[size.width, size.height]} 
        dashed={true}  
      />
    </line2>
      */}
    </group>
  )
}


