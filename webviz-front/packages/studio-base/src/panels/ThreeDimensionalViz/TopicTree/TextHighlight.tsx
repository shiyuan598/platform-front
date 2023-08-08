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

import Highlighter from "react-highlight-words";
import styled from "styled-components";

import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";

const HIGHLIGHT_CLASSNAME = "rc-TextHighlight-highlight";
const STextHighlight = styled.span`
  .${HIGHLIGHT_CLASSNAME} {
    color: ${colors.BLUE};
    background: none;
    padding: 0;
  }
`;

type Props = {
  targetStr: string;
  searchText?: string;
};

export default function TextHighlight({ targetStr = "", searchText = "" }: Props): JSX.Element {
  if (searchText.length === 0) {
    return <>{targetStr}</>;
  }

  return (
    <STextHighlight>
      <Highlighter
        autoEscape
        highlightClassName={HIGHLIGHT_CLASSNAME}
        searchWords={[searchText]}
        textToHighlight={targetStr}
      />
    </STextHighlight>
  );
}
