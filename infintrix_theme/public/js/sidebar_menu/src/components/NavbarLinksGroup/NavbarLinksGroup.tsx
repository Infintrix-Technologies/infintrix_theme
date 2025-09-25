import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';
import type { ICard, ILink } from '../../types/sidebar';



export function LinksGroup(card: ICard) {
  const hasLinks = Array.isArray(card.links);
  const [opened, setOpened] = useState(false);
  const slugify = (text: string) => text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  const make_url = (link: ILink) => {

    if (link.link_type === "DocType") {
      return '/app/' + slugify(link.link_to as string);
    } else if (link.link_type === "Report" && link.is_query_report === 1) {

      return '/app/query-report/' + link.link_to;
    } else if (link.link_type === "Page") {
      return '/app/' + (link.link_to as string);
    } else if (link.link_type === "URL") {
      return link.link_to as string;
    } else {
      return '#';
    }

  }

  const items = (hasLinks ? card?.links || [] : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={make_url(link)}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {/* <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon> */}
            <Box ml="md">

              {/* {card.label} */}
              {card.doctype == "Workspace Link" ? card.label : <Text<'a'>
                component="a"
                className={classes.link}
                // href={make_url(card)}
                key={card.label}
                onClick={(event) => event.preventDefault()}
              >
                {card.label}
              </Text>
              }


            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}



// export function NavbarLinksGroup() {
//   return (
//     <Box mih={220} p="md">
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }