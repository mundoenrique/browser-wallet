'use client';

import Link from 'next/link';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { ItemSecondarySidebar } from '@/interfaces';

export default function ItemSecondarySidebar(props: ItemSecondarySidebar) {
  const { color, text, icon } = props;

  return (
    <ListItem disablePadding sx={{ width: { xs: 244, md: 'auto' }, my: { xs: '4px', md: 0 } }}>
      <ListItemButton component={Link} href="/signin" sx={{ textDecoration: 'none' }}>
        <ListItemIcon sx={{ minWidth: 'auto', mr: '12px', color: color ? fuchsiaBlue[600] : 'initial' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: 700,
            color: color ? fuchsiaBlue[600] : 'initial',
            fontSize: { xs: '14px', md: 'initial' },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
