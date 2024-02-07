'use client';

import Link from 'next/link';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { ArrowsIcons, CardIcons, CashIcons, FileIcons, GainIcons, HomeIcons, KeyIcons, ToolIcons } from '%/Icons';

export default function ItemsSidebar() {
  const theme = useTheme();
  const { currentItem, setCurrentItem }: any = useMenuStore();
  const matche = useMediaQuery(theme.breakpoints.up('sm'));

  const itemMenu = matche
    ? [
        {
          item: 'Home',
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
        {
          item: 'Configuración tarjeta',
          url: '/dashboard/card-configuration',
          icon: <CardIcons />,
          id: 'card-settings',
        },
        {
          item: 'Cambiar contraseña',
          url: '/dashboard/change-password',
          icon: <KeyIcons />,
          id: 'password-change',
        },
        {
          item: 'Ayuda',
          url: '/dashboard/help',
          icon: <ToolIcons />,
          id: 'help',
        },
        {
          item: 'Términos y condiciones',
          url: '/dashboard/terms-conditions',
          icon: <FileIcons />,
          id: 'terms',
        },
      ]
    : [
        {
          item: 'Configuración tarjeta',
          url: '/dashboard/card-configuration',
          icon: <CardIcons />,
          id: 'card-settings',
        },
        {
          item: 'Cambiar contraseña',
          url: '/dashboard/change-password',
          icon: <KeyIcons />,
          id: 'password-change',
        },
        {
          item: 'Ayuda',
          url: '/dashboard/help',
          icon: <ToolIcons />,
          id: 'help',
        },
        {
          item: 'Términos y condiciones',
          url: '/dashboard/terms-conditions',
          icon: <FileIcons />,
          id: 'terms',
        },
      ];

  return (
    <List>
      {itemMenu.map((menu, i) => {
        const currentItemMenu = currentItem === menu.id ? true : false;

        return (
          <ListItem
            key={i}
            disablePadding
            onClick={() => setCurrentItem(menu.id)}
            sx={{
              width: 244,
              my: '4px',
              '&:before': {
                background: fuchsiaBlue[600],
                borderRadius: '0px 0px 4px 4px',
                content: currentItemMenu ? `' '` : 'none',
                flexShrink: 0,
                height: '4px',
                left: '-15px',
                position: 'fixed',
                transform: 'rotate(-90deg)',
                width: '34px',
              },
            }}
          >
            <ListItemButton
              disabled={currentItemMenu}
              component={Link}
              href={menu.url}
              selected={currentItemMenu}
              sx={{ textDecoration: 'none', pl: 0 }}
            >
              <ListItemIcon
                sx={{ minWidth: 'auto', mr: '12px', color: currentItemMenu ? fuchsiaBlue[600] : 'initial' }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.item}
                primaryTypographyProps={{
                  fontWeight: 700,
                  color: currentItemMenu ? fuchsiaBlue[600] : 'initial',
                  fontSize: { xs: '14px', sm: 'initial' },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
