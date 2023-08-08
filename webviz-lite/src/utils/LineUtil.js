import * as THREE from "three";
// import { Vector3 } from "three";

const getNormals = require('polyline-normals');

const VERTS_PER_POINT = 2;


export function ThreeLine2DFadedSHader(opt) {
  opt = opt || {};
  const thickness = typeof opt.thickness === 'number' ? opt.thickness : 0.1;
  const opacity = typeof opt.opacity === 'number' ? opt.opacity : 1.0;
  const diffuse = opt.diffuse !== null ? opt.diffuse : 0xffffff;
  const dashSize = opt.dashSize ?? 1;
  const gapSize = opt.gapSize ?? 1;
  // remove to satisfy r73
  delete opt.thickness;
  delete opt.opacity;
  delete opt.diffuse;
  delete opt.precision;
  delete opt.dashSize;
  delete opt.gapSize;

  const ret = Object.assign({
    uniforms: {
      thickness: { type: 'f', value: thickness },
      opacity: { type: 'f', value: opacity },
      diffuse: { type: 'c', value: new THREE.Color(diffuse) },
      dashSize: { type: 'f', value: dashSize },
      gapSize: { type: 'f', value: gapSize }
    },
    // blending: THREE.AdditiveBlending,
    vertexShader: [
      'uniform float thickness;',
      'uniform float gapSize;',
      'uniform float dashSize;',
      'attribute float lineMiter;',
      'attribute vec2 lineNormal;',
      'attribute float lineDistance;',
      'varying float distance;',
      'void main() {',
      'distance = lineDistance;',
      'vec3 pointPos = position.xyz + vec3(lineNormal * thickness / 2.0 * lineMiter, 0.0);',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPos, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 diffuse;',
      'uniform float gapSize;',
      'uniform float dashSize;',
      'uniform float opacity;',
      'varying float distance;',
      'void main() {',
      'gl_FragColor = vec4(diffuse, opacity*(1.0-distance));',
      '}'
    ].join('\n')
  }, opt);

  const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0;
  if (threeVers < 72) {
    // Old versions need to specify shader attributes
    //@ts-ignore
    ret.attributes = {
      lineMiter: { type: 'f', value: 0 },
      lineNormal: { type: 'v2', value: new THREE.Vector2() }
    };
  }
  return ret;
}


export function ThreeLine2DBasicShader(opt) {
  opt = opt || {};
  const thickness = typeof opt.thickness === 'number' ? opt.thickness : 0.1;
  const opacity = typeof opt.opacity === 'number' ? opt.opacity : 1.0;
  const diffuse = opt.diffuse !== null ? opt.diffuse : 0xffffff;
  const dashSize = opt.dashSize ?? 1;
  const gapSize = opt.gapSize ?? 1;
  // remove to satisfy r73
  delete opt.thickness;
  delete opt.opacity;
  delete opt.diffuse;
  delete opt.precision;
  delete opt.dashSize;
  delete opt.gapSize;

  const ret = Object.assign({
    uniforms: {
      thickness: { type: 'f', value: thickness },
      opacity: { type: 'f', value: opacity },
      diffuse: { type: 'c', value: new THREE.Color(diffuse) },
      dashSize: { type: 'f', value: dashSize },
      gapSize: { type: 'f', value: gapSize }
    },
    // blending: THREE.AdditiveBlending,
    vertexShader: [
      'uniform float thickness;',
      'uniform float gapSize;',
      'uniform float dashSize;',
      'attribute float lineMiter;',
      'attribute vec2 lineNormal;',
      'attribute float lineDistance;',
      'varying float distance;',
      'void main() {',
      'distance = mod(lineDistance, gapSize+dashSize);',
      'vec3 pointPos = position.xyz + vec3(lineNormal * thickness / 2.0 * lineMiter, 0.0);',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(pointPos, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform vec3 diffuse;',
      'uniform float gapSize;',
      'uniform float dashSize;',
      'uniform float opacity;',
      'varying float distance;',
      'void main() {',
      'float visible = gapSize>=distance ? 1.0:0.0;',
      'gl_FragColor = vec4(diffuse, dashSize>0.01?opacity*visible:opacity);',
      '}'
    ].join('\n')
  }, opt);

  const threeVers = (parseInt(THREE.REVISION, 10) || 0) | 0;
  if (threeVers < 72) {
    // Old versions need to specify shader attributes
    //@ts-ignore
    ret.attributes = {
      lineMiter: { type: 'f', value: 0 },
      lineNormal: { type: 'v2', value: new THREE.Vector2() }
    };
  }
  return ret;
}


export class ThreeLine2D extends THREE.BufferGeometry {
  constructor(path, opt) {
    super();


    opt = opt || {};
    if (Array.isArray(path)) {
      opt = opt || {};
    } else if (typeof path === 'object') {
      opt = path;
      path = [];
    }
    //@ts-ignore
    this.setAttribute('position', new THREE.BufferAttribute(undefined, 3));
    //@ts-ignore
    this.setAttribute('lineNormal', new THREE.BufferAttribute(undefined, 2));
    //@ts-ignore
    this.setAttribute('lineMiter', new THREE.BufferAttribute(undefined, 1));
    if (opt.distances) {
      //@ts-ignore
      this.setAttribute('lineDistance', new THREE.BufferAttribute(undefined, 1));
    }
    if (typeof this.setIndex === 'function') {
      //@ts-ignore
      this.setIndex(new THREE.BufferAttribute(undefined, 1));
    } else {
      //@ts-ignore
      this.setAttribute('index', new THREE.BufferAttribute(undefined, 1));
    }
    //@ts-ignore
    this.update(path, opt.closed, opt.faded);
  }

}
//@ts-ignore
ThreeLine2D.prototype.update = function (_path, closed, faded = false) {

  _path = _path || [];
  const curve = new THREE.SplineCurve(_path.map(([x, y]) => new THREE.Vector3(x, y)));
  const points = curve.getPoints(5000);
  let path = points.map(p => [p.x, p.y]);

  const normals = getNormals(path, closed);

  if (closed) {
    path = path.slice();
    path.push(path[0]);
    normals.push(normals[0]);
  }

  const attrPosition = this.getAttribute('position');
  const attrNormal = this.getAttribute('lineNormal');
  const attrMiter = this.getAttribute('lineMiter');
  const attrDistance = this.getAttribute('lineDistance');
  const attrIndex = typeof this.getIndex === 'function' ? this.getIndex() : this.getAttribute('index');

  const indexCount = Math.max(0, (path.length - 1) * 6);
  if (!attrPosition.array ||
    (path.length !== attrPosition.array.length / 3 / VERTS_PER_POINT)) {
    var count = path.length * VERTS_PER_POINT;
    //@ts-ignore
    attrPosition.array = new Float32Array(count * 3);
    //@ts-ignore
    attrNormal.array = new Float32Array(count * 2);
    //@ts-ignore
    attrMiter.array = new Float32Array(count);
    //@ts-ignore
    attrIndex.array = new Uint16Array(indexCount);

    if (attrDistance) {
      //@ts-ignore
      attrDistance.array = new Float32Array(count);
    }
  }

  if (undefined !== attrPosition.count) {
    //@ts-ignore
    attrPosition.count = count;
  }
  attrPosition.needsUpdate = true;

  if (undefined !== attrNormal.count) {
    //@ts-ignore
    attrNormal.count = count;
  }
  attrNormal.needsUpdate = true;

  if (undefined !== attrMiter.count) {
    //@ts-ignore
    attrMiter.count = count;
  }
  attrMiter.needsUpdate = true;
  //@ts-ignore
  if (undefined !== attrIndex.count) {
    //@ts-ignore
    attrIndex.count = indexCount;
  }
  //@ts-ignore
  attrIndex.needsUpdate = true;

  if (attrDistance) {
    if (undefined !== attrDistance.count) {
      //@ts-ignore
      attrDistance.count = count;
    }
    attrDistance.needsUpdate = true;
  }

  let index = 0;
  let c = 0;
  let dIndex = 0;
  //@ts-ignore
  const indexArray = attrIndex.array;
  let distance = 0;
  let lastPoint;
  path.forEach((point, pointIndex, list) => {
    const i = index;
    //@ts-ignore
    indexArray[c++] = i + 0;
    //@ts-ignore
    indexArray[c++] = i + 1;
    //@ts-ignore
    indexArray[c++] = i + 2;
    //@ts-ignore
    indexArray[c++] = i + 2;
    //@ts-ignore
    indexArray[c++] = i + 1;
    //@ts-ignore
    indexArray[c++] = i + 3;

    attrPosition.setXYZ(index++, point[0], point[1], 0);
    attrPosition.setXYZ(index++, point[0], point[1], 0);

    if (attrDistance) {
      if (lastPoint) {
        const length = Math.sqrt(Math.pow(point[0] - lastPoint[0], 2) + Math.pow(point[1] - lastPoint[1], 2));
        distance += length;

      }
      // console.log(distance)
      const d = faded ? pointIndex / (list.length - 1) : distance;//;
      // faded && console.log(d,pointIndex)
      attrDistance.setX(dIndex++, d);
      attrDistance.setX(dIndex++, d);
      lastPoint = point;
    }
  });

  let nIndex = 0;
  let mIndex = 0;
  normals.forEach((n) => {
    const norm = n[0];
    const miter = n[1];
    attrNormal.setXY(nIndex++, norm[0], norm[1]);
    attrNormal.setXY(nIndex++, norm[0], norm[1]);

    attrMiter.setX(mIndex++, -miter);
    attrMiter.setX(mIndex++, miter);
  });
};
