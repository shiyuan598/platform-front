/** @jest-environment jsdom */
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

import { mount } from "enzyme";

import { Topic } from "@foxglove/studio-base/players/types";

import { UseTreeInput } from "./types";
import useTopicTree, { generateNodeKey } from "./useTopicTree";

const TREE_CONFIG = {
  name: "root",
  children: [
    {
      name: "Group1",
      children: [{ topicName: "/foo" }],
    },
    {
      name: "Group2",
      children: [{ name: "Nested Group", children: [{ topicName: "/bar" }] }],
    },
  ],
};
const sharedProps: UseTreeInput = {
  availableNamespacesByTopic: {},
  checkedKeys: [],
  defaultTopicSettings: {},
  expandedKeys: [],
  filterText: "",
  modifiedNamespaceTopics: [],
  providerTopics: [],
  saveConfig: () => {
    // no-op
  },
  sceneErrorsByTopicKey: {},
  topicDisplayMode: "SHOW_ALL",
  settingsByKey: {},
  topicTreeConfig: TREE_CONFIG,
  uncategorizedGroupName: "(Uncategorized)",
};

function makeTopics(topicNames: string[]): Topic[] {
  return topicNames.map((name) => ({ name, datatype: "visualization_msgs/MarkerArray" }));
}

describe("useTopicTree", () => {
  // Create a helper component that exposes the results of the hook for mocking.
  function createTest() {
    function Test(props: UseTreeInput) {
      Test.result(useTopicTree(props));
      return ReactNull;
    }
    Test.result = jest.fn();
    return Test;
  }

  describe("generateNodeKey", () => {
    it("throws an error when no topicName or name are provided", () => {
      expect(() => generateNodeKey({})).toThrow();
    });

    it("prioritizes topicName over name", () => {
      expect(generateNodeKey({ topicName: "/foo", name: "Foo" })).toEqual("t:/foo");
    });

    it("creates a namespace node", () => {
      expect(generateNodeKey({ topicName: "/foo", namespace: "a" })).toEqual("ns:/foo:a");
    });

    it("creates a name node", () => {
      expect(generateNodeKey({ name: "Foo" })).toEqual("name:Foo");
    });
  });

  describe("rootTreeNode", () => {
    it("simple tree", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          topicTreeConfig={{ name: "root", children: [{ topicName: "/foo" }] }}
        />,
      );

      expect(Test.result.mock.calls[0][0].rootTreeNode).toEqual({
        available: false,
        children: [
          {
            available: false,
            key: "t:/foo",
            providerAvailable: false,
            topicName: "/foo",
            type: "topic",
          },
        ],
        key: "name:root",
        name: "root",
        providerAvailable: false,
        type: "group",
      });
    });

    it("creates Uncategorized group node and adds uncategorized topics underneath", () => {
      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          providerTopics={makeTopics(["/bar"])}
          topicTreeConfig={{ name: "root", children: [{ topicName: "/foo" }] }}
          filterText=""
          availableNamespacesByTopic={{}}
        />,
      );

      expect(Test.result.mock.calls[0][0].rootTreeNode.children).toEqual([
        {
          available: false,
          key: "t:/foo",
          providerAvailable: true,
          topicName: "/foo",
          type: "topic",
        },
        {
          available: true,
          children: [
            {
              available: true,
              datatype: "visualization_msgs/MarkerArray",
              key: "t:/bar",
              parentKey: "name:(Uncategorized)",
              providerAvailable: true,
              topicName: "/bar",
              type: "topic",
            },
          ],
          key: "name:(Uncategorized)",
          name: "(Uncategorized)",
          providerAvailable: true,
          type: "group",
        },
      ]);

      // Uncategorized node will get updated when the provider topics change.
      root.setProps({ providerTopics: makeTopics(["/bar1"]) });
      expect(Test.result.mock.calls[1][0].rootTreeNode.children).toEqual([
        {
          available: false,
          key: "t:/foo",
          providerAvailable: true,
          topicName: "/foo",
          type: "topic",
        },
        {
          available: true,
          children: [
            {
              available: true,
              datatype: "visualization_msgs/MarkerArray",
              key: "t:/bar1",
              parentKey: "name:(Uncategorized)",
              providerAvailable: true,
              topicName: "/bar1",
              type: "topic",
            },
          ],
          key: "name:(Uncategorized)",
          name: "(Uncategorized)",
          providerAvailable: true,
          type: "group",
        },
      ]);
    });
  });

  describe("visibleTopicsCount", () => {
    it("defaults to empty", () => {
      const Test = createTest();
      mount(<Test {...sharedProps} providerTopics={makeTopics(["/bar"])} />);
      expect(Test.result.mock.calls[0][0].visibleTopicsCountByKey).toEqual({});
    });

    it("calculates visibleTopicsCount", () => {
      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/bar", "t:/foo", "name:Group1", "name:Group2", "name:Nested Group"]}
          providerTopics={makeTopics(["/bar", "/foo"])}
        />,
      );
      expect(Test.result.mock.calls[0][0].visibleTopicsCountByKey).toEqual({
        "name:Group1": 1,
        "name:Group2": 1,
        "name:Nested Group": 1,
      });

      root.setProps({
        checkedKeys: ["t:/bar", "t:/bar1", "t:/foo", "name:Group1", "name:(Uncategorized)"],
        providerTopics: makeTopics(["/bar", "/foo", "/bar1"]),
      });
      expect(Test.result.mock.calls[1][0].visibleTopicsCountByKey).toEqual({
        "name:(Uncategorized)": 1,
        "name:Group1": 1,
      });
    });
  });

  describe("checked state", () => {
    it("returns selectedTopicNames based on checkedKeys", () => {
      const Test = createTest();
      const root = mount(
        <Test {...sharedProps} checkedKeys={["/foo"]} providerTopics={makeTopics(["/bar"])} />,
      );

      expect(Test.result.mock.calls[0][0].selectedTopicNames).toEqual([]);
      root.setProps({ checkedKeys: ["name:Group1", "t:/foo", "t:/bar"] });
      expect(Test.result.mock.calls[1][0].selectedTopicNames).toEqual(["/foo"]);
      root.setProps({
        checkedKeys: ["name:Group1", "t:/foo", "t:/bar"],
      });
      expect(Test.result.mock.calls[2][0].selectedTopicNames).toEqual(["/foo"]);
    });

    it("returns selectedTopicNames from the uncategorized list", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["name:(Uncategorized)", "t:/fiz"]}
          providerTopics={[]}
        />,
      );

      expect(Test.result.mock.calls[0][0].selectedTopicNames).toEqual(["/fiz"]);
    });

    it("returns selectedNamespacesByTopic based on checkedKeys", () => {
      const Test = createTest();
      const checkedKeys = ["name:Group1", "t:/foo", "t:/bar"];
      const root = mount(
        <Test {...sharedProps} checkedKeys={checkedKeys} providerTopics={makeTopics(["/bar"])} />,
      );
      expect(Test.result.mock.calls[0][0].selectedNamespacesByTopic).toEqual({});
      root.setProps({ checkedKeys: [...checkedKeys, "ns:/foo:ns1", "ns:/foo:ns2"] });
      expect(Test.result.mock.calls[1][0].selectedNamespacesByTopic).toEqual({
        "/foo": ["ns1", "ns2"],
      });
    });

    it("selects all available namespaces if topic is checked and the namespaces haven't been modified", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          availableNamespacesByTopic={{ "/foo": ["ns1", "ns2"] }}
          checkedKeys={["name:Group1", "t:/foo"]}
          providerTopics={makeTopics(["/foo"])}
        />,
      );
      expect(Test.result.mock.calls[0][0].selectedNamespacesByTopic).toEqual({
        "/foo": ["ns1", "ns2"],
      });
    });
  });

  describe("topic settings", () => {
    it("returns derivedCustomSettingsByKey with optional overrideColor field", () => {
      const Test = createTest();
      const root = mount(
        <Test {...sharedProps} settingsByKey={{}} providerTopics={makeTopics(["/bar"])} />,
      );

      expect(Test.result.mock.calls[0][0].derivedCustomSettingsByKey).toEqual({});
      root.setProps({
        settingsByKey: {
          "t:/bar": { pointSize: 1 },
          "t:/foo": { someSetting: 1 },
          "t:/bar1": { someSetting1: "some value" },
        },
      });
      expect(Test.result.mock.calls[1][0].derivedCustomSettingsByKey).toEqual({
        "t:/bar": { isDefaultSettings: false },
        "t:/bar1": { isDefaultSettings: false },
        "t:/foo": { isDefaultSettings: false },
      });

      // Convert overrideColor to rgb format if present.
      root.setProps({
        settingsByKey: {
          "t:/bar": { pointSize: 1 },
          "t:/bar1": {
            someSetting1: "some value",
            overrideColor: { r: 0.48, g: 0.48, b: 0.48, a: 1 },
          },
        },
      });
      expect(Test.result.mock.calls[2][0].derivedCustomSettingsByKey).toEqual({
        "t:/bar": { isDefaultSettings: false },
        "t:/bar1": {
          isDefaultSettings: false,
          overrideColor: { r: 0.48, g: 0.48, b: 0.48, a: 1 },
        },
      });
    });

    it("derives isDefaultSettings field from defaultTopicSettings input", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          defaultTopicSettings={{
            "/bar": { pointSize: 1 },
            "/foo1": { pointSize: 2 },
          }}
          settingsByKey={{
            "t:/bar": { pointSize: 1 },
            "t:/foo": { someSetting: 1, overrideColor: { r: 1, g: 0, b: 0, a: 0.9 } },
            "t:/foo1": { pointSize: 1 },
          }}
        />,
      );
      expect(Test.result.mock.calls[0][0].derivedCustomSettingsByKey).toEqual({
        "t:/bar": { isDefaultSettings: true },
        "t:/foo": {
          isDefaultSettings: false,
          overrideColor: { a: 0.9, b: 0, g: 0, r: 1 },
        },
        "t:/foo1": { isDefaultSettings: false },
      });
    });

    it("handles namespace settings", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          settingsByKey={{
            "t:/bar": { pointSize: 1 },
            "ns:/foo:ns1": { overrideColor: { r: 0.2, g: 0.2, b: 0.2, a: 0.2 } },
          }}
          providerTopics={makeTopics(["/foo"])}
        />,
      );
      expect(Test.result.mock.calls[0][0].derivedCustomSettingsByKey).toEqual({
        "ns:/foo:ns1": { overrideColor: { r: 0.2, g: 0.2, b: 0.2, a: 0.2 } },
        "t:/bar": {
          isDefaultSettings: false,
        },
      });
    });
  });

  describe("onNamespaceOverrideColorChange", () => {
    it("saves the new color to panelConfig", async () => {
      const Test = createTest();
      const saveConfigMock = jest.fn();
      mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          settingsByKey={{
            "t:/bar": { pointSize: 1 },
            "ns:/foo:ns1": { overrideColor: { r: 0.2, g: 0.2, b: 0.2, a: 0.2 } },
          }}
          providerTopics={makeTopics(["/foo"])}
        />,
      );
      Test.result.mock.calls[0][0].onNamespaceOverrideColorChange(
        { r: 0.1, g: 0.1, b: 0.1, a: 0.1 },
        "ns:/foo:ns1",
      );
      expect(saveConfigMock.mock.calls[0][0]).toEqual({
        settingsByKey: {
          "t:/bar": { pointSize: 1 },
          "ns:/foo:ns1": { overrideColor: { r: 0.1, g: 0.1, b: 0.1, a: 0.1 } },
        },
      });
    });

    it("deletes the current overrideColor setting when the new color is undefined", async () => {
      const Test = createTest();
      const saveConfigMock = jest.fn();
      mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          settingsByKey={{
            "t:/bar": { pointSize: 1 },
            "ns:/foo:ns1": { overrideColor: { r: 0.2, g: 0.2, b: 0.2, a: 0.2 } },
          }}
          providerTopics={makeTopics(["/foo"])}
        />,
      );
      Test.result.mock.calls[0][0].onNamespaceOverrideColorChange(undefined, "ns:/foo:ns1");
      expect(saveConfigMock.mock.calls[0][0]).toEqual({
        settingsByKey: { "t:/bar": { pointSize: 1 } },
      });
    });
  });

  describe("getIsTreeNodeVisibleInScene", () => {
    it("returns visibility for a group node", () => {
      const nameNodeKey = "name:Nested Group";
      const Test = createTest();
      const root = mount(<Test {...sharedProps} checkedKeys={[nameNodeKey]} />);

      // Not visible if children are not available.
      const result0 = Test.result.mock.calls[0][0];
      const node = result0.nodesByKey[nameNodeKey];
      expect(result0.getIsTreeNodeVisibleInScene(node, 0)).toEqual(false);

      // Visible if any child is available, the node is checked and all ancestor nodes are checked.
      root.setProps({
        checkedKeys: ["name:Group2", nameNodeKey],
        providerTopics: makeTopics(["/bar"]),
      });
      const result1 = Test.result.mock.calls[1][0];
      const node1 = result1.nodesByKey[nameNodeKey];
      expect(result1.getIsTreeNodeVisibleInScene(node1, 0)).toEqual(true);
    });

    it("returns visibility for a topic node", () => {
      const topicNodeKey = "t:/foo";
      const Test = createTest();
      const root = mount(<Test {...sharedProps} checkedKeys={[topicNodeKey]} />);

      // Not visible if topic is unavailable.
      const result0 = Test.result.mock.calls[0][0];
      const node = result0.nodesByKey[topicNodeKey];
      expect(result0.getIsTreeNodeVisibleInScene(node, 0)).toEqual(false);

      // Not visible if ancestor nodes are not all checked.
      root.setProps({ providerTopics: makeTopics(["/foo"]) });
      const result1 = Test.result.mock.calls[1][0];
      const node1 = result1.nodesByKey[topicNodeKey];
      expect(result1.getIsTreeNodeVisibleInScene(node1, 0)).toEqual(false);

      // Visible if topic is available, checked and all ancestor nodes are checked.
      root.setProps({ checkedKeys: ["name:Group1", topicNodeKey] });
      const result2 = Test.result.mock.calls[2][0];
      const node2 = result2.nodesByKey[topicNodeKey];
      expect(result2.getIsTreeNodeVisibleInScene(node2, 0)).toEqual(true);
    });

    it("returns visibility for a namespace node (topic node + namespace key)", () => {
      const topicNodeKey = "t:/foo";
      const namespaceNodeKey = "ns:/foo:ns1";

      const Test = createTest();
      const root = mount(<Test {...sharedProps} checkedKeys={[namespaceNodeKey]} />);

      // Not visible if parent topic node is not visible.
      const result0 = Test.result.mock.calls[0][0];
      const topicNode0 = result0.nodesByKey[topicNodeKey];
      expect(result0.getIsTreeNodeVisibleInScene(topicNode0, 0)).toEqual(false);
      expect(result0.getIsTreeNodeVisibleInScene(topicNode0, 0, "ns1")).toEqual(false);

      root.setProps({ providerTopics: makeTopics(["/foo"]) });
      const result1 = Test.result.mock.calls[1][0];
      const topicNode1 = result1.nodesByKey[topicNodeKey];
      expect(result1.getIsTreeNodeVisibleInScene(topicNode1, 0)).toEqual(false);
      expect(result1.getIsTreeNodeVisibleInScene(topicNode1, 0, "ns1")).toEqual(false);

      // Visible if parent topic node is visible, the node itself and all ancestor nodes are checked.
      root.setProps({ checkedKeys: ["name:Group1", "t:/foo", namespaceNodeKey] });
      const result2 = Test.result.mock.calls[2][0];
      const topicNode2 = result1.nodesByKey[topicNodeKey];
      expect(result2.getIsTreeNodeVisibleInScene(topicNode2, 0, "ns1")).toEqual(true);
    });

    it("returns namespace nodes as visible by default (when the nodes are not checked)", () => {
      const topicNodeKey = "t:/foo";
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          availableNamespacesByTopic={{ "/foo": ["ns1", "ns2"] }}
          providerTopics={makeTopics(["/foo"])}
          checkedKeys={[topicNodeKey, "name:Group1"]}
        />,
      );

      const result = Test.result.mock.calls[0][0];
      const topicNode = result.nodesByKey[topicNodeKey];
      expect(result.getIsTreeNodeVisibleInScene(topicNode, 0, "ns1")).toEqual(true);
    });

    it("does not return namespace nodes as visible by default if namespaces are modified", () => {
      const topicNodeKey = "t:/foo";
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          modifiedNamespaceTopics={["/foo"]}
          providerTopics={makeTopics(["/foo"])}
          checkedKeys={[topicNodeKey, "name:Group1"]}
        />,
      );

      const result = Test.result.mock.calls[0][0];
      const topicNode = result.nodesByKey[topicNodeKey];
      expect(result.getIsTreeNodeVisibleInScene(topicNode, "ns1")).toEqual(false);
    });

    it("returns the namespace node as not visible when topic becomes unavailable", () => {
      const topicNodeKey = "t:/foo";
      const namespaceNodeKey = "ns:/foo:ns1";

      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          providerTopics={makeTopics(["/foo"])}
          checkedKeys={["name:Group1", namespaceNodeKey, topicNodeKey]}
        />,
      );

      // Topic and namespace are both visible.
      const result0 = Test.result.mock.calls[0][0];
      const topicNode0 = result0.nodesByKey[topicNodeKey];
      expect(result0.getIsTreeNodeVisibleInScene(topicNode0)).toEqual(true);
      expect(result0.getIsTreeNodeVisibleInScene(topicNode0, "ns1")).toEqual(true);

      // When the topic becomes unavailable, both topic and namespace nodes become invisible.
      root.setProps({ providerTopics: makeTopics([]) });
      const result1 = Test.result.mock.calls[1][0];
      const topicNode1 = result1.nodesByKey[topicNodeKey];
      expect(result1.getIsTreeNodeVisibleInScene(topicNode1)).toEqual(false);
      expect(result1.getIsTreeNodeVisibleInScene(topicNode1, "ns1")).toEqual(false);
    });
  });

  describe("getIsNamespaceCheckedByDefault", () => {
    it("returns the checked state for namespace nodes by default (none of the namespace keys exist in checkedKeys)", () => {
      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          availableNamespacesByTopic={{ "/foo": ["ns1", "ns2"] }}
          providerTopics={makeTopics(["/foo"])}
          checkedKeys={["name:Group1"]}
        />,
      );
      expect(Test.result.mock.calls[0][0].getIsNamespaceCheckedByDefault("/foo")).toEqual(true);
      root.setProps({ checkedKeys: ["ns:/foo:ns3"], modifiedNamespaceTopics: ["/foo"] });
      expect(Test.result.mock.calls[1][0].getIsNamespaceCheckedByDefault("/foo")).toEqual(false);
    });
  });

  describe("toggleCheckAllDescendants", () => {
    it("toggles the group/topic node and all descendants", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          checkedKeys={["name:Nested Group", "t:/bar"]}
          saveConfig={saveConfigMock}
        />,
      );

      // Group node.
      Test.result.mock.calls[0][0].toggleCheckAllDescendants("name:Nested Group", 0);
      expect(saveConfigMock.mock.calls[0][0]).toEqual({
        checkedKeys: [],
        modifiedNamespaceTopics: [],
      });

      // Topic node with namespace children.
      root.setProps({
        checkedKeys: [],
        providerTopics: makeTopics(["/bar"]),
        availableNamespacesByTopic: { "/bar": ["ns1", "ns2"] },
      });
      Test.result.mock.calls[1][0].toggleCheckAllDescendants("t:/bar", 0);
      expect(saveConfigMock.mock.calls[1][0]).toEqual({
        checkedKeys: ["t:/bar", "ns:/bar:ns1", "ns:/bar:ns2"],
        modifiedNamespaceTopics: ["/bar"],
      });
    });
  });

  describe("toggleCheckAllAncestors", () => {
    it("toggles node and all ancestors", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();
      const root = mount(<Test {...sharedProps} saveConfig={saveConfigMock} checkedKeys={[]} />);

      // Group node.
      Test.result.mock.calls[0][0].toggleCheckAllAncestors("name:Nested Group");
      const expected = {
        checkedKeys: ["name:Nested Group", "name:Group2"],
        modifiedNamespaceTopics: [],
      };
      expect(saveConfigMock.mock.calls[0][0]).toEqual(expected);

      // Topic node.
      root.setProps(expected);
      Test.result.mock.calls[1][0].toggleCheckAllAncestors("t:/bar");
      expect(saveConfigMock.mock.calls[1][0]).toEqual({
        checkedKeys: ["name:Nested Group", "name:Group2", "t:/bar"],
        modifiedNamespaceTopics: [],
      });

      // Namespace node.
      root.setProps({
        checkedKeys: ["ns:/bar:ns2"],
        providerTopics: makeTopics(["/bar"]),
        availableNamespacesByTopic: { "/bar": ["ns1", "ns2"] },
      });
      Test.result.mock.calls[2][0].toggleCheckAllAncestors("ns:/bar:ns1", "/bar");
      expect(saveConfigMock.mock.calls[2][0]).toEqual({
        checkedKeys: ["ns:/bar:ns2", "ns:/bar:ns1", "t:/bar", "name:Nested Group", "name:Group2"],
        modifiedNamespaceTopics: ["/bar"],
      });

      // Namespace node checked by default.
      root.setProps({
        checkedKeys: ["t:/bar", "name:Nested Group", "name:Group2", "t:/foo"],
        providerTopics: makeTopics(["/bar"]),
        availableNamespacesByTopic: { "/bar": ["ns1", "ns2"] },
      });
      Test.result.mock.calls[3][0].toggleCheckAllAncestors("ns:/bar:ns1", "/bar");
      expect(saveConfigMock.mock.calls[3][0]).toEqual({
        checkedKeys: ["t:/foo", "ns:/bar:ns2"],
        modifiedNamespaceTopics: ["/bar"],
      });
    });
  });

  describe("toggleNamespaceChecked", () => {
    it("toggles checked state for namespace node and adds entry to modifiedNamespaceTopics", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      const root = mount(
        <Test
          {...sharedProps}
          modifiedNamespaceTopics={["/bar"]}
          saveConfig={saveConfigMock}
          checkedKeys={["ns:/foo:ns1"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNamespaceChecked({
        topicName: "/foo",
        namespace: "ns1",
      });
      const expected = {
        checkedKeys: [],
        modifiedNamespaceTopics: ["/bar", "/foo"],
      };
      expect(saveConfigMock.mock.calls[0][0]).toEqual(expected);

      root.setProps({
        ...expected,
        providerTopics: makeTopics(["/some_topic"]),
        availableNamespacesByTopic: { "/some_topic": ["ns1", "ns2"] },
      });
      Test.result.mock.calls[1][0].toggleNamespaceChecked({
        topicName: "/some_topic",
        namespace: "ns2",
      });
      expect(saveConfigMock.mock.calls[1][0]).toEqual({
        checkedKeys: ["ns:/some_topic:ns1"],
        modifiedNamespaceTopics: ["/bar", "/foo", "/some_topic"],
      });
    });

    it("toggles namespaces that are checked by default (no entry in checkedKeys)", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      mount(
        <Test
          {...sharedProps}
          availableNamespacesByTopic={{ "/foo": ["ns1", "ns2", "ns3"] }}
          modifiedNamespaceTopics={["/bar"]}
          saveConfig={saveConfigMock}
          checkedKeys={["name:Group1", "t:/foo"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNamespaceChecked({
        topicName: "/foo",
        namespace: "ns1",
      });
      expect(saveConfigMock.mock.calls[0][0]).toEqual({
        checkedKeys: ["name:Group1", "t:/foo", "ns:/foo:ns2", "ns:/foo:ns3"],
        modifiedNamespaceTopics: ["/bar", "/foo"],
      });
    });

    it("ensures uniqueness in checkedKeys and modifiedNamespaceTopics", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          modifiedNamespaceTopics={["/bar", "/bar", "/foo"]}
          saveConfig={saveConfigMock}
          checkedKeys={["t:/foo", "ns:/foo:ns1"]}
        />,
      );
      Test.result.mock.calls[0][0].toggleNamespaceChecked({
        topicName: "/foo",
        namespace: "ns1",
      });
      expect(saveConfigMock.mock.calls[0][0]).toEqual({
        checkedKeys: ["t:/foo"],
        modifiedNamespaceTopics: ["/bar", "/foo"],
      });
    });
  });

  describe("toggleNodeChecked", () => {
    it("toggles checked state for group nodes", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      const root = mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          checkedKeys={["name:Group1", "name:Nested Group"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNodeChecked("name:Group1");
      const expected = ["name:Nested Group"];
      expect(saveConfigMock.mock.calls[0][0]).toEqual({ checkedKeys: expected });

      root.setProps({ checkedKeys: expected });
      Test.result.mock.calls[1][0].toggleNodeChecked("name:Group2");
      expect(saveConfigMock.mock.calls[1][0]).toEqual({
        checkedKeys: [...expected, "name:Group2"],
      });
    });

    it("toggles checked state for topic nodes", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      const root = mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          checkedKeys={["t:/foo", "t:/some_topic"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNodeChecked("t:/foo");
      const expected = ["t:/some_topic"];
      expect(saveConfigMock.mock.calls[0][0]).toEqual({ checkedKeys: expected });

      root.setProps({ checkedKeys: expected });
      Test.result.mock.calls[1][0].toggleNodeChecked("t:/some_topic");
      expect(saveConfigMock.mock.calls[1][0]).toEqual({ checkedKeys: [] });
    });
  });

  describe("toggleNodeExpanded", () => {
    it("toggles expanded state for group nodes", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      const root = mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          expandedKeys={["name:Group1", "name:Nested Group"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNodeExpanded("name:Group1");
      const expected = ["name:Nested Group"];
      expect(saveConfigMock.mock.calls[0][0]).toEqual({ expandedKeys: expected });

      root.setProps({ expandedKeys: expected });
      Test.result.mock.calls[1][0].toggleNodeExpanded("name:Nested Group");
      expect(saveConfigMock.mock.calls[1][0]).toEqual({ expandedKeys: [] });
    });

    it("toggles expanded state for topic nodes", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          expandedKeys={["t:/foo", "t:/some_topic"]}
        />,
      );

      Test.result.mock.calls[0][0].toggleNodeExpanded("t:/foo");
      const expected = ["t:/some_topic"];
      expect(saveConfigMock.mock.calls[0][0]).toEqual({ expandedKeys: expected });
    });

    it("disables toggling when filtering", () => {
      const saveConfigMock = jest.fn();
      const Test = createTest();

      mount(
        <Test
          {...sharedProps}
          saveConfig={saveConfigMock}
          expandedKeys={["t:/foo", "t:/some_topic"]}
          filterText="f"
        />,
      );

      Test.result.mock.calls[0][0].toggleNodeExpanded("t:/foo");
      expect(saveConfigMock).not.toHaveBeenCalled();
    });
  });

  describe("When text filtering", () => {
    const availableNamespacesByTopic = {
      "/foo": ["ns1", "ns2"],
      "/bar": ["namespace"],
    };

    function expectVisibilityByNodeKey(
      visibiltyByNodeKey: Record<string, boolean>,
      _rootTreeNode: unknown,
      getIsTreeNodeVisibleInTree: any,
    ) {
      for (const key of Object.keys(visibiltyByNodeKey)) {
        expect(visibiltyByNodeKey[key]).toEqual(getIsTreeNodeVisibleInTree(key));
      }
    }

    it("allows searching for a namespace", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
          filterText="ns1"
        />,
      );

      const { rootTreeNode, getIsTreeNodeVisibleInTree } = Test.result.mock.calls[0][0];
      const visibiltyByNodeKey = {
        // first group
        "name:Group1": true,
        "t:/foo": true,
        "ns:/foo:ns1": true,
        "ns:/foo:ns2": false,
        // second group
        "name:Group2": false,
        "name:Nested Group": false,
        "t:/bar": false,
        "ns:/bar:namespace": false,
      };
      expectVisibilityByNodeKey(visibiltyByNodeKey, rootTreeNode, getIsTreeNodeVisibleInTree);
    });

    it("allows searching for a topic", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
          filterText="/foo"
        />,
      );

      const { rootTreeNode, getIsTreeNodeVisibleInTree } = Test.result.mock.calls[0][0];
      const visibiltyByNodeKey = {
        // first group
        "name:Group1": true,
        "t:/foo": true,
        "ns:/foo:ns1": true,
        "ns:/foo:ns2": true,
        // second group
        "name:Group2": false,
        "name:Nested Group": false,
        "t:/bar": false,
        "ns:/bar:namespace": false,
      };
      expectVisibilityByNodeKey(visibiltyByNodeKey, rootTreeNode, getIsTreeNodeVisibleInTree);
    });

    it("allows searching for a group", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
          filterText="Group1"
        />,
      );

      const { rootTreeNode, getIsTreeNodeVisibleInTree } = Test.result.mock.calls[0][0];
      const visibiltyByNodeKey = {
        // first group
        "name:Group1": true,
        "t:/foo": true,
        "ns:/foo:ns1": true,
        "ns:/foo:ns2": true,
        // second group
        "name:Group2": false,
        "name:Nested Group": false,
        "t:/bar": false,
        "ns:/bar:namespace": false,
      };
      expectVisibilityByNodeKey(visibiltyByNodeKey, rootTreeNode, getIsTreeNodeVisibleInTree);
    });

    it("does not allow searching for the root node", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
          filterText="root"
        />,
      );

      const { rootTreeNode, getIsTreeNodeVisibleInTree } = Test.result.mock.calls[0][0];
      const visibiltyByNodeKey = {
        // first group
        "name:Group1": false,
        "t:/foo": false,
        "ns:/foo:ns1": false,
        "ns:/foo:ns2": false,
        // second group
        "name:Group2": false,
        "name:Nested Group": false,
        "t:/bar": false,
        "ns:/bar:namespace": false,
      };
      expectVisibilityByNodeKey(visibiltyByNodeKey, rootTreeNode, getIsTreeNodeVisibleInTree);
    });

    it("without a search text, returns shouldExpandAllKeys=false", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
        />,
      );

      const { shouldExpandAllKeys } = Test.result.mock.calls[0][0];
      expect(shouldExpandAllKeys).toEqual(false);
    });

    it("with a search text, returns shouldExpandAllKeys=true", () => {
      const Test = createTest();
      mount(
        <Test
          {...sharedProps}
          checkedKeys={["t:/foo", "t:/some_topic"]}
          availableNamespacesByTopic={availableNamespacesByTopic}
          filterText="t"
        />,
      );

      const { allKeys, shouldExpandAllKeys } = Test.result.mock.calls[0][0];
      expect(shouldExpandAllKeys).toEqual(true);
      expect(allKeys).toEqual([
        "name:root",
        "name:Group1",
        "t:/foo",
        "name:Group2",
        "name:Nested Group",
        "t:/bar",
      ]);
    });
  });

  describe("sceneErrorsByKey", () => {
    it("aggregates errors at group level", () => {
      const Test = createTest();
      const root = mount(
        <Test
          {...sharedProps}
          providerTopics={makeTopics(["/some_topic"])}
          sceneErrorsByTopicKey={{
            "t:/bar": ["some err1"],
            "t:/some_topic": ["some err1", "some err2"],
          }}
        />,
      );

      expect(Test.result.mock.calls[0][0].sceneErrorsByKey).toEqual({
        "name:(Uncategorized)": ["/some_topic: some err1", "/some_topic: some err2"],
        "name:Group2": ["/bar: some err1"],
        "name:Nested Group": ["/bar: some err1"],
        "t:/bar": ["some err1"],
        "t:/some_topic": ["some err1", "some err2"],
      });

      root.setProps({
        sceneErrorsByTopicKey: { "t:/foo": ["some err"] },
        providerTopics: makeTopics(["t:/foo"]),
      });
      expect(Test.result.mock.calls[1][0].sceneErrorsByKey).toEqual({
        "name:Group1": ["/foo: some err"],
        "t:/foo": ["some err"],
      });
    });
  });
});
