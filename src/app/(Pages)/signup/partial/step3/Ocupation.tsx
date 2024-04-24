'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Collapse, Typography } from '@mui/material';
//Internal app
import CardStep from '../CardStep';
import { getSchema } from '@/config';
import { useApi } from '@/hooks/useApi';
import { InputSelect, InputText } from '@/components';
import { useRegisterStore, useUiStore, useCatalogsStore } from '@/store';

export default function Ocupation() {
  const customApi = useApi();
  const [ocupations, setOcupations] = useState<boolean>(false);
  const { updateStep, inc, updateFormState, ONB_PHASES_CONSULT_DATA, onboardingUuId } = useRegisterStore();
  const { setLoadingScreen, loadingScreen, setModalError } = useUiStore();
  const { updateCatalog, occupationCatalog } = useCatalogsStore();

  const schema = ocupations
    ? getSchema(['occupationCode', 'companyType', 'companyName', 'companyPosition'])
    : getSchema(['ocupation']);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    defaultValues: {
      occupationCode: ONB_PHASES_CONSULT_DATA?.consultant?.occupationCode ?? 'SELF_EMPLOYED',
      companyType: ONB_PHASES_CONSULT_DATA?.consultant?.companyType ?? null,
      companyName: ONB_PHASES_CONSULT_DATA?.consultant?.companyName ?? '',
      companyPosition: ONB_PHASES_CONSULT_DATA?.consultant?.companyPosition ?? '',
    },
    resolver: yupResolver(schema),
  });

  const personOcupation = watch('occupationCode');

  useEffect(() => {
    if (['SELF_EMPLOYED'].includes(personOcupation)) {
      setOcupations(false);
      reset({
        ...getValues(),
        companyType: null,
        companyName: '',
        companyPosition: '',
      });
    } else {
      setOcupations(true);
    }
  }, [getValues, personOcupation, reset]);

  const onSubmit = async (data: any) => {
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_CONSULT_DATA',
      onboardingUuId: onboardingUuId,
      request: {
        consultant: {
          occupationCode: data.occupationCode,
          ...(ocupations && {
            companyType: data.companyType,
            companyName: data.companyName,
            companyPosition: data.companyPosition,
          }),
        },
      },
    };

    setLoadingScreen(true);

    customApi
      .put('/onboarding/consultantdata', requestFormData)
      .then(() => {
        updateFormState('ONB_PHASES_CONSULT_DATA', requestFormData.request);
        inc();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    const fetchOccupationsCatalg = async () => {
      customApi
        .post('/catalogs/search', { catalogCode: 'OCCUPATIONS_CATALOG' })
        .then((response) => {
          updateCatalog(
            'occupationCatalog',
            response.data.data.data.map((occupation: { value: string; code: string }) => ({
              text: occupation.value,
              value: occupation.code,
            }))
          );
        })
        .catch((e) => {
          setModalError({ error: e });
        });
    };
    {
      occupationCatalog.length === 0 && fetchOccupationsCatalg();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardStep stepNumber="3">
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      >
        <Box sx={{ mb: { sm: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
            Queremos saber más de ti
          </Typography>
          <Box>
            {occupationCatalog.length > 0 ? (
              <InputSelect
                name="occupationCode"
                label="¿Cuál es tu ocupación?"
                disableClearable
                options={occupationCatalog}
                control={control}
              />
            ) : (
              <InputSelect name="default" label="¿Cuál es tu ocupación?" options={[]} disableClearable disabled />
            )}
            <Collapse in={ocupations} timeout={300}>
              <InputSelect
                name="companyType"
                label="Tipo de empresa"
                disableClearable
                options={[
                  { text: 'Privada', value: 'Privado' },
                  { text: 'Pública', value: 'Público' },
                ]}
                control={control}
              />
              <InputText name="companyName" label="Nombre empresa" control={control} />
              <InputText name="companyPosition" label="Cargo empresa" control={control} />
            </Collapse>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
          <Button
            variant="outlined"
            onClick={() => {
              updateStep(1);
            }}
          >
            Anterior
          </Button>
          <Button variant="contained" type="submit" disabled={loadingScreen}>
            Siguiente
          </Button>
        </Box>
      </Box>
    </CardStep>
  );
}
