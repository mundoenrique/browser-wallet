'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Collapse, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore, useCatalogsStore } from '@/store';
import { InputSelect, InputText } from '@/components';
import CardStep from '../CardStep';
import { useApi } from '@/hooks/useApi';

export default function Ocupation() {
  const [ocupations, setOcupations] = useState<boolean>(false);
  const { updateStep, inc, updateFormState, ONB_PHASES_CONSULT_DATA, onboardingUuId } = useRegisterStore();
  const { setLoadingScreen, loadingScreen } = useUiStore();
  const { updateCatalog, occupationCatalog } = useCatalogsStore();
  const customApi = useApi();

  const schema = ocupations
    ? getSchema(['occupationCode', 'companyType', 'companyName', 'companyPosition'])
    : getSchema(['ocupation']);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    defaultValues: {
      occupationCode: ONB_PHASES_CONSULT_DATA?.consultant?.occupationCode ?? null,
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

    console.log('ocupation request data', requestFormData);

    customApi
      .put('/onboarding/consultantdata', requestFormData)
      .then((response) => {
        console.log('ocupation form request', response);
        updateFormState('ONB_PHASES_CONSULT_DATA', requestFormData.request);
        inc();
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const getOccupationsCatalg = useCallback(async () => {
    customApi.post('/catalogs/search', { catalogCode: 'OCCUPATIONS_CATALOG' }).then((response) => {
      console.log('occupation catalog', response);
      updateCatalog(
        'occupationCatalog',
        response.data.data.data.map((occupation: { value: string; code: string }) => ({
          text: occupation.value,
          value: occupation.code,
        }))
      );
    });
  }, []); //eslint-disable-line

  useEffect(() => {
    getOccupationsCatalg();
  }, [getOccupationsCatalg]);

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
                  { text: 'Publica', value: 'Publico' },
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
