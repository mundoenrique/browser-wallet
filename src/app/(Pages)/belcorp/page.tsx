'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { InputText } from '@/components';
import LogoGreen from '%/images/LogoGreen';

export default function Belcorp() {
  const theme = useTheme();
  const { replace } = useRouter();
  const [disabled, setDisabled] = useState(true);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { consultantCode: '', countryCode: '' },
  });

  const consultantFields = watch('consultantCode');
  const countryFields = watch('countryCode');

  useEffect(() => {
    if (consultantFields !== '' && countryFields !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [consultantFields, countryFields]);

  const onSubmit = async (dataUser: any) => {
    const { consultantCode, countryCode } = dataUser;
    // const response = await fetch(`/api/v1/setcode/?consultantCode=${consultantCode}&countryCode=${countryCode}`);
    // const { data } = await response.json();
    // replace(data);
    replace(`/identify/?consultantCode=${consultantCode}&countryCode=${countryCode}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: { xs: '1 0 0', sm: 0 },
        justifyContent: 'space-between',
        width: 320,
        zIndex: 1,
        margin: { xs: 'initial', sm: 'auto' },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3, mt: { xs: 4, sm: 'auto' } }}>
        <Box mb={3}>
          <LogoGreen />
        </Box>

        <Box>
          <InputText name="consultantCode" control={control} label="Código de la consultora" colorText="white" />
          <InputText name="countryCode" control={control} label="País" colorText="white" />
        </Box>
      </Box>

      <Button
        variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'contained' : 'secondary'}
        sx={{ mb: '10%' }}
        type="submit"
        disabled={disabled}
        fullWidth
      >
        Enviar
      </Button>
    </Box>
  );
}
