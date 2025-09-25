
import {  ScrollArea, Tabs } from '@mantine/core';
import classes from './SubMenu.module.css';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import type { ISecondSidebar } from '../../types/sidebar';

export function SubMenu({ data }: { data: ISecondSidebar | undefined | null }) {
  console.log('data in submenu', data);

  return (


    <Tabs variant="pills" defaultValue={'menu'}>
      <Tabs.List>
        <Tabs.Tab value="menu">
          Menu
        </Tabs.Tab>
        <Tabs.Tab value="shortcuts">
          Shortcuts
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="menu">
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {(data?.cards?.items || []).map((item) => <LinksGroup {...item} key={item.name} />)}
          </div>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="shortcuts">
       <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {(data?.shortcuts?.items || []).map((item) => <LinksGroup {...item} key={item.name} />)}
          </div>
        </ScrollArea>
      </Tabs.Panel>

    </Tabs>



  );
}