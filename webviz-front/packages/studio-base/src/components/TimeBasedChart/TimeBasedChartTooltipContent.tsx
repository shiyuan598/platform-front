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

import { makeStyles } from "@fluentui/react";
import { PropsWithChildren, useMemo } from "react";

import { fonts } from "@foxglove/studio-base/util/sharedStyleConstants";

import { TimeBasedChartTooltipData } from "./index";

type Props = {
  content: TimeBasedChartTooltipData[];
  // Flag indicating the containing chart has multiple datasets
  multiDataset: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: fonts.MONOSPACE,
    fontSize: 11,
    lineHeight: "1.4",
    overflowWrap: "break-word",
  },
  multiValueItem: {
    paddingBottom: theme.spacing.s2,
  },
  path: {
    whiteSpace: "nowrap",
    color: theme.palette.neutralTertiary,
  },
}));

export default function TimeBasedChartTooltipContent(
  props: PropsWithChildren<Props>,
): React.ReactElement {
  const { content, multiDataset } = props;
  const classes = useStyles();

  const itemsByPath = useMemo(() => {
    const out = new Map<string, TimeBasedChartTooltipData[]>();
    // for single dataset plots we don't care about grouping by path - there is only one path
    if (!multiDataset) {
      return out;
    }
    // group items by path
    for (const item of content) {
      const existing = out.get(item.path) ?? [];
      existing.push(item);
      out.set(item.path, existing);
    }

    return out;
  }, [content, multiDataset]);

  // If the chart contains only one dataset, we don't need to render the dataset label - saving space
  // We cannot detect this from the content since content is only what is actively hovered which may
  // not include all datasets
  if (!multiDataset) {
    return (
      <div className={classes.root} data-test="TimeBasedChartTooltipContent">
        {content.map((item, idx) => {
          const value =
            typeof item.value === "string"
              ? item.value
              : typeof item.value === "bigint"
              ? item.value.toString()
              : JSON.stringify(item.value);
          return (
            <div key={idx}>
              {value}
              {item.constantName != undefined ? ` (${item.constantName})` : ""}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes.root} data-test="TimeBasedChartTooltipContent">
      {Array.from(itemsByPath.entries(), ([path, items], idx) => {
        return (
          <div key={idx} className={classes.multiValueItem}>
            <div className={classes.path}>{path}</div>
            {items.map((item, itemIdx) => {
              const value =
                typeof item.value === "string"
                  ? item.value
                  : typeof item.value === "bigint"
                  ? item.value.toString()
                  : JSON.stringify(item.value);
              return (
                <div key={itemIdx}>
                  {value}
                  {item.constantName != undefined ? ` (${item.constantName})` : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
