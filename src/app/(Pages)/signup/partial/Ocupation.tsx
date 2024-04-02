'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Collapse, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore } from '@/store';
import { InputSelect, InputText } from '@/components';

export default function Ocupation() {
  const [ocupations, setOcupations] = useState<boolean>(false);
  const { updateStep, inc, updateFormState, ONB_PHASES_CONSULT_DATA, onboardingUuid } = useRegisterStore();
  const { setLoadingScreen, loadingScreen } = useUiStore();
  const schema = ocupations
    ? getSchema(['occupationUuid', 'enterpriseType', 'companyName', 'companyPosition'])
    : getSchema(['ocupation']);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    defaultValues: ONB_PHASES_CONSULT_DATA
      ? ONB_PHASES_CONSULT_DATA.consultant
      : {
          occupationUuid: '',
          enterpriseType: '',
          companyName: '',
          companyPosition: '',
        },
    resolver: yupResolver(schema),
  });

  const personOcupation = watch('ocupation');

  useEffect(() => {
    if (personOcupation === 'pi') {
      setOcupations(false);
      reset({
        ...getValues(),
        enterpriseType: 'prv',
        enterprises: '',
        position: '',
      });
    } else {
      setOcupations(true);
    }
  }, [getValues, personOcupation, reset]);

  const onSubmit = async (data: any) => {
    updateFormState('ONB_PHASES_CONSULT_DATA', data);

    const requestData = {
      currentPhaseCode: 'ONB_PHASES_CONSULT_DATA',
      onboardingUuid: onboardingUuid,
      request: {
        consultant: { ...data },
      },
    };
    const requestOptions = { method: 'PUT', body: JSON.stringify(requestData) };

    setLoadingScreen(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    await fetch('/api/v1/onboarding/consultantdata', requestOptions).then(() => {
      setLoadingScreen(false);
      inc();
    });
  };

  return (
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
          <InputSelect
            name="occupationUuid"
            label="¿Cuál es tu ocupación?"
            options={[
              { text: 'Consultora de belleza independiente', value: 'pi' },
              { text: 'Doctor', value: 'doc' },
              { text: 'Contador', value: 'cont' },
            ]}
            control={control}
          />
          <Collapse in={ocupations} timeout={300}>
            <InputSelect
              name="enterpriseType"
              label="Tipo de empresa"
              options={[
                { text: 'Privada', value: 'prv' },
                { text: 'Publica', value: 'pbc' },
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
  );
}
