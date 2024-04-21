'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { CardStep } from '..';
import Ending from '../Ending';
import { FormPass } from '@/components';
import { useApi } from '@/hooks/useApi';
import { encryptForge } from '@/utils/toolHelper';
import { useRegisterStore, useUiStore, useCatalogsStore } from '@/store';

export default function PasswordCreation() {
  const customApi = useApi();
  const { dec, setShowHeader, onboardingUuId } = useRegisterStore();
  const { setModalError, setLoadingScreen } = useUiStore();
  const { updateCatalog, passwordTermsCatalog } = useCatalogsStore();

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTermPasswordCatalog = async () => {
      customApi
        .post('/catalogs/search', {
          catalogCode: 'TERMS_AND_CONDITIONS_CATALOG',
          parameters: [
            {
              code: 'TERMS_CATEGORY',
              value: 'ONB_PHASES_CONTRASENNIA',
            },
          ],
        })
        .then((response) => {
          updateCatalog('passwordTermsCatalog', response.data.data.data);
        })
        .catch(() => {
          setModalError({ title: 'Algo salió mal', description: 'Inténtalo nuevamente' });
        });
    };
    {
      passwordTermsCatalog.length === 0 && fetchTermPasswordCatalog();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    const termsObject: { [key: string]: boolean } = {
      'TERMINO 3': data.policy,
    };

    const cipherPassword = encryptForge(data.newPassword);
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_CONTRASENNIA',
      onboardingUuId: onboardingUuId,
      request: {
        password: cipherPassword,
        terms: passwordTermsCatalog.reduce((acc: any[], e) => {
          termsObject[e.value] && acc.push({ code: e.code });
          return acc;
        }, []),
      },
    };
    setLoadingScreen(true);
    customApi
      .post('/onboarding/credentials', requestFormData)
      .then(() => {
        setLoadingModal(true);
      })
      .catch(() => {
        setModalError({ title: 'Algo salió mal', description: 'Inténtalo nuevamente' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <>
      {!loadingModal && (
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
      )}

      {loadingModal && <Ending />}
    </>
  );
}
