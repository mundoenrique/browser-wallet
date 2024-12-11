'use client';
import { Box } from '@mui/material';

//Internal app
import { Conditions, Terms, Policies, ContainerLayout } from '@/components';

export default function page() {
  return (
    <ContainerLayout fullWidth>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Terms />
        <Conditions />
        <Policies />
      </Box>
    </ContainerLayout>
  );
}
