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
import {
  METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR,
  METERS_PER_SECOND_TO_MILES_PER_HOUR,
  MILES_PER_HOUR_TO_METERS_PER_SECOND,
  MILES_PER_HOUR_TO_KILOMETERS_PER_HOUR,
} from "@foxglove/studio-base/util/globalConstants";

export type MathFunction = (arg: number) => number;

export function derivative<T extends { x: number; y: number; path: string }>(data: T[]): T[] {
  const newDatums = [];
  for (let i = 1; i < data.length; i++) {
    const item = data[i]!;
    const prevItem = data[i - 1]!;
    const secondsDifference = item.x - prevItem.x;
    const value = (item.y - prevItem.y) / secondsDifference;
    newDatums.push({
      ...item,
      y: value,
      value,
      path: `${item.path}.@derivative`,
    });
  }
  return newDatums;
}

export const mathFunctions: { [fn: string]: MathFunction } = {
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  ceil: Math.ceil,
  cos: Math.cos,
  log: Math.log,
  log1p: Math.log1p,
  log2: Math.log2,
  log10: Math.log10,
  round: Math.round,
  sign: Math.sign,
  sin: Math.sin,
  sqrt: Math.sqrt,
  tan: Math.tan,
  trunc: Math.trunc,
  negative: (value: number) => -value,
  deg2rad: (degrees: number) => degrees * (Math.PI / 180),
  rad2deg: (radians: number) => radians * (180 / Math.PI),
  mps2kph: (metersPerSecond: number) => metersPerSecond * METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR,
  kph2mps: (kmPerHour: number) => kmPerHour / METERS_PER_SECOND_TO_KILOMETERS_PER_HOUR,
  mps2mph: (metersPerSecond: number) => metersPerSecond * METERS_PER_SECOND_TO_MILES_PER_HOUR,
  mph2mps: (milesPerHour: number) => milesPerHour * MILES_PER_HOUR_TO_METERS_PER_SECOND,
  mph2kph: (milesPerHour: number) => milesPerHour * MILES_PER_HOUR_TO_KILOMETERS_PER_HOUR,
  kph2mph: (kmPerHour: number) => kmPerHour / MILES_PER_HOUR_TO_KILOMETERS_PER_HOUR,
  ms2sec: (value: number) => value / 1000,
  sec2ms: (value: number) => value * 1000,
  recip: (value:number) => 1/value,
  m1e1: (value:number) => value*1e1,
  m1e2: (value:number) => value*1e2,
  m1e3: (value:number) => value*1e3,
  m1e4: (value:number) => value*1e4,
  m1e5: (value:number) => value*1e5,
  m1e6: (value:number) => value*1e6,
  m1e7: (value:number) => value*1e7,
  m1e8: (value:number) => value*1e8,
  m1e9: (value:number) => value*1e9,
  d1e1: (value:number) => value/1e1,
  d1e2: (value:number) => value/1e2,
  d1e3: (value:number) => value/1e3,
  d1e4: (value:number) => value/1e4,
  d1e5: (value:number) => value/1e5,
  d1e6: (value:number) => value/1e6,
  d1e7: (value:number) => value/1e7,
  d1e8: (value:number) => value/1e8,
  d1e9: (value:number) => value/1e9,
};

export function applyToDatum<T extends { y: number | string | bigint; path: string }>(
  datum: T,
  func: MathFunction,
): T {
  let { y } = datum;
  const numericYValue: number = Number(y);
  // Only apply the function if the Y value is a valid number.
  if (!isNaN(numericYValue)) {
    y = func(numericYValue);
  }
  return { ...datum, y, value: y, path: `${datum.path}.@${func.name}` };
}
