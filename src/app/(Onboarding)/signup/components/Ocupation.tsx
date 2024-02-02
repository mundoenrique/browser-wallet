'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Collapse, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputSelect, InputText } from '@/components';
import { useSignupStore } from '@/store/volatileStore';

export default function Ocupation() {
  const [ocupations, setOcupations] = useState(false);
  const { updateStep, inc }: any = useSignupStore();
  const schema = ocupations
    ? getSchema(['ocupation', 'enterpriseType', 'enterprises', 'position'])
    : getSchema(['ocupation']);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    defaultValues: {
      ocupation: 'pi',
      enterpriseType: 'prv',
      enterprises: '',
      position: '',
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

  const onSubmit = (data: any) => {
    inc();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
    >
      <Box sx={{ mb: { sm: '24px' }, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Queremos saber más de ti
        </Typography>
        <Box>
          <InputSelect
            name="ocupation"
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
            <InputText name="enterprises" label="Nombre empresa" control={control} />
            <InputText name="position" label="Cargo empresa" control={control} />
          </Collapse>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
        <Button
          variant="outlined"
          onClick={() => {
            updateStep(1);
          }}
        >
          Anterior
        </Button>
        <Button variant="contained" type="submit">
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
