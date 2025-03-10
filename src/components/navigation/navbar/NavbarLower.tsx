'use client';

import Link from 'next/link';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { ArrowsIcons, CashIcons, GainIcons, HomeIcons } from '%/Icons';

/**
 * Bottom bar to show menu items in responsive.
 *
 * @remarks
 *
 * This component has persistence with Zustand and is being passed (Home, Recharge, Transfer and Charge)
 */
export default function NavbarLower(): JSX.Element {
  const { currentItem, setCurrentItem } = useMenuStore();

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
      url: '/dashboard/collect',
      icon: <CashIcons />,
      id: 'collect',
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
        boxShadow: '0 4px 24px 0px rgba(0, 0, 0, 0.5);',
        zIndex: 1199,
      }}
    >
      <List sx={{ display: 'flex' }} disablePadding>
        {itemMenu.map((menu, i) => {
          const currentItemMenu = currentItem === menu.id;

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
                    width: 34,
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
                    fontSize: { xs: 10, md: 'initial' },
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
