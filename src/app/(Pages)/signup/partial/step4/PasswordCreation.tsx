'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { CardStep } from '..';
import { FormPass } from '@/components';
import { useRegisterStore, useUiStore } from '@/store';
import { useApi } from '@/hooks/useApi';
import { encryptForge } from '@/utils/toolHelper';

export default function PasswordCreation() {
  const { dec, inc, setShowHeader } = useRegisterStore();
  const { setLoadingScreen, loadingScreen } = useUiStore();
  const customApi = useApi();

  const getTermsCatalog = useCallback(() => {
    customApi.post('/catalog/search', {
      catalogCode: 'TERMS_AND_CONDITIONS_CATALOG',
      parameters: [
        {
          code: 'TERMS_CATEGORY',
          value: 'ONB_PHASES_PASSWORD',
        },
      ],
    });
  }, []);

  useEffect(() => {
    getTermsCatalog();
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);
    const cipherPassword = encryptForge(data.newPassword);
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_PASSWORD',
      onboardingUuid: 'a4f97d13-0d69-4d6d-9042-a857cb08e391',
      request: {
        password: cipherPassword,
        terms: [
          {
            code: 'TERM1',
          },
        ],
      },
    };

    customApi
      .post('/onboarding/credentials', requestFormData)
      .then(() => {
        inc();
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <CardStep stepNumber="4">
      <FormPass
        register
        onSubmit={onSubmit}
        description={
          <>
            <Typography variant="subtitle1" sx={{ mb: 3, mx: 'auto' }}>
              Ahora es momento de activar tu cuenta
            </Typography>
            <Typography variant="body2" mb={3 / 2}>
              Para finalizar crea una contraseña segura
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Elige 6 números que recuerdes.</Typography>
              <Typography variant="body2">Evita fechas de cumpleaños, números consecutivos ó iguales.</Typography>
            </Box>
          </>
        }
        buttons={
          <>
            <Button
              variant="outlined"
              onClick={() => {
                dec();
              }}
            >
              Anterior
            </Button>
            <Button variant="contained" type="submit">
              Siguiente
            </Button>
          </>
        }
      />
    </CardStep>
  );
}
