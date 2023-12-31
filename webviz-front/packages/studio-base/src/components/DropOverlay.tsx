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

import styled from "styled-components";

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.palette.blackTranslucent40};
  z-index: 100000;
  pointer-events: none;
`;

const Inner = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  border-radius: 28px;
  border: 2px dashed ${({ theme }) => theme.palette.black};
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
  line-height: normal;
`;

function DropOverlay({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Outer>
      <Inner>{children}</Inner>
    </Outer>
  );
}

export default DropOverlay;
