'use client';

import { Box, Typography } from '@mui/material';

/**
 * Slot for show in table when error occurs
 */
export default function ErrorSlot() {
  return (
    <Box sx={{ marginX: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        ¡Oops!
      </Typography>
      <Typography variant="body2" color="initial">
        No podemos mostrar tus movimientos
      </Typography>
    </Box>
  );
}
