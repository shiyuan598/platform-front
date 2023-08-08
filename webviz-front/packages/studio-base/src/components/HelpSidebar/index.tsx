// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Stack, useTheme, Text, Link, ITheme, ITextStyles, ILinkStyles } from "@fluentui/react";
import ChevronLeftIcon from "@mdi/svg/svg/chevron-left.svg";
import { useMemo } from "react";
import { useUnmount } from "react-use";

import Icon from "@foxglove/studio-base/components/Icon";
import KeyboardShortcutHelp from "@foxglove/studio-base/components/KeyboardShortcut.help.md";
import MesssagePathSyntaxHelp from "@foxglove/studio-base/components/MessagePathSyntax/index.help.md";
import { SidebarContent } from "@foxglove/studio-base/components/SidebarContent";
import TextContent from "@foxglove/studio-base/components/TextContent";
import { useHelpInfo, HelpInfo } from "@foxglove/studio-base/context/HelpInfoContext";
import { PanelInfo, usePanelCatalog } from "@foxglove/studio-base/context/PanelCatalogContext";
import { DEFAULT_HELP_INFO } from "@foxglove/studio-base/providers/HelpInfoProvider";
// import isDesktopApp from "@foxglove/studio-base/util/isDesktopApp";

export const MESSAGE_PATH_SYNTAX_HELP_INFO = {
  title: "Message path syntax",
  content: MesssagePathSyntaxHelp,
};

// type SectionKey = "app" | "panels" | "resources" | "products" | "legal";
// const _helpMenuItems: Map<SectionKey, { subheader: string; links: HelpInfo[] }> = new Map([
//   [
//     "resources",
//     {
//       subheader: "External resources",
//       links: [
//         ...(isDesktopApp() ? [] : [{ title: "Desktop app", url: "https://foxglove.dev/download" }]),
//         { title: "Read docs", url: "https://foxglove.dev/docs" },
//         { title: "Join our community", url: "https://foxglove.dev/community" },
//       ],
//     },
//   ],
//   [
//     "products",
//     {
//       subheader: "Products",
//       links: [
//         { title: "Zhito Webvis", url: "https://foxglove.dev/studio" },
//         { title: "Foxglove Data Platform", url: "https://foxglove.dev/data-platform" },
//       ],
//     },
//   ],
//   [
//     "legal",
//     {
//       subheader: "Legal",
//       links: [
//         { title: "License terms", url: "https://foxglove.dev/legal/studio-license" },
//         { title: "Privacy policy", url: "https://foxglove.dev/legal/privacy" },
//       ],
//     },
//   ],
// ]);

const useComponentStyles = (theme: ITheme) =>
  useMemo(
    () => ({
      subheader: {
        root: {
          ...theme.fonts.xSmall,
          display: "block",
          textTransform: "uppercase",
          color: theme.palette.neutralSecondaryAlt,
          letterSpacing: "0.025em",
        },
      } as Partial<ITextStyles>,
      link: {
        root: {
          ...theme.fonts.smallPlus,
          fontSize: 13,
        } as Partial<ILinkStyles>,
      },
      footer: {
        root: {
          ...theme.fonts.xSmall,
          color: theme.palette.neutralSecondaryAlt,
        } as Partial<ITextStyles>,
      },
    }),
    [theme],
  );

export default function HelpSidebar({
  isHomeViewForTests,
}: React.PropsWithChildren<{
  isHomeViewForTests?: boolean;
}>): JSX.Element {
  const theme = useTheme();
  const styles = useComponentStyles(theme);
  const { helpInfo, setHelpInfo } = useHelpInfo();

  const panelCatalog = usePanelCatalog();

  const sortByTitle = (a: PanelInfo, b: PanelInfo) =>
    a.title.localeCompare(b.title, undefined, { ignorePunctuation: true, sensitivity: "base" });
  const panels = panelCatalog.getPanels();
  const sortedPanelLinks = [...panels]
    .sort(sortByTitle)
    .map(({ title, help }) => ({ title, content: help }));

  const sections: Map<string, { subheader: string; links: HelpInfo[] } | undefined> = useMemo(
    () =>
      new Map([
        [
          "可视化",
          {
            subheader: "可视化",
            links: [
              { title: "开始使用", url: "docs/#/quick-start",content: KeyboardShortcutHelp },
              { title: "更新日志", url: "docs/#/change-log",content: KeyboardShortcutHelp },
              { title: "事件记录", url: "docs/#/Event-Recorder",content: KeyboardShortcutHelp },
            ],
          },
        ],
        ["数据录制",
          { subheader: "数据录制", links: [
            { title: "开始使用", url: "docs/#/ros-data",content: KeyboardShortcutHelp },
            { title: "更新日志", url: "docs/#/ros-update",content: KeyboardShortcutHelp },
          ] },]
      ]),
    [sortedPanelLinks],
  );
  const sectionKeys = Array.from(sections.keys());

  const isHomeView = useMemo(
    () => (isHomeViewForTests != undefined ? isHomeViewForTests : helpInfo.content == undefined),
    [isHomeViewForTests, helpInfo],
  );

  useUnmount(() => {
    // Automatically deselect the panel we were looking at help content for when the help sidebar closes
    if (helpInfo.content != undefined) {
      setHelpInfo(DEFAULT_HELP_INFO);
    }
  });

  return (
    <SidebarContent
      leadingItems={
        helpInfo.content == undefined
          ? undefined
          : [
            <Icon
              key="back-arrow"
              size="small"
              style={{ marginRight: "5px" }}
              onClick={() => setHelpInfo(DEFAULT_HELP_INFO)}
            >
              <ChevronLeftIcon />
            </Icon>,
          ]
      }
      title={isHomeView ? "Help" : helpInfo.title}
    >
      <Stack>
        {isHomeView ? (
          <Stack tokens={{ childrenGap: theme.spacing.m }}>
            {sectionKeys.map((key: string) => {
              const { subheader, links = [] } = sections.get(key) ?? {};
              return (
                <Stack.Item key={subheader}>
                  <Text styles={styles.subheader}>{subheader}</Text>
                  <Stack
                    tokens={{ padding: `${theme.spacing.m} 0`, childrenGap: theme.spacing.s1 }}
                  >
                    {links.map(({ title, url, content }: HelpInfo) => (
                      <Link
                        target={"help_page"}
                        key={title}
                        data-test={title}
                        style={{ color: theme.semanticColors.bodyText }}
                        href={url ?? ""}
                        onClick={() => (url ? undefined : setHelpInfo({ title, content }))}
                        styles={styles.link}
                      >
                        {title}
                      </Link>
                    ))}
                  </Stack>
                </Stack.Item>
              );
            })}
            <Text styles={styles.footer}>Zhito WebViz version {FOXGLOVE_STUDIO_VERSION}</Text>
          </Stack>
        ) : (
          <Stack tokens={{ childrenGap: theme.spacing.s2 }}>
            {helpInfo.content != undefined ? (
              <TextContent allowMarkdownHtml={true}>{helpInfo.content}</TextContent>
            ) : (
              "Panel does not have any documentation details."
            )}
          </Stack>
        )}
      </Stack>
    </SidebarContent>
  );
}
