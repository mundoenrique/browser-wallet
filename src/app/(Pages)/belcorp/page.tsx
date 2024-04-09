'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Typography, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import LogoGreen from '%/images/LogoGreen';
import { InputText, ModalResponsive } from '@/components';

export default function Belcorp() {
  const theme = useTheme();
  const { replace } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const schema = getSchema(['consultantCode', 'countryCode']);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { consultantCode: '', countryCode: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataUser: any) => {
    const { consultantCode, countryCode } = dataUser;
    const response = await fetch(`/api/v1/setcode/?consultantCode=${consultantCode}&countryCode=${countryCode}`);
    const { data } = await response.json();
    replace(data);
    // replace(`/identify/?consultantCode=${consultantCode}&countryCode=${countryCode}`);
  };

  return (
    <>
      <Box
        component="form"
        data-testid="signin-form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: { xs: '0 1 0', sm: 0 },
          justifyContent: 'space-between',
          width: 320,
          zIndex: 1,
          margin: { xs: 'initial', sm: 'auto' },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box mb={3}>
            <LogoGreen />
          </Box>

          <Box sx={{ mt: 3, textAlign: 'start' }}>
            <InputText name="consultantCode" control={control} label="Código de la consultora" colorText="white" />
          </Box>
          <Box sx={{ mt: 3, textAlign: 'start' }}>
            <InputText name="countryCode" control={control} label="País" colorText="white" />
          </Box>
        </Box>
        <Button
          variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'contained' : 'secondary'}
          sx={{ mb: '10%' }}
          type="submit"
          fullWidth
        >
          Enviar
        </Button>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography py={2} fontWeight={700}>
          Signin
        </Typography>
        <Typography textAlign="center">{errorMessage}</Typography>
      </ModalResponsive>
    </>
  );
}
