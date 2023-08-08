// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

// @flow

//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

// import React from "react";
import REGL, { DrawConfig } from "regl";

import { withPose } from "@foxglove/regl-worldview";//"../utils/commandUtils";
import { nonInstancedGetChildrenForHitmap } from "@foxglove/regl-worldview";//"../utils/getChildrenForHitmapDefaults";
import { CommonCommandProps, Command } from "@foxglove/regl-worldview";//"./Command";
import { Pose } from "@foxglove/studio-base/types/Messages";

const DEFAULT_GRID_COLOR = [0.6, 0.6, 0.6, 0.3];
type Uniforms = {
  pointSize: number;
  angle_min: number;
  angle_increment: number;
  range_min: number;
  range_max: number;
  isHitmap: boolean;
  isCircle: boolean;
  color: number[];
};

type OwnContext = Record<string, never>;
export function grid(): DrawConfig<Uniforms, { point: number[][]; color: number[]; }, Props, OwnContext, REGL.DefaultContext> {
  return withPose({
    vert: `
    #WITH_POSE
    precision mediump float;
    uniform mat4 projection, view;

    attribute vec3 point;
    attribute vec4 color;
    varying vec4 fragColor;

    void main () {
      fragColor = color;
      vec3 p = applyPose(point);
      gl_Position = projection * view * vec4(p, 1);
    }
    `,
    frag: `
      precision mediump float;
      varying vec4 fragColor;
      void main () {
        gl_FragColor = fragColor;
      }
    `,
    primitive: "lines",
    attributes: {
      point: (_context, props: Props) => {
        const points = [];
        const bound = props.count;
        const perSize = props.perSize;
        for (let i = -props.count; i < props.count; i++) {
          points.push([-bound * perSize, i * perSize, 0]);
          points.push([bound * perSize, i * perSize, 0]);
          points.push([i * perSize, -bound * perSize, 0]);
          points.push([i * perSize, bound * perSize, 0]);
        }
        return points;
      },
      color: (_context, props: Props) => {
        const color = DEFAULT_GRID_COLOR;
        return new Array(props.count * 4 * 2).fill(color);
      }
    },
    // depth: defaultDepth,
    blend: {
      enable: true,
      func: {
        src: "src alpha",
        dst: "one minus src alpha",
      },
    },

    depth: {
      // If overwriteDepthBuffer is enabled, we will always
      // write to the depth buffer with a "far away" value of 1.
      // The result is similar to calling regl.clear({ depth: 1 }).
      enable: false,
      func: "always",
    },
    count: (_context, props) => {
      // 8 points per count
      const count = props.count * 4 * 2;
      return count;
    },
  });
}

interface Props extends CommonCommandProps {
  perSize: number,
  count: number,
  pose: Pose
}

// useful for rendering a grid for debugging in stories

export default function Grid({ count, perSize, pose, ...rest }: Props): JSX.Element {

  const children = { count, perSize, pose };
  // console.log(pose.position.x.toFixed(2),pose.position.y.toFixed(2));//,);
  return (
    <Command getChildrenForHitmap={nonInstancedGetChildrenForHitmap} {...rest} reglCommand={grid}>
      {children}
    </Command>
  );
}

Grid.defaultProps = { count: 6, perSize: 1 };
