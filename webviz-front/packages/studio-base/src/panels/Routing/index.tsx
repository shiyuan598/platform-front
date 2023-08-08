// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/


import Panel from "@foxglove/studio-base/components/Panel";

import RoutingPanel from "./RoutingPanel";


// RoutingPanelAdapter.panelType = "Routing";
// RoutingPanelAdapter.defaultConfig = {};
// RoutingPanelAdapter.supportsStrictMode = true;

// export default Panel(RoutingPanelAdapter);

export default Panel(
    Object.assign(React.memo(RoutingPanel), {
        displayName: "Routing",
        defaultConfig: {},
        panelType: "Routing", // The legacy RosOut name is used for backwards compatibility
    }),
);
