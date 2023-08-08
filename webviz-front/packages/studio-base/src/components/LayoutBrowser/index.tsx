// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
import { DefaultButton, IconButton, Spinner, Stack, Toggle, useTheme } from "@fluentui/react";
import { partition } from "lodash";
import moment from "moment";
import path from "path";
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useMountedState } from "react-use";
import useAsyncFn from "react-use/lib/useAsyncFn";

// import { AppSetting } from "@foxglove/studio-base/AppSetting";
// import SignInPrompt from "@foxglove/studio-base/components/LayoutBrowser/SignInPrompt";
import { useUnsavedChangesPrompt } from "@foxglove/studio-base/components/LayoutBrowser/UnsavedChangesPrompt";
import { SidebarContent } from "@foxglove/studio-base/components/SidebarContent";
import { useTooltip } from "@foxglove/studio-base/components/Tooltip";
import { useAnalytics } from "@foxglove/studio-base/context/AnalyticsContext";
// import ConsoleApiContext from "@foxglove/studio-base/context/ConsoleApiContext";
import {
  useCurrentLayoutActions,
  useCurrentLayoutSelector,
} from "@foxglove/studio-base/context/CurrentLayoutContext";
import { PanelsState } from "@foxglove/studio-base/context/CurrentLayoutContext/actions";
import { useLayoutManager } from "@foxglove/studio-base/context/LayoutManagerContext";
import LayoutStorageDebuggingContext from "@foxglove/studio-base/context/LayoutStorageDebuggingContext";
// import { useAppConfigurationValue } from "@foxglove/studio-base/hooks/useAppConfigurationValue";
import useCallbackWithToast from "@foxglove/studio-base/hooks/useCallbackWithToast";
import { useConfirm } from "@foxglove/studio-base/hooks/useConfirm";
import { usePrompt } from "@foxglove/studio-base/hooks/usePrompt";
// import { defaultPlaybackConfig } from "@foxglove/studio-base/providers/CurrentLayoutProvider/reducers";
import { AppEvent } from "@foxglove/studio-base/services/IAnalytics";
import { Layout, layoutIsShared } from "@foxglove/studio-base/services/ILayoutStorage";
import { downloadTextFile } from "@foxglove/studio-base/util/download";
import showOpenFilePicker from "@foxglove/studio-base/util/showOpenFilePicker";

import LayoutSection from "./LayoutSection";
import helpContent from "./index.help.md";
import { debugBorder } from "./styles";

// moment.locale('zh-cn', {
//   months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
//   monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
//   weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
//   weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
//   weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
//   longDateFormat: {
//     LT: 'HH:mm',
//     LTS: 'HH:mm:ss',
//     L: 'YYYY-MM-DD',
//     LL: 'YYYY年MM月DD日',
//     LLL: 'YYYY年MM月DD日Ah点mm分',
//     LLLL: 'YYYY年MM月DD日ddddAh点mm分',
//     l: 'YYYY-M-D',
//     ll: 'YYYY年M月D日',
//     lll: 'YYYY年M月D日 HH:mm',
//     llll: 'YYYY年M月D日dddd HH:mm'
//   },
//   meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
//   //@ts-ignore
//   meridiemHour: function (hour, meridiem) {
//     if (hour === 12) {
//       hour = 0;
//     }
//     if (meridiem === '凌晨' || meridiem === '早上' ||
//       meridiem === '上午') {
//       return hour;
//     } else if (meridiem === '下午' || meridiem === '晚上') {
//       return hour + 12;
//     } else {
//       // '中午'
//       return hour >= 11 ? hour : hour + 12;
//     }
//   },
//   meridiem: function (hour, minute, isLower) {
//     const hm = hour * 100 + minute;
//     if (hm < 600) {
//       return '凌晨';
//     } else if (hm < 900) {
//       return '早上';
//     } else if (hm < 1130) {
//       return '上午';
//     } else if (hm < 1230) {
//       return '中午';
//     } else if (hm < 1800) {
//       return '下午';
//     } else {
//       return '晚上';
//     }
//   },
//   calendar: {
//     sameDay: '[今天]LT',
//     nextDay: '[明天]LT',
//     nextWeek: '[下]ddddLT',
//     lastDay: '[昨天]LT',
//     lastWeek: '[上]ddddLT',
//     sameElse: 'L'
//   },
//   dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
//   //@ts-ignore
//   ordinal: function (number, period) {
//     switch (period) {
//       case 'd':
//       case 'D':
//       case 'DDD':
//         return number + '日';
//       case 'M':
//         return number + '月';
//       case 'w':
//       case 'W':
//         return number + '周';
//       default:
//         return number;
//     }
//   },
//   relativeTime: {
//     future: '%s内',
//     past: '%s前',
//     s: '几秒',
//     ss: '%d秒',
//     m: '1分钟',
//     mm: '%d分钟',
//     h: '1小时',
//     hh: '%d小时',
//     d: '1天',
//     dd: '%d天',
//     M: '1个月',
//     MM: '%d个月',
//     y: '1年',
//     yy: '%d年'
//   },
//   week: {
//     // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
//     dow: 1, // Monday is the first day of the week.
//     doy: 4  // The week that contains Jan 4th is the first week of the year.
//   }
// })
// moment.locale("zh-cn")
export default function LayoutBrowser({
  currentDateForStorybook,
}: React.PropsWithChildren<{
  currentDateForStorybook?: Date;
}>): JSX.Element {
  const theme = useTheme();
  const isMounted = useMountedState();
  const { addToast } = useToasts();
  const layoutManager = useLayoutManager();
  const prompt = usePrompt();
  const analytics = useAnalytics();
  const confirm = useConfirm();
  const { unsavedChangesPrompt, openUnsavedChangesPrompt } = useUnsavedChangesPrompt();

  const currentLayoutId = useCurrentLayoutSelector((state) => state.selectedLayout?.id);
  const { setSelectedLayoutId } = useCurrentLayoutActions();

  const [isBusy, setIsBusy] = useState(layoutManager.isBusy);
  const [isOnline, setIsOnline] = useState(layoutManager.isOnline);
  useLayoutEffect(() => {
    const busyListener = () => setIsBusy(layoutManager.isBusy);
    const onlineListener = () => setIsOnline(layoutManager.isOnline);
    busyListener();
    onlineListener();
    layoutManager.on("busychange", busyListener);
    layoutManager.on("onlinechange", onlineListener);
    return () => {
      layoutManager.off("busychange", busyListener);
      layoutManager.off("onlinechange", onlineListener);
    };
  }, [layoutManager]);

  const [layouts, reloadLayouts] = useAsyncFn(
    async () => {
      const [shared, personal] = partition(
        await layoutManager.getLayouts(),
        layoutManager.supportsSharing ? layoutIsShared : () => false,
      );
      return {
        personal: personal.sort((a, b) => a.name.localeCompare(b.name)),
        shared: shared.sort((a, b) => a.name.localeCompare(b.name)),
      };
    },
    [layoutManager],
    { loading: true },
  );

  useEffect(() => {
    const listener = () => void reloadLayouts();
    layoutManager.on("change", listener);
    return () => layoutManager.off("change", listener);
  }, [layoutManager, reloadLayouts]);

  // Start loading on first mount
  useEffect(() => {
    void reloadLayouts();
  }, [reloadLayouts]);

  /**
   * Don't allow the user to switch away from a personal layout if they have unsaved changes. This
   * currently has a race condition because of the throttled save in CurrentLayoutProvider -- it's
   * possible to make changes and switch layouts before they're sent to the layout manager.
   * @returns true if the original action should continue, false otherwise
   */
  const promptForUnsavedChanges = useCallback(async () => {
    const currentLayout =
      currentLayoutId != undefined ? await layoutManager.getLayout(currentLayoutId) : undefined;
    if (
      currentLayout != undefined &&
      layoutIsShared(currentLayout) &&
      currentLayout.working != undefined
    ) {
      const result = await openUnsavedChangesPrompt(currentLayout);
      switch (result.type) {
        case "cancel":
          return false;
        case "discard":
          await layoutManager.revertLayout({ id: currentLayout.id });
          void analytics.logEvent(AppEvent.LAYOUT_REVERT, {
            permission: currentLayout.permission,
            context: "UnsavedChangesPrompt",
          });
          return true;
        case "overwrite":
          await layoutManager.overwriteLayout({ id: currentLayout.id });
          void analytics.logEvent(AppEvent.LAYOUT_OVERWRITE, {
            permission: currentLayout.permission,
            context: "UnsavedChangesPrompt",
          });
          return true;
        case "makePersonal":
          // We don't use onMakePersonalCopy() here because it might need to prompt for unsaved changes, and we don't want to select the newly created layout
          await layoutManager.makePersonalCopy({
            id: currentLayout.id,
            name: result.name,
          });
          void analytics.logEvent(AppEvent.LAYOUT_MAKE_PERSONAL_COPY, {
            permission: currentLayout.permission,
            syncStatus: currentLayout.syncInfo?.status,
            context: "UnsavedChangesPrompt",
          });
          return true;
      }
      return false;
    }
    return true;
  }, [analytics, currentLayoutId, layoutManager, openUnsavedChangesPrompt]);

  const onSelectLayout = useCallbackWithToast(
    async (item: Layout, { selectedViaClick = false }: { selectedViaClick?: boolean } = {}) => {
      if (selectedViaClick) {
        if (!(await promptForUnsavedChanges())) {
          return;
        }
        void analytics.logEvent(AppEvent.LAYOUT_SELECT, { permission: item.permission });
      }
      setSelectedLayoutId(item.id);
    },
    [analytics, promptForUnsavedChanges, setSelectedLayoutId],
  );

  const onRenameLayout = useCallbackWithToast(
    async (item: Layout, newName: string) => {
      await layoutManager.updateLayout({ id: item.id, name: newName });
      void analytics.logEvent(AppEvent.LAYOUT_RENAME, { permission: item.permission });
    },
    [analytics, layoutManager],
  );

  const onDuplicateLayout = useCallbackWithToast(
    async (item: Layout) => {
      if (!(await promptForUnsavedChanges())) {
        return;
      }
      const newLayout = await layoutManager.saveNewLayout({
        name: `${item.name} copy`,
        data: item.working?.data ?? item.baseline.data,
        permission: "CREATOR_WRITE",
      });
      await onSelectLayout(newLayout);
      void analytics.logEvent(AppEvent.LAYOUT_DUPLICATE, { permission: item.permission });
    },
    [analytics, layoutManager, onSelectLayout, promptForUnsavedChanges],
  );

  const onDeleteLayout = useCallbackWithToast(
    async (item: Layout) => {
      void analytics.logEvent(AppEvent.LAYOUT_DELETE, { permission: item.permission });

      // If the layout was selected, select a different available layout.
      //
      // When a users current layout is deleted, we display a notice. By selecting a new layout
      // before deleting their current layout we avoid the weirdness of displaying a notice that the
      // user just deleted their current layout which is somewhat obvious to the user.
      if (currentLayoutId === item.id) {
        const storedLayouts = await layoutManager.getLayouts();
        const targetLayout = storedLayouts.find((layout) => layout.id !== currentLayoutId);
        setSelectedLayoutId(targetLayout?.id);
      }
      await layoutManager.deleteLayout({ id: item.id });
    },
    [analytics, currentLayoutId, layoutManager, setSelectedLayoutId],
  );

  const createNewLayout = useCallbackWithToast(async () => {
    if (!(await promptForUnsavedChanges())) {
      return;
    }
    const name = `未命名布局 ${moment(currentDateForStorybook).format("l")}  ${moment(
      currentDateForStorybook,
    ).format("LT")}`;
    //@ts-ignore
    const state = await fetch("./layouts/main-view.json").then(async res => await res.json());
    // const state: Omit<PanelsState, "name" | "id"> = defaultLayout;
    const newLayout = await layoutManager.saveNewLayout({
      name,
      data: state as PanelsState,
      permission: "CREATOR_WRITE",
    });
    void onSelectLayout(newLayout);

    void analytics.logEvent(AppEvent.LAYOUT_CREATE);
  }, [promptForUnsavedChanges, currentDateForStorybook, layoutManager, onSelectLayout, analytics]);

  const onExportLayout = useCallbackWithToast(
    async (item: Layout) => {
      const content = JSON.stringify(item.working?.data ?? item.baseline.data, undefined, 2);
      downloadTextFile(content, `${item.name}.json`);
      void analytics.logEvent(AppEvent.LAYOUT_EXPORT, { permission: item.permission });
    },
    [analytics],
  );

  const onShareLayout = useCallbackWithToast(
    async (item: Layout) => {
      const name = await prompt({
        title: "Share a copy with your team",
        subText: "Team layouts can be used and changed by other members of your team.",
        initialValue: item.name,
        label: "Layout name",
      });
      if (name != undefined) {
        const newLayout = await layoutManager.saveNewLayout({
          name,
          data: item.working?.data ?? item.baseline.data,
          permission: "ORG_WRITE",
        });
        void analytics.logEvent(AppEvent.LAYOUT_SHARE, { permission: item.permission });
        await onSelectLayout(newLayout);
      }
    },
    [analytics, layoutManager, onSelectLayout, prompt],
  );

  const onOverwriteLayout = useCallbackWithToast(
    async (item: Layout) => {
      if (layoutIsShared(item)) {
        const response = await confirm({
          title: `Update “${item.name}”?`,
          prompt:
            "Your changes will overwrite this layout for all team members. This cannot be undone.",
          ok: "Save",
        });
        if (response !== "ok") {
          return;
        }
      }
      await layoutManager.overwriteLayout({ id: item.id });
      void analytics.logEvent(AppEvent.LAYOUT_OVERWRITE, { permission: item.permission });
    },
    [analytics, confirm, layoutManager],
  );

  const onRevertLayout = useCallbackWithToast(
    async (item: Layout) => {
      const response = await confirm({
        title: `Revert “${item.name}”?`,
        prompt: "Your changes will be permantly deleted. This cannot be undone.",
        ok: "Discard changes",
        variant: "danger",
      });
      if (response !== "ok") {
        return;
      }
      await layoutManager.revertLayout({ id: item.id });
      void analytics.logEvent(AppEvent.LAYOUT_REVERT, { permission: item.permission });
    },
    [analytics, confirm, layoutManager],
  );

  const onMakePersonalCopy = useCallbackWithToast(
    async (item: Layout) => {
      const newLayout = await layoutManager.makePersonalCopy({
        id: item.id,
        name: `${item.name} copy`,
      });
      await onSelectLayout(newLayout);
      void analytics.logEvent(AppEvent.LAYOUT_MAKE_PERSONAL_COPY, {
        permission: item.permission,
        syncStatus: item.syncInfo?.status,
      });
    },
    [analytics, layoutManager, onSelectLayout],
  );

  const importLayout = useCallbackWithToast(async () => {
    if (!(await promptForUnsavedChanges())) {
      return;
    }
    const [fileHandle] = await showOpenFilePicker({
      multiple: false,
      excludeAcceptAllOption: false,
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    });
    if (!fileHandle) {
      return;
    }

    const file = await fileHandle.getFile();
    const layoutName = path.basename(file.name, path.extname(file.name));
    const content = await file.text();
    const parsedState: unknown = JSON.parse(content);

    if (!isMounted()) {
      return;
    }

    if (typeof parsedState !== "object" || !parsedState) {
      addToast(`${file.name} is not a valid layout`, { appearance: "error" });
      return;
    }

    const data = parsedState as PanelsState;
    const newLayout = await layoutManager.saveNewLayout({
      name: layoutName,
      data,
      permission: "CREATOR_WRITE",
    });
    void onSelectLayout(newLayout);
    void analytics.logEvent(AppEvent.LAYOUT_IMPORT);
  }, [promptForUnsavedChanges, isMounted, layoutManager, onSelectLayout, analytics, addToast]);

  const createLayoutTooltip = useTooltip({ contents: "Create new layout" });
  const importLayoutTooltip = useTooltip({ contents: "Import layout" });
  const offlineTooltip = useTooltip({ contents: "Offline" });

  const layoutDebug = useContext(LayoutStorageDebuggingContext);
  // const supportsSignIn = useContext(ConsoleApiContext) != undefined;

  // const [hideSignInPrompt = false, setHideSignInPrompt] = useAppConfigurationValue<boolean>(
  //   AppSetting.HIDE_SIGN_IN_PROMPT,
  // );

  // const showSignInPrompt = supportsSignIn && !layoutManager.supportsSharing && !hideSignInPrompt;

  return (
    <SidebarContent
      title="布局"
      helpContent={helpContent}
      noPadding
      trailingItems={[
        (layouts.loading || isBusy) && <Spinner key="spinner" />,
        !isOnline && (
          <IconButton
            key="offline"
            checked
            elementRef={offlineTooltip.ref}
            iconProps={{ iconName: "CloudOffFilled" }}
            styles={{
              rootChecked: { backgroundColor: "transparent" },
              rootCheckedHovered: { backgroundColor: "transparent" },
              icon: {
                color: theme.semanticColors.disabledBodyText,
                svg: { fill: "currentColor", height: "1em", width: "1em" },
              },
            }}
          >
            {offlineTooltip.tooltip}
          </IconButton>
        ),
        <IconButton
          key="add-layout"
          elementRef={createLayoutTooltip.ref}
          iconProps={{ iconName: "Add" }}
          onClick={createNewLayout}
          ariaLabel="添加新布局"
          data-test="add-layout"
          styles={{
            icon: {
              svg: { height: "1em", width: "1em" },
              "> span": { display: "flex" },
            },
          }}
        >
          {createLayoutTooltip.tooltip}
        </IconButton>,
        <IconButton
          key="导入布局"
          elementRef={importLayoutTooltip.ref}
          iconProps={{ iconName: "OpenFile" }}
          onClick={importLayout}
          ariaLabel="Import layout"
          styles={{
            icon: {
              svg: { height: "1em", width: "1em" },
              "> span": { display: "flex" },
            },
          }}
        >
          {importLayoutTooltip.tooltip}
        </IconButton>,
      ].filter(Boolean)}
    >
      {unsavedChangesPrompt}
      <Stack verticalFill>
        <Stack.Item>
          <LayoutSection
            title={layoutManager.supportsSharing ? "Personal" : undefined}
            emptyText="点击右上角+号添加布局"
            items={layouts.value?.personal}
            selectedId={currentLayoutId}
            onSelect={onSelectLayout}
            onRename={onRenameLayout}
            onDuplicate={onDuplicateLayout}
            onDelete={onDeleteLayout}
            onShare={onShareLayout}
            onExport={onExportLayout}
            onOverwrite={onOverwriteLayout}
            onRevert={onRevertLayout}
            onMakePersonalCopy={onMakePersonalCopy}
          />
        </Stack.Item>
        <Stack.Item>
          {layoutManager.supportsSharing && (
            <LayoutSection
              title="Team"
              emptyText="Your organization doesn’t have any shared layouts yet. Share a personal layout to collaborate with other team members."
              items={layouts.value?.shared}
              selectedId={currentLayoutId}
              onSelect={onSelectLayout}
              onRename={onRenameLayout}
              onDuplicate={onDuplicateLayout}
              onDelete={onDeleteLayout}
              onShare={onShareLayout}
              onExport={onExportLayout}
              onOverwrite={onOverwriteLayout}
              onRevert={onRevertLayout}
              onMakePersonalCopy={onMakePersonalCopy}
            />
          )}
        </Stack.Item>
        <div style={{ flexGrow: 1 }} />
        {/* {showSignInPrompt && <SignInPrompt onDismiss={() => void setHideSignInPrompt(true)} />} */}
        {layoutDebug?.syncNow && (
          <Stack
            styles={{
              root: {
                position: "sticky",
                bottom: 0,
                left: 0,
                right: 0,
                background: theme.semanticColors.bodyBackground,
                padding: theme.spacing.s1,
                ...debugBorder,
              },
            }}
            tokens={{ childrenGap: theme.spacing.s1 }}
          >
            <Stack.Item grow align="stretch">
              <Stack disableShrink horizontal tokens={{ childrenGap: theme.spacing.s1 }}>
                <Stack.Item grow>
                  <DefaultButton
                    text="Sync"
                    onClick={async () => {
                      await layoutDebug.syncNow?.();
                      await reloadLayouts();
                    }}
                    styles={{
                      root: {
                        display: "block",
                        width: "100%",
                        margin: 0,
                      },
                    }}
                  />
                </Stack.Item>
                <Toggle
                  checked={layoutManager.isOnline}
                  onText="Online"
                  offText="Offline"
                  onChange={(_, checked) => checked != undefined && layoutDebug.setOnline(checked)}
                />
              </Stack>
            </Stack.Item>
          </Stack>
        )}
      </Stack>
    </SidebarContent>
  );
}
