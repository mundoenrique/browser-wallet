'use client';

import Link from 'next/link';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { ItemSecondarySidebar } from '@/interfaces';

/**
 * Child items that do not change in the menu.
 *
 * @param color - Element text color.
 * @param text - Element text.
 * @param icon - Item custom icon.
 */
export default function ItemSecondarySidebar(props: ItemSecondarySidebar): JSX.Element {
  const { color, text, icon } = props;

  return (
    <ListItem disablePadding sx={{ width: { xs: 244, md: 'auto' }, my: { xs: 1 / 2, md: 0 } }}>
      <ListItemButton component={Link} href="/signin" sx={{ textDecoration: 'none' }}>
        <ListItemIcon sx={{ minWidth: 'auto', mr: 3 / 2, color: color ? fuchsiaBlue[600] : 'initial' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: 700,
            color: color ? fuchsiaBlue[600] : 'initial',
            fontSize: { xs: 14, md: 'initial' },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
