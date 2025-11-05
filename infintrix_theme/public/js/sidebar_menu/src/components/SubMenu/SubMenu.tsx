import { ScrollArea, Tabs } from "@mantine/core";
import classes from "./SubMenu.module.css";
import { LinksGroup } from "../NavbarLinksGroup/NavbarLinksGroup";
import type { ISecondSidebar } from "../../types/sidebar";
import { IconMenu, IconStar } from "@tabler/icons-react";

export function SubMenu({ data }: { data: ISecondSidebar | undefined | null }) {
  // console.log('data in submenu', data);

  return (
    <Tabs
      variant="outline"
      // radius="xl"
      defaultValue="menu"
      styles={{
        tab: {
          "&[data-active]": {
            backgroundColor: "var(--primary)",
            color: "#fff",
          },
        },
      }}
    >
      <Tabs.List>
        <Tabs.Tab value="menu" leftSection={<IconMenu size={12} />}>Menu</Tabs.Tab>
        <Tabs.Tab value="shortcuts" leftSection={<IconStar size={12} />}>Shortcuts</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="menu">
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {(data?.cards?.items || []).map((item) => (
              <LinksGroup {...item} key={item.name} />
            ))}
          </div>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="shortcuts">
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {(data?.shortcuts?.items || []).map((item) => (
              <LinksGroup {...item} key={item.name} />
            ))}
          </div>
        </ScrollArea>
      </Tabs.Panel>
    </Tabs>
  );
}
