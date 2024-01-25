'use client';

import Link from 'next/link';
import Image from 'next/image';
import Key from '@mui/icons-material/VpnKeyOutlined';
import CardPayment from '@mui/icons-material/PaymentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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

export default function ItemSidebarPwa() {
  const itemsMenuPwa = [
    {
      item: 'Configuración tarjeta',
      url: '/dashboard/card-configuration',
      icon: <CardPayment />,
    },
    {
      item: 'Cambiar contraseña',
      url: '/dashboard/change-password',
      icon: <Key />,
    },
    {
      item: 'Ayuda',
      url: '/dashboard/help',
      icon: <BuildOutlinedIcon />,
    },
    {
      item: 'Términos y condiciones',
      url: '/dashboard/terms-conditions',
      icon: <DescriptionOutlinedIcon />,
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
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>i</ListItemIcon>
            <ListItemText
              primary="Regresar a ésika conmigo"
              primaryTypographyProps={{ fontWeight: 700, fontSize: '14px' }}
            />
          </ListItemButton>
        </ListItem>
        <Divider variant="middle" sx={{ bgcolor: '#B0A1E4' }} />
        <ListItem disablePadding sx={{ width: 244, my: '4px' }}>
          <ListItemButton component={Link} href="/signin" sx={{ textDecoration: 'none' }}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '12px' }}>i</ListItemIcon>
            <ListItemText primary="Cerrar sesión" primaryTypographyProps={{ fontWeight: 700, fontSize: '14px' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
