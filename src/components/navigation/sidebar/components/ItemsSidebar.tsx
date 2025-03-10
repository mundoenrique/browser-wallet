'use client';

import Link from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { useMenuStore, useDrawerStore, useDebStore, useCollectStore, useHeadersStore } from '@/store';
import { ArrowsIcons, CardIcons, CashIcons, FileIcons, GainIcons, HomeIcons, KeyIcons, ToolIcons } from '%/Icons';

export default function ItemsSidebar(): JSX.Element {
  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.up('md'));

  const host = useHeadersStore((state) => state.host);

  const setView = useDebStore((state) => state.setView);

  const currentItem = useMenuStore((state) => state.currentItem);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const setDrawerStatus = useDrawerStore((state) => state.setDrawerStatus);

  const resetLinkData = useCollectStore((state) => state.reset);

  const itemMenu = match
    ? [
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
          url: '/dashboard/legal',
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
          url: '/dashboard/legal',
          icon: <FileIcons />,
          id: 'terms',
        },
      ];

  return (
    <List sx={{ width: '100%' }}>
      {itemMenu.map((menu, i) => {
        const currentItemMenu = currentItem === menu.id ? true : false;

        return (
          <Box
            key={i}
            sx={{
              width: 'auto',
              display: 'flex',
              alignItems: 'center',
              '&:before': {
                background: fuchsiaBlue[600],
                borderRadius: '0 4px 4px 0',
                content: currentItemMenu ? `' '` : 'none',
                flexShrink: 0,
                width: 4,
                left: '2px',
                position: 'absolute',
                transform: 'translateX(-50%)',
                height: 34,
              },
            }}
          >
            <ListItem
              disablePadding
              onClick={() => {
                setCurrentItem(menu.id);
                setDrawerStatus(false);
              }}
              sx={{ width: 244, mx: 'auto', my: 1 / 2 }}
            >
              <ListItemButton
                disabled={currentItemMenu}
                component={Link}
                href={menu.url}
                selected={currentItemMenu}
                sx={{ textDecoration: 'none', pl: 0 }}
                onClick={() => {
                  setView('DEBT');
                  resetLinkData();
                  sendGTMEvent({
                    event: 'ga4.trackEvent',
                    eventName: 'select_content',
                    eventParams: {
                      content_type: 'boton',
                      section: `Yiro :: ${menu.item} :: menu_1`,
                      previous_section: 'dashboard',
                      selected_content: `menu_1 :: ${menu.item}`,
                      destination_page: `${host}${menu.url}`,
                    },
                  });
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 'auto', mr: 3 / 2, color: currentItemMenu ? fuchsiaBlue[600] : 'initial' }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.item}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: currentItemMenu ? fuchsiaBlue[600] : 'initial',
                    fontSize: { xs: 14, md: 'initial' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Box>
        );
      })}
    </List>
  );
}
