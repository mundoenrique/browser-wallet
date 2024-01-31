'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
//Internal app
import card from '%/images/card.png';
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardIcons, FileIcons, KeyIcons, LogoutAppIcons, LogoutIcons, ToolIcons } from '%/Icons';

export default function ItemSidebarPwa() {
  const itemsMenuPwa = [
    {
      item: 'Configuración tarjeta',
      url: '/dashboard/card-configuration',
      icon: <CardIcons />,
    },
    {
      item: 'Cambiar contraseña',
      url: '/dashboard/change-password',
      icon: <KeyIcons />,
    },
    {
      item: 'Ayuda',
      url: '/dashboard/help',
      icon: <ToolIcons />,
    },
    {
      item: 'Términos y condiciones',
      url: '/dashboard/terms-conditions',
      icon: <FileIcons />,
    },
  ];
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Card variant="detailCard" sx={{ mt: 10, mb: 0 }}>
          <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
            <Image src={card} width={70} height={44} alt="Tarjeta Yiro" />
          </Box>
          <Typography fontSize="14px" fontWeight={700} mr={4}>
            ¿Ya solicitaste tu tarjeta?
          </Typography>
        </Card>

        <List disablePadding>
          {itemsMenuPwa.map((menu, i) => (
            <ListItem key={i} disablePadding sx={{ width: 244, my: '4px' }}>
              <ListItemButton component={Link} href={menu.url} sx={{ textDecoration: 'none' }}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.item} primaryTypographyProps={{ fontWeight: 700, fontSize: '14px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <List disablePadding>
        <ListItem disablePadding sx={{ width: 244, my: '4px' }}>
          <ListItemButton component={Link} href="#" sx={{ textDecoration: 'none' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>
              <LogoutAppIcons />
            </ListItemIcon>
            <ListItemText
              primary="Regresar a ésika conmigo"
              primaryTypographyProps={{ fontWeight: 700, fontSize: '14px' }}
            />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" sx={{ bgcolor: '#B0A1E4' }} />
        <ListItem disablePadding sx={{ width: 244, my: '4px' }}>
          <ListItemButton component={Link} href="/signin" sx={{ textDecoration: 'none' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px', color: fuchsiaBlue[600] }}>
              <LogoutIcons />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              primaryTypographyProps={{ fontWeight: 700, fontSize: '14px', color: fuchsiaBlue[600] }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
