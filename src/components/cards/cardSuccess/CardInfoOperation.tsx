'use client';

import { Card, Stack, Typography } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';

export default function CardInfoOperation(props: any) {
  const { date, amount, name } = props;

  return (
    <Card sx={{ boxShadow: 'none', bgcolor: fuchsiaBlue[500], px: 3, py: 1, mb: 2 }}>
      <Stack spacing={1} sx={{ display: 'grid', justifyContent: 'center', justifyItems: 'center' }}>
        <Typography variant="body2" color="white" fontWeight={700}>
          Pago vigente hasta: {date}
        </Typography>
        <Typography variant="body2" color="white" fontWeight={700}>
          Monto: S/{amount}
        </Typography>
        <Typography variant="body2" color="white" fontWeight={700}>
          Cliente: {name}
        </Typography>
      </Stack>
    </Card>
  );
}
