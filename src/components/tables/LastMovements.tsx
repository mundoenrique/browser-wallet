'use client';

import { Box, Link as LinkMui, Typography } from '@mui/material';
import Link from 'next/link';

export default function LastMovements() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Últimos movimientos</Typography>
        <LinkMui component={Link} href="#" color="primary.main" fontWeight={700} fontSize={12}>
          Ver todo
        </LinkMui>
      </Box>
    </>
  );
}
