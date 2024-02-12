'use client';

import Image from 'next/image';
import { Box, Card, Divider, List, Typography } from '@mui/material';
//Internal app
import card from '%/images/card.png';
import ItemsSidebar from './ItemsSidebar';
import LogoPurple from '%/images/LogoPurple';
import { fuchsiaBlue } from '@/theme/theme-default';
import { LogoutAppIcons, LogoutIcons } from '%/Icons';
import ItemSecondarySidebar from './ItemSecondarySidebar';

export default function ListSidebar() {
  return (
    <>
      <Box
        sx={{
          width: 132,
          height: 74,
          display: { xs: 'none', md: 'block' },
          mx: 'auto',
          my: '44px',
        }}
      >
        <LogoPurple />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Card variant="detailCard" sx={{ mt: { xs: 10, md: 'auto' }, mb: { xs: 0, md: 'auto' } }}>
          <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
            <Image src={card} width={70} height={44} alt="Tarjeta Yiro" />
          </Box>
          <Typography fontSize="14px" fontWeight={700} mr={4}>
            ¿Ya solicitaste tu tarjeta?
          </Typography>
        </Card>

        <ItemsSidebar />
      </Box>

      <List>
        <ItemSecondarySidebar text="Regresa a ésika conmigo" icon={<LogoutAppIcons />} />
        <Divider variant="middle" sx={{ bgcolor: `${fuchsiaBlue[400]}` }} />
        <ItemSecondarySidebar text="Cerrar sesión" icon={<LogoutIcons />} color />
      </List>
    </>
  );
}
