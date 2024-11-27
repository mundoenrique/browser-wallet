'use client';

import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';
//Internal app
import { useHeadersStore } from '@/store';
import Linking from '../navigation/Linking';
import Pet from '%/images/arts/pet-sorry.png';
import PurpleLayout from '../layout/PurpleLayout';
import { NotFoundErrorProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Shows https error messages
 *
 * @param code - Error code generated
 */
export default function NotFoundError({ code }: Readonly<NotFoundErrorProps>) {
  const { backLink } = useHeadersStore();

  return (
    <PurpleLayout hidePelca>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={Pet} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4}>
          <Box>
            <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
              {code == 404 ? '¡Oops!' : '¡Ups!'}
            </Typography>
            <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
              {code == 404 ? 'Página no encontrada' : 'Algo salió mal'}
            </Typography>
          </Box>
          <Typography variant="body2" color={fuchsiaBlue[50]} textAlign="left">
            {code == 404
              ? 'Lo sentimos, la página que buscas no existe o ha sido movida. Por favor, verifica la URL e inténtalo de nuevo. Si crees que esto es un error, contáctanos para ayudarte.'
              : 'Lo sentimos, estamos experimentando problemas técnicos. Estamos trabajando para resolverlos. Por favor, inténtalo de nuevo más tarde. Si persiste, contáctanos para obtener ayuda.'}
          </Typography>
        </Stack>

        <Linking href={backLink} label="Volver" hidenArrow color="white" underline />
      </Box>
    </PurpleLayout>
  );
}
