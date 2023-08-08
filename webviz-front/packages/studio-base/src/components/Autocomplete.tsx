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

import { Layer, makeStyles } from "@fluentui/react";
import cx from "classnames";
import { Fzf, FzfResultItem } from "fzf";
import { maxBy } from "lodash";
import React, {
  CSSProperties,
  useRef,
  useState,
  useCallback,
  useMemo,
  useImperativeHandle,
} from "react";
import ReactAutocomplete from "react-autocomplete";
import textMetrics from "text-metrics";

import { colors, fonts } from "@foxglove/studio-base/util/sharedStyleConstants";

// react-autocomplete tries to auto-scroll as soon as the menu is rendered, which is not compatible
// with fluentui's Layer because the Layer takes a couple of react render cycles before elements are
// actually mounted.
Object.assign(ReactAutocomplete.prototype, { maybeScrollItemIntoView: () => {} });

const fontFamily = fonts.SANS_SERIF;
const fontSize = "12px";
let textMeasure: textMetrics.TextMeasure;
function measureText(text: string): number {
  if (textMeasure == undefined) {
    textMeasure = textMetrics.init({ fontFamily, fontSize });
  }
  return textMeasure.width(text) + 3;
}

const ROW_HEIGHT = 24;
const MAX_ITEMS = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    borderTopLeftRadius: 0,
    boxShadow: theme.effects.elevation16,
    position: "fixed",
    overflow: "auto",
    background: theme.semanticColors.menuBackground,
    zIndex: 1,
    marginLeft: -6,
  },
  input: {
    background: "transparent !important",
    borderRadius: 0,
    border: "none",
    color: theme.semanticColors.inputText,
    flexGrow: 1,
    fontSize: "1rem",
    margin: 0,
    padding: 0,
    textAlign: "left",
    fontFamily: fonts.SANS_SERIF,

    "&.disabled, &[disabled]": {
      color: theme.semanticColors.disabledText,
      backgroundColor: theme.semanticColors.disabledBackground,
    },
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.semanticColors.inputPlaceholderText,
    },
  },
  inputError: {
    color: `${theme.semanticColors.errorIcon} !important`,
  },
  inputPlaceholder: {
    color: theme.semanticColors.inputPlaceholderText,
  },
  item: {
    padding: 6,
    cursor: "pointer",
    minHeight: ROW_HEIGHT,
    lineHeight: ROW_HEIGHT - 10,
    overflowWrap: "break-word",
    color: theme.semanticColors.menuItemText,
    whiteSpace: "pre",
  },
  itemSelected: {
    backgroundColor: theme.semanticColors.menuItemBackgroundHovered,
  },
  itemHighlighted: {
    backgroundColor: theme.semanticColors.menuItemBackgroundHovered,
  },
}));

// <Autocomplete> is a Studio-specific autocomplete with support for things like multiple
// autocompletes that seamlessly transition into each other, e.g. when building more complex
// strings like in the Plot panel.
//
// The multiple autocompletes doesn't work super well with react-autocomplete, so we have to
// reimplement some of its behaviour to make things work properly, such as the `ignoreBlur`
// stuff. Mostly, though, we can lean on react-autocomplete to do the heavy lifting.
//
// For future reference, the reason `<ReactAutocomplete>` (and we) has to do `ignoreBlur`, is that
// when you select an item from the autocomplete menu by clicking, it first triggers a `blur` event
// on the `<input>`, before triggering a `click` event. If we wouldn't ignore that `blur` event,
// we'd hide the menu before the `click` event even has a chance of getting fired. So the `blur`
// event has to be ignored, and the subsequent `focus` event also has to be ignored since it's kind
// of a "false" focus event. (In our case we just don't bother with ignoring the `focus` event since
// it doesn't cause any problems.)
type AutocompleteProps<T = unknown> = {
  items: T[];
  getItemValue?: (arg0: T) => string;
  getItemText?: (arg0: T) => string;
  filterText?: string;
  value?: string;
  selectedItem?: T;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>, text: string) => void;
  onSelect: (text: string, item: T, autocomplete: IAutocomplete) => void;
  onBlur?: () => void;
  hasError?: boolean;
  autocompleteKey?: string;
  placeholder?: string;
  autoSize?: boolean;
  sortWhenFiltering?: boolean;
  clearOnFocus?: boolean; // only for uncontrolled use (when onChange is not set)
  minWidth?: number;
  menuStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  disableAutoSelect?: boolean;
};

export interface IAutocomplete {
  setSelectionRange(selectionStart: number, selectionEnd: number): void;
  focus(): void;
  blur(): void;
}

function defaultGetText(name: string): (item: unknown) => string {
  return function (item: unknown) {
    if (typeof item === "string") {
      return item;
    } else if (
      item != undefined &&
      typeof item === "object" &&
      typeof (item as { value?: string }).value === "string"
    ) {
      return (item as { value: string }).value;
    }
    throw new Error(`you need to provide an implementation of ${name}`);
  };
}

const EMPTY_SET = new Set<number>();

function itemToFzfResult<T>(item: T): FzfResultItem<T> {
  return {
    item,
    score: 0,
    positions: EMPTY_SET,
    start: 0,
    end: 0,
  };
}

const HighlightChars = (props: { str: string; indices: Set<number> }) => {
  const chars = props.str.split("");

  const nodes = chars.map((char, i) => {
    if (props.indices.has(i)) {
      return (
        <b key={i} style={{ color: colors.HIGHLIGHT }}>
          {char}
        </b>
      );
    } else {
      return char;
    }
  });

  return <>{nodes}</>;
};

export default React.forwardRef(function Autocomplete<T = unknown>(
  props: AutocompleteProps<T>,
  ref: React.ForwardedRef<IAutocomplete>,
): JSX.Element {
  // References
  const autocomplete = useRef<ReactAutocomplete>(ReactNull);
  const ignoreBlur = useRef<boolean>(false);

  // Context
  const classes = useStyles();

  // State
  const [showAllItems, setShowAllItems] = useState<boolean>(false);
  const [stateValue, setValue] = useState<string | undefined>(undefined);
  const [focused, setFocused] = useState<boolean>(false);

  const getItemText = useMemo(
    () => props.getItemText ?? defaultGetText("getItemText"),
    [props.getItemText],
  );

  const getItemValue = useMemo(
    () => props.getItemValue ?? defaultGetText("getItemValue"),
    [props.getItemValue],
  );

  // Props
  const {
    autocompleteKey,
    autoSize = false,
    items,
    placeholder,
    selectedItem,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    value = stateValue ?? (selectedItem ? getItemText(selectedItem) : undefined),
    filterText = value,
    sortWhenFiltering = true,
    clearOnFocus = false,
    minWidth = 100,
    menuStyle = {},
    inputStyle = {},
    onChange: onChangeCallback,
    onSelect: onSelectCallback,
    onBlur: onBlurCallback,
    disableAutoSelect,
  }: AutocompleteProps<T> = props;

  const autocompleteItems: FzfResultItem<T>[] = useMemo(
    () =>
      filterText
        ? // @ts-expect-error Fzf selector TS type seems to be wrong?
          new Fzf(items, {
            fuzzy: filterText.length > 2 ? "v2" : false,
            sort: sortWhenFiltering,
            limit: MAX_ITEMS,
            selector: getItemText,
          }).find(filterText)
        : items.map((item) => itemToFzfResult(item)),
    [filterText, getItemText, items, sortWhenFiltering],
  );

  const hasError = props.hasError ?? (autocompleteItems.length === 0 && value?.length);

  const open = focused && autocompleteItems.length > 0;
  if (!open) {
    ignoreBlur.current = false;
  }

  const selectedItemValue = selectedItem != undefined ? getItemValue(selectedItem) : undefined;
  const setSelectionRange = useCallback((selectionStart: number, selectionEnd: number): void => {
    if (autocomplete.current?.refs.input) {
      (autocomplete.current.refs.input as HTMLInputElement).setSelectionRange(
        selectionStart,
        selectionEnd,
      );
    }
    setFocused(true);
  }, []);

  const focus = useCallback((): void => {
    if (autocomplete.current?.refs.input) {
      (autocomplete.current.refs.input as HTMLInputElement).focus();
    }
  }, []);

  const blur = useCallback((): void => {
    if (autocomplete.current?.refs.input) {
      (autocomplete.current.refs.input as HTMLInputElement).blur();
    }
    ignoreBlur.current = false;
    setFocused(false);
    if (onBlurCallback) {
      onBlurCallback();
    }
  }, [onBlurCallback]);

  // Give callers an opportunity to control autocomplete
  useImperativeHandle(ref, () => ({ setSelectionRange, focus, blur }), [
    setSelectionRange,
    focus,
    blur,
  ]);

  const onChange = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>): void => {
      if (onChangeCallback) {
        onChangeCallback(event, (event.target as HTMLInputElement).value);
      } else {
        setValue((event.target as HTMLInputElement).value);
      }
    },
    [onChangeCallback],
  );

  // Make sure the input field gets focused again after selecting, in case we're doing multiple
  // autocompletes. We pass an instance of an `IAutocomplete` to `onSelect` in case
  // the user of this component wants to call `blur()`.
  const onSelect = useCallback(
    (textValue: string, { item }: FzfResultItem<T>): void => {
      if (autocomplete.current?.refs.input) {
        (autocomplete.current.refs.input as HTMLInputElement).focus();
        setFocused(true);
        setValue(undefined);
        onSelectCallback(textValue, item, { setSelectionRange, focus, blur });
      }
    },
    [onSelectCallback, blur, focus, setSelectionRange],
  );

  const onFocus = useCallback((): void => {
    if (
      autocomplete.current?.refs.input &&
      document.activeElement === autocomplete.current.refs.input
    ) {
      setFocused(true);
      if (clearOnFocus) {
        setValue("");
      }
    }
  }, [clearOnFocus]);

  const onBlur = useCallback((): void => {
    if (ignoreBlur.current) {
      return;
    }
    if (
      autocomplete.current?.refs.input &&
      document.activeElement === autocomplete.current.refs.input
    ) {
      // Bail if we actually still are focused.
      return;
    }
    setFocused(false);
    setValue(undefined);
    if (onBlurCallback) {
      onBlurCallback();
    }
  }, [onBlurCallback, ignoreBlur]);

  // Wait for a mouseup event, and check in the mouseup event if anything was actually selected, or
  // if it just was a click without a drag. In the latter case, select everything. This is very
  // similar to how, say, the browser bar in Chrome behaves.
  const onMouseDown = useCallback(
    (_event: React.MouseEvent<HTMLInputElement>): void => {
      if (disableAutoSelect ?? false) {
        return;
      }
      if (focused) {
        return;
      }
      const onMouseUp = (e: MouseEvent) => {
        document.removeEventListener("mouseup", onMouseUp, true);

        if (
          autocomplete.current?.refs.input && // Make sure that the element is actually still focused.
          document.activeElement === autocomplete.current.refs.input
        ) {
          if (
            (autocomplete.current.refs.input as HTMLInputElement).selectionStart ===
            (autocomplete.current.refs.input as HTMLInputElement).selectionEnd
          ) {
            (autocomplete.current.refs.input as HTMLInputElement).select();
            e.stopPropagation();
            e.preventDefault();
          }
          // Also set `state.focused` for good measure, since we know here that we're focused.
          setFocused(true);
        }
      };
      document.addEventListener("mouseup", onMouseUp, true);
    },
    [focused, disableAutoSelect],
  );

  // When scrolling down by even a little bit, just show all items. In most cases people won't
  // do this and instead will type more text to narrow down their autocomplete.
  const onScroll = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.currentTarget.scrollTop > 0) {
      // Never set `showAllItems` to false here, as `<ReactAutocomplete>` may have a reference to
      // the highlighted element. We only set it back to false in `componentDidUpdate`.
      setShowAllItems(true);
    }
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === "Escape" || (event.key === "Enter" && items.length === 0)) {
        blur();
      }
    },
    [blur, items],
  );

  return (
    <ReactAutocomplete
      open={open}
      items={autocompleteItems}
      getItemValue={(item: FzfResultItem<T>) => getItemValue(item.item)}
      renderItem={(item: FzfResultItem<T>, isHighlighted) => {
        const itemValue = getItemValue(item.item);
        return (
          <div
            key={itemValue}
            data-highlighted={isHighlighted}
            data-test-auto-item
            className={cx(classes.item, {
              [classes.itemHighlighted]: isHighlighted,
              [classes.itemSelected]:
                selectedItemValue != undefined && itemValue === selectedItemValue,
            })}
          >
            <HighlightChars str={getItemText(item.item)} indices={item.positions} />
          </div>
        );
      }}
      onChange={onChange}
      onSelect={onSelect}
      value={value ?? ""}
      inputProps={{
        className: cx(classes.input, {
          [classes.inputError]: hasError,
          [classes.inputPlaceholder]: value == undefined || value.length === 0,
        }),
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        placeholder,
        style: {
          ...inputStyle,
          fontFamily,
          fontSize,
          width: autoSize
            ? Math.max(
                measureText(value != undefined && value.length > 0 ? value : placeholder ?? ""),
                minWidth,
              )
            : "100%",
        },
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown,
      }}
      renderMenu={(menuItems, _val, style) => {
        // Hacky virtualization. Either don't show all menuItems (typical when the user is still
        // typing in the autcomplete), or do show them all (once the user scrolls). Not the most
        // sophisticated, but good enough!
        const maxNumberOfItems = Math.ceil(window.innerHeight / ROW_HEIGHT + 10);
        const menuItemsToShow =
          showAllItems || menuItems.length <= maxNumberOfItems * 2
            ? menuItems
            : menuItems.slice(0, maxNumberOfItems).concat(menuItems.slice(-maxNumberOfItems));

        // The longest string might not be the widest (e.g. "|||" vs "www"), but this is
        // quite a bit faster, so we throw in a nice padding and call it good enough! :-)
        const longestItem = maxBy(autocompleteItems, (item) => getItemText(item.item).length);
        const width =
          50 + (longestItem != undefined ? measureText(getItemText(longestItem.item)) : 0);
        const maxHeight = `calc(100vh - 10px - ${style.top}px)`;

        return (
          <div
            className={classes.root}
            key={
              autocompleteKey
              /* So we scroll to the top when selecting */
            }
            style={
              // If the autocomplete would fall off the screen, pin it to the right.
              (style.left as number) + width <= window.innerWidth
                ? { ...menuStyle, ...style, width, maxWidth: "100%", maxHeight }
                : {
                    ...menuStyle,
                    ...style,
                    width,
                    maxWidth: "100%",
                    maxHeight,
                    left: "auto",
                    right: 0,
                  }
            }
            onScroll={onScroll}
          >
            {/* Have to wrap onMouseEnter and onMouseLeave in a separate <div>, as react-autocomplete
             * would override them on the root <div>. */}
            <div
              onMouseEnter={() => (ignoreBlur.current = true)}
              onMouseLeave={() => (ignoreBlur.current = false)}
            >
              {menuItemsToShow}
            </div>
          </div>
        );
      }}
      // @ts-expect-error renderMenuWrapper added in the fork but we don't have typings for it
      renderMenuWrapper={(menu: React.ReactNode) => <Layer>{menu}</Layer>}
      ref={autocomplete}
      wrapperStyle={{ flex: "1 1 auto", overflow: "hidden", marginLeft: 6 }}
    />
  );
}) as <T>(props: AutocompleteProps<T> & React.RefAttributes<IAutocomplete>) => JSX.Element; // https://stackoverflow.com/a/58473012/23649
