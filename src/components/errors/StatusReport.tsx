'use client';

import Image from 'next/image';
import { Box, Typography, Stack, Button } from '@mui/material';
//Internal app
import Pet from '%/images/arts/pet.png';
import { StatusReportProps } from '@/interfaces';
import PurpleLayout from '../layout/PurpleLayout';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Component used to display error messages
 *
 * @param title - Message title
 * @param description - Message description
 * @param onClick - Handling component actions
 */
export default function StatusReport(props: StatusReportProps) {
  const { title, description, onClick } = props;

  return (
    <PurpleLayout hidePelca bigModal>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={Pet} height={179} width={172} alt="Error" priority />
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
