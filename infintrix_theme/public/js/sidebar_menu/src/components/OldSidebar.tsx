

import { useState } from 'react';
import {

    IconQuestionMark,
} from '@tabler/icons-react';
import { Tooltip, UnstyledButton } from '@mantine/core';
import classes from './Sidebar.module.css';
import type { IPage, ISecondSidebar } from '../types/sidebar';
import { useQuery } from '@tanstack/react-query';
import {useRoute} from '../hooks';
import { SubMenu } from './SubMenu/SubMenu';
declare const frappe: any;


export function Sidebar() {
    const [active, setActive] = useState('Home');
    const [activeLink, setActiveLink] = useState<string | null>(null);
    // const theme = useTheme();
    const route = useRoute()
    // console.log('theme', theme);
    console.log('route', route);
    


    const pages_query = useQuery<IPage[]>({
        queryKey: ['pages'],
        queryFn: async () => {
            try {
                if (!frappe || !frappe.call) {
                    console.warn("Frappe is not available yet.");
                    return;
                }
                const response = await frappe.call({
                    method: "frappe.desk.desktop.get_workspace_sidebar_items",
                });
                if (response?.message?.pages) {
                    return response.message.pages;
                }
            } catch (err) {
                console.error("Error fetching sidebar data:", err);
            }
        },
    });
    const subpages_query = useQuery<ISecondSidebar | null>({
        queryKey: ['sub_pages', activeLink],
        queryFn: async () => {
            console.log('active link', activeLink);
            try {
                if (!frappe || !frappe.call) {
                    return null;
                }
                const response = await frappe.call({
                    method: "frappe.desk.desktop.get_desktop_page",
                    args: {
                        page: JSON.stringify({ name: activeLink, title: activeLink }),
                    },
                });
                if (response?.message) {
                    return response.message;
                }
            } catch (err) {
                console.error("Error fetching page info:", err);
                return null;
            }
        },
        enabled: !!activeLink, // Only run this query if activeLink is set

    });



    // console.log('sub pages', subpages_query.data?.cards.items);


    const mainLinks = (pages_query?.data || []).map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => {
                    // setActive(link.label)
                    const slug = link.name.toLowerCase().replace(/ /g, "-");
                    frappe.set_route(slug);
                    setActive(link.label)
                    setActiveLink(link.name);
                }}
                className={classes.mainLink}
                data-active={link.label === active || undefined}
            >
                {/* <IconHome2 size={22} stroke={1.5} /> */}
                {
                    !link.icon ? <IconQuestionMark size={22} stroke={1.5} /> :
                        (<svg className="icon icon-md" style={{}} aria-hidden="true">
                            <use className="" href={`#icon-${link.icon}`}></use>
                        </svg>)
                }

                {/* {link.icon && React.createElement(link.icon, { size: 22, stroke: 1.5 })} */}
            </UnstyledButton>
        </Tooltip>
    ));
    // const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

    // const links = (subpages_query?.data?.cards?.items || []).map((item) => {
    //     return (
    //         <LinksGroup {...item} key={item.label} />
    //         // <div className={classes.linkGroup}>
    //         //     <div className={classes.linkHeader}>
    //         //         <a className={classes.linkTitle}>{link.label}</a>
    //         //     </div>
    //         //     <div className={classes.subLinks}>
    //         //         {
    //         //             (link.links || []).map((subpage) => (
    //         //                 <div key={subpage.name} className={classes.subLinkItem}>
    //         //                     <a className={classes.subLink}>{subpage.label}</a>
    //         //                 </div>
    //         //             ))
    //         //         }
    //         //     </div>
    //         // </div>

    //         // <a
    //         //     className={classes.link}
    //         //     data-active={activeLink === link.name || undefined}
    //         //     href="#"
    //         //     onClick={(event) => {
    //         //         event.preventDefault();
    //         //         // setActiveLink(link.name);
    //         //     }}
    //         //     key={link.name}
    //         // >
    //         //     {link.label}
    //         // </a>
    //     )

    // });

    return (
        <nav className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.aside}>

                    {mainLinks}
                </div>
                <div className={classes.main}>
                    {/* <Title order={4} className={classes.title}>
                        {active}
                    </Title> */}

                    {/* {links} */}
                     <SubMenu data={subpages_query.data} />
                </div>
            </div>
        </nav>
    );
}