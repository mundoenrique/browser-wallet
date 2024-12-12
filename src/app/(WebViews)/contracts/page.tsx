'use client';
import { Box } from '@mui/material';

//Internal app
import { Conditions, Terms, Policies } from '@/components';

export default function page() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Terms />
      <Conditions />
      <Policies />
    </Box>
  );
}
