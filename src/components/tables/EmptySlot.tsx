'use client';

import { Typography, Box } from '@mui/material';

export default function EmptySlot() {
  return (
    <Box sx={{ marginX: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        !Oops¡
      </Typography>
      <Typography variant="body2" color="initial">
        No tienes movimientos este mes.
      </Typography>
    </Box>
  );
}
