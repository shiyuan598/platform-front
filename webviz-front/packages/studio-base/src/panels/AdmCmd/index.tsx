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

import Panel from "@foxglove/studio-base/components/Panel";

// import proto from "./proto.json";
// import styles from "./style.scss"
// const admRoot = protobuf.Root.fromJSON(proto);
// const AdmMessage = admRoot.lookupType("zhito.adm.Mcu2Soc");
// adm



type Config = {
    topicToRender?: string;
};



const AdmCmd = React.memo(() => {
    return <></>
});

AdmCmd.displayName = "AdmCmd";

export default Panel(
    Object.assign(AdmCmd, {
        defaultConfig: {} as Config,
        panelType: "AdmCmd", // The legacy RosOut name is used for backwards compatibility
    }),
);
