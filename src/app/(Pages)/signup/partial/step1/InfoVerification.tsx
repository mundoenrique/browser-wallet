'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Divider, Typography } from '@mui/material';
//internal app
import { CardStep } from '..';
import { getSchema } from '@/config';
import { useRegisterStore } from '@/store';
import { InputCheck, InputText, ModalResponsive, InputSelect, Terms } from '@/components';

//TODO: data de ejemplo
const nationality = [
  { text: 'Peruana', value: 'PE' },
  { text: 'Colombiana', value: 'CO' },
  { text: 'Venezolana', value: 'VE' },
  { text: 'Ecuatoriana', value: 'EC' },
];

//BUG: No se resalta las opciones en el campo select
//TODO:Mejorar los modales y los terminos
export default function InfoVerification() {
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editCelular, setEditCelular] = useState<boolean>(false);
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const schema = getSchema(['email', 'term', 'country']);

  const data = {
    firstName: 'Andrea',
    lastName: 'Rodriguez',
    documentType: 'DNI',
    documentNumber: '12345678',
    phoneNumber: '3002583697',
    email: 'andrea@gmail.com',
    countryCode: 'PE',
  };

  const schemaEmail = getSchema(['email']);
  const schemaCelular = getSchema(['celular']);

  const { inc, updateFormState, verificationFormState, setShowHeader } = useRegisterStore();

  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: verificationFormState || {
      country: data.countryCode,
      celular: data.phoneNumber,
      email: data.email,
      term: false,
      policy: false,
    },
    resolver: yupResolver(schema),
  });

  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    setValue: setValueEmail,
    clearErrors: clearErrorsEmail,
  } = useForm({
    defaultValues: {
      email: getValues('email'),
    },
    resolver: yupResolver(schemaEmail),
  });

  const {
    control: controlCelular,
    handleSubmit: handleSubmitCelular,
    setValue: setValueCelular,
    clearErrors: clearErrorsCelular,
  } = useForm({
    defaultValues: {
      celular: getValues('celular'),
    },
    resolver: yupResolver(schemaCelular),
  });

  const onSubmit = (data: any) => {
    updateFormState('verificationFormState', data);
    inc();
  };

  const handleModalTerm = (e: any) => {
    e.preventDefault();
    setOpenTerms(true);
  };

  const handleEditEmail = async (data: any) => {
    setValue('email', data.email);
    setEditEmail(false);
  };

  const handleEditCelular = async (data: any) => {
    setValue('celular', data.celular);
    setEditCelular(false);
  };

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <CardStep stepNumber="1">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">¡Hola {data.firstName}!</Typography>
            <Typography variant="subtitle1">Empecemos verificando tu información personal</Typography>
          </Box>

          <Card sx={{ p: '8px 0px', boxShadow: 'none', mb: 2 }}>
            <Box sx={{ px: 5 / 2, pb: 3 / 2 }}>
              <Typography variant="subtitle2">{`${data.firstName} ${data.lastName}`}</Typography>
              <Typography variant="subtitle2">
                {data.documentType}: {data.documentNumber}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ px: 5 / 2, pt: 3 / 2 }}>
              <InputSelect name="country" label="Nacionalidad" options={nationality} control={control} />
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                px: 5 / 2,
                py: 3 / 2,
              }}
            >
              <Box>
                <Typography variant="body2">Número de Celular:</Typography>
                <Typography variant="body2">{control._formValues.celular}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Chip
                  variant="signup"
                  label="Editar"
                  onClick={() => {
                    setEditCelular(true);
                  }}
                />
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                px: 5 / 2,
                pt: 3 / 2,
              }}
            >
              <Box>
                <Typography variant="body2">Email:</Typography>
                <Typography variant="body2">{control._formValues.email} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Chip
                  variant="signup"
                  label="Editar"
                  onClick={() => {
                    setEditEmail(true);
                  }}
                />
              </Box>
            </Box>
          </Card>
          <InputCheck
            name="term"
            labelHandle="Acepto Términos y Condiciones y Política de Privacidad de Datos"
            control={control}
            onClick={handleModalTerm}
          />
          <InputCheck name="policy" label="Autorizo el envío de publicidad" control={control} />
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: { xs: 'auto', sm: 320 }, mb: { xs: 3, sm: 0 }, mx: { sm: 'auto' } }}
          fullWidth
        >
          Continuar
        </Button>
      </Box>

      <ModalResponsive
        open={editCelular}
        handleClose={() => {
          clearErrorsCelular('celular');
          setValueCelular('celular', getValues('celuar'));
          setEditCelular(false);
        }}
      >
        <Box component="form" onSubmit={handleSubmitCelular(handleEditCelular)}>
          <Typography variant="subtitle1" mb="12px">
            📱 Editar número de celular
          </Typography>
          <InputText name="celular" label="Ingresa tu nuevo número de celular" control={controlCelular} />
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </ModalResponsive>

      <ModalResponsive
        open={editEmail}
        handleClose={() => {
          clearErrorsEmail('email');
          setValueEmail('email', getValues('email'));
          setEditEmail(false);
        }}
      >
        <Box component="form" onSubmit={handleSubmitEmail(handleEditEmail)}>
          <Typography variant="subtitle1" mb="12px">
            ✉️ Editar email
          </Typography>
          <InputText name="email" label="Ingresa tu nuevo email" control={controlEmail} />
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </ModalResponsive>

      <ModalResponsive
        open={openTerms}
        handleClose={() => {
          setOpenTerms(false);
        }}
        sx={{
          width: { sm: '90vw', xs: '100%' },
          maxWidth: { sm: 800, xs: '100%' },
          height: { sm: '90vh', xs: '80vh' },
          maxHeight: { sm: 600, xs: '80vh' },
        }}
      >
        <Box sx={{ height: '90%', overflow: 'auto' }}>
          <Terms />
        </Box>
      </ModalResponsive>
    </CardStep>
  );
}
