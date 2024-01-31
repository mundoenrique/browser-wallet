'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
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
import LogoPurple from '%/images/LogoPurple';
import { fuchsiaBlue } from '@/theme/theme-default';
import {
  ArrowsIcons,
  CardIcons,
  CashIcons,
  FileIcons,
  GainIcons,
  HomeIcons,
  KeyIcons,
  LogoutAppIcons,
  LogoutIcons,
  ToolIcons,
} from '%/Icons';

export default function ItemSidebarDesktop() {
  const itemsMenuDesktop = [
    {
      item: 'Home',
      url: '/dashboard',
      icon: <HomeIcons />,
    },
    {
      item: 'Recarga',
      url: '/dashboard/recharge',
      icon: <GainIcons />,
    },
    {
      item: 'Transfiere',
      url: '/dashboard/transfer',
      icon: <ArrowsIcons />,
    },
    {
      item: 'Cobrar',
      url: '/dashboard/payment',
      icon: <CashIcons />,
    },
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
      <Box
        sx={{
          width: 132,
          height: 74,
          display: 'block',
          mx: 'auto',
          my: '44px',
        }}
      >
        <LogoPurple />
      </Box>

      <Card variant="detailCard">
        <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
          <Image src={card} width={70} height={44} alt="Tarjeta Yiro" />
        </Box>
        <Typography fontSize="14px" fontWeight={700} mr={7}>
          ¿Ya solicitaste tu tarjeta?
        </Typography>
      </Card>

      <List>
        {itemsMenuDesktop.map((menu, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton component={Link} href={menu.url} sx={{ textDecoration: 'none' }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.item} primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="#" sx={{ textDecoration: 'none' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>
              <LogoutAppIcons />
            </ListItemIcon>
            <ListItemText primary="Regresar a ésika conmigo" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" />
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/signin" sx={{ textDecoration: 'none' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px', color: fuchsiaBlue[600] }}>
              <LogoutIcons />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              primaryTypographyProps={{ fontWeight: 700, color: fuchsiaBlue[600] }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
