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

import { mergeStyleSets } from "@fluentui/react";
import ChevronDownIcon from "@mdi/svg/svg/chevron-down.svg";
import cx from "classnames";
import { ReactNode, CSSProperties, ReactElement, useState } from "react";

import { LegacyButton } from "@foxglove/studio-base/components/LegacyStyledComponents";
import Tooltip from "@foxglove/studio-base/components/Tooltip";
import { colors } from "@foxglove/studio-base/util/sharedStyleConstants";

import ChildToggle from "../ChildToggle";
import Icon from "../Icon";
import Menu, { Item } from "../Menu";

type Props<T> = {
  btnClassname?: string;
  btnStyle?: CSSProperties;
  children?: ReactNode;
  closeOnChange?: boolean;
  dataTest?: string;
  disabled?: boolean;
  flatEdges?: boolean;
  menuStyle?: CSSProperties;
  noPortal?: boolean;
  onChange?: (value: T) => void;
  position?: "above" | "below" | "left" | "right";
  text?: ReactNode;
  toggleComponent?: ReactNode;
  tooltip?: string;
  value?: T | T[];
};

const classes = mergeStyleSets({
  button: {
    display: "flex",
    maxWidth: "100%",
    padding: "4px 10px",
    alignItems: "center",
  },
  title: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    flexShrink: 1,
    display: "flex",
    alignItems: "center",
  },
  option: {
    ":disabled": {
      color: colors.DISABLED,
      cursor: "not-allowed",
    },
  },
});

export default function Dropdown<T>({
  btnClassname,
  btnStyle,
  children,
  closeOnChange = true,
  dataTest,
  disabled = false,
  flatEdges = true,
  onChange,
  menuStyle,
  noPortal,
  position = "below",
  text,
  toggleComponent,
  tooltip,
  value,
}: Props<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }

  function handleOnClick(clickedValue: T) {
    if (onChange) {
      if (closeOnChange) {
        setIsOpen(false);
      }
      onChange(clickedValue);
    }
  }

  function renderItem(child: ReactElement) {
    const checked = Array.isArray(value)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        value.includes(child.props.value)
      : child.props.value === value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const onClick = () => handleOnClick(child.props.value);
    if ((child.type as { isMenuItem?: boolean }).isMenuItem === true) {
      return React.cloneElement(child, { checked, onClick });
    }
    return (
      <Item iconSize="xxsmall" checked={checked} onClick={onClick} isDropdown>
        {child}
      </Item>
    );
  }

  function renderChildren(): ReactNode {
    return React.Children.map(children, (child, i) => {
      if (child == undefined) {
        return ReactNull;
      }
      const childEl = child as ReactElement;
      const inner = childEl.props.value != undefined ? renderItem(childEl) : child;
      return <span key={i}>{inner}</span>;
    });
  }

  function renderButton() {
    if (toggleComponent != undefined) {
      return toggleComponent;
    }
    const button = (
      <LegacyButton
        className={cx(classes.button, btnClassname, { disabled })}
        style={{ opacity: isOpen ? 1 : undefined, ...btnStyle }}
        data-test={dataTest}
      >
        <span className={classes.title}>{text ?? value}</span>
        <Icon style={{ marginLeft: 4 }}>
          <ChevronDownIcon style={{ width: 14, height: 14, opacity: 0.5 }} />
        </Icon>
      </LegacyButton>
    );
    if (tooltip != undefined && tooltip.length > 0 && !isOpen) {
      // The tooltip often occludes the first item of the open menu.
      return <Tooltip contents={tooltip}>{button}</Tooltip>;
    }
    return button;
  }

  const style = {
    borderTopLeftRadius: flatEdges && position !== "above" ? "0" : undefined,
    borderTopRightRadius: flatEdges && position !== "above" ? "0" : undefined,
    borderBottomLeftRadius: flatEdges && position === "above" ? "0" : undefined,
    borderBottomRightRadius: flatEdges && position === "above" ? "0" : undefined,
    ...(position === "above" ? { marginBottom: 4, borderRadius: 4 } : {}),
    ...menuStyle,
  };

  return (
    <ChildToggle
      style={{ maxWidth: "100%", zIndex: 0 }}
      position={position}
      isOpen={isOpen}
      onToggle={toggle}
      dataTest={dataTest}
      noPortal={noPortal}
    >
      {renderButton()}
      <Menu style={style}>{renderChildren()}</Menu>
    </ChildToggle>
  );
}
