'use client';
import { useEffect, useState } from 'react';

//Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//UI
import { Box, Button, Typography } from '@mui/material';

//Store
import { stepperStore } from '@/store/volatileStore';

//internal app
import { getSchema } from '@/config';
import { InputOTP } from '@/components';

const schema = getSchema(['otp']);

export default function CelularValidation() {
  const [enableNextStep, setEnableNextStep] = useState<boolean>(false);

  const { inc, dec }: any = stepperStore();

  const { handleSubmit, control, watch, trigger, getFieldState } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    inc();
  };

  const otpCode = watch('otp');
  useEffect(() => {
    (async () => {
      const fieldStatus: any = await trigger('otp');
      const fielstep = await getFieldState('otp');
      setEnableNextStep(fieldStatus && otpCode.length == 4);
    })();
  }, [watch, otpCode]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
    >
      <Box sx={{ marginTop: { sm: '40px' }, textAlign: 'center' }}>
        <InputOTP
          name="otp"
          title="Por tu seguridad validaremos tu celular"
          text="Ingresa el código de 4 dígitos que te enviamos por SMS al +51 992860290"
          length={4}
          control={control}
        ></InputOTP>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <Button
          variant="outlined"
          onClick={() => {
            dec();
          }}
        >
          Anterior
        </Button>
        <Button variant="contained" type="submit" disabled={!enableNextStep}>
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
