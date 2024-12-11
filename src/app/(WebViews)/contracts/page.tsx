'use client';

//Internal app
import { Conditions, Terms, Policies, ContainerLayout } from '@/components';
import { Box } from '@mui/material';

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
