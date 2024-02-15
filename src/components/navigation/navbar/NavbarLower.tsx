'use client';

import Link from 'next/link';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { ArrowsIcons, CashIcons, GainIcons, HomeIcons } from '%/Icons';

export default function NavbarLower() {
  const { currentItem, setCurrentItem }: any = useMenuStore();

  const itemMenu = [
    {
      item: 'Inicio',
      url: '/dashboard',
      icon: <HomeIcons />,
      id: 'home',
    },
    {
      item: 'Recarga',
      url: '/dashboard/recharge',
      icon: <GainIcons />,
      id: 'recharge',
    },
    {
      item: 'Transfiere',
      url: '/dashboard/transfer',
      icon: <ArrowsIcons />,
      id: 'transfer',
    },
    {
      item: 'Cobrar',
      url: '/dashboard/payment',
      icon: <CashIcons />,
      id: 'payment',
    },
  ];

  return (
    <Box
      sx={{
        display: { md: 'none' },
        height: 60,
        borderRadius: '16px 16px 0 0 ',
        backgroundColor: fuchsiaBlue[50],
        bottom: 0,
        position: 'fixed',
        width: '100%',
        boxShadow: 1,
        zIndex: 1199,
      }}
    >
      <List sx={{ display: 'flex' }} disablePadding>
        {itemMenu.map((menu, i) => {
          const currentItemMenu = currentItem === menu.id ? true : false;

          return (
            <ListItem disablePadding key={i} onClick={() => setCurrentItem(menu.id)}>
              <ListItemButton
                disabled={currentItemMenu}
                component={Link}
                href={menu.url}
                selected={currentItemMenu}
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:before': {
                    background: fuchsiaBlue[600],
                    borderRadius: '0px 0px 3.349px 3.349px',
                    content: currentItemMenu ? `' '` : 'none',
                    flexShrink: 0,
                    height: '4px',
                    position: 'absolute',
                    width: '34px',
                    top: 0,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: currentItemMenu ? fuchsiaBlue[600] : 'initial' }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.item}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: currentItemMenu ? fuchsiaBlue[600] : 'initial',
                    fontSize: { xs: '10px', sm: 'initial' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
