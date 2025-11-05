import { useMemo, useState } from "react";
import { IconQuestionMark } from "@tabler/icons-react";
import { Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./Sidebar.module.css";
import type { IPage, ISecondSidebar } from "../types/sidebar";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "../hooks";
import { SubMenu } from "./SubMenu/SubMenu";
declare const frappe: any;

export function Sidebar() {
  const [active, setActive] = useState("Home");
  const [activeLink, setActiveLink] = useState<string | null>(null);
  // const theme = useTheme();
  const route = useRoute();
  // console.log('theme', theme);
  console.log('route', route);

  const final_query = useQuery<IPage[]>({
    queryKey: ["sidebar"],
    queryFn: async () => {
      try {
        if (!frappe || !frappe.call) {
          console.warn("Frappe is not available yet.");
          return;
        }
        const response = await frappe.call({
          method: "infintrix_theme.infintrix_theme.api.functions.sidebar",
        });
        if (response?.message) {
          return response.message;
        }
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
      }
    },
  });
  const pages = final_query.data || [];

  const subpages = useMemo(() => {
    const foundpages = pages.filter((page) => page.name == activeLink);
    if (foundpages) {
      return foundpages[0]?.subpages || null;
    }
  }, [route]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          {(final_query.data || []).map((link) => (
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
                  setActive(link.label);
                  setActiveLink(link.name);
                }}
                className={classes.mainLink}
                data-active={link.label === active || undefined}
              >
                {/* <IconHome2 size={22} stroke={1.5} /> */}
                {!link.icon ? (
                  <IconQuestionMark size={22} stroke={1.5} />
                ) : (
                  <svg className="icon icon-md" style={{}} aria-hidden="true">
                    <use className="" href={`#icon-${link.icon}`}></use>
                  </svg>
                )}

                {/* {link.icon && React.createElement(link.icon, { size: 22, stroke: 1.5 })} */}
              </UnstyledButton>
            </Tooltip>
          ))}
        </div>
        <div className={classes.main}>
          {/* <Title order={4} className={classes.title}>
                        {active}
                    </Title> */}

          {/* {links} */}
          <SubMenu data={subpages} />
        </div>
      </div>
    </nav>
  );
}
