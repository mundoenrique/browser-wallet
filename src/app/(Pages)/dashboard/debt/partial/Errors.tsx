'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

//Internal app
import { ErrorDebitProps } from '@/interfaces';
import PurpleLayout from '@/components/layout/PurpleLayout';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Error(props: ErrorDebitProps) {
  const { title, description, onClick, iconName = 'duplicate' } = props;

  return (
    <PurpleLayout hidePelca>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={`/images/arts/pet-${iconName}.png`} height={179} width={172} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            {title}
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            {description}
          </Typography>
        </Stack>

        <Button variant="text" onClick={onClick} sx={{ textDecoration: 'underline', fontWeight: '700' }}>
          Volver
        </Button>
      </Box>
    </PurpleLayout>
  );
}
