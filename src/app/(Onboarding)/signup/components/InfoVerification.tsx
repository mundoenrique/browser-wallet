'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Divider, Typography } from '@mui/material';
//internal app
import { getSchema } from '@/config';
import { stepperStore } from '@/store/volatileStore';
import { InputCheck, InputText, ModalResponsive, InputSelect } from '@/components';

const nationality = [
  { text: 'Peruana', value: 'pe' },
  { text: 'Colombiana', value: 'co' },
  { text: 'Venezolana', value: 've' },
];

//TODO: Agregar Schemas para el celular y las politicas de privacidad y la nacionalidad
//TODO: Agregar botones de la card para cada step
//BUG: No se resalta las opciones en el campo select
//TODO: Arreglar la edicion de celular/correo para cuando el cancele no le guarde los cambios
//TODO:poner el modal de los terminos
export default function InfoVerification() {
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editCelular, setEditCelular] = useState<boolean>(false);
  const schema = getSchema(['email', 'term', 'country']);
  const { inc }: any = stepperStore();

  const { handleSubmit, trigger, control } = useForm({
    defaultValues: {
      country: 'pe',
      celular: '132156456456',
      email: 'carolina123@gmail.com',
      term: '',
      privacy: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    inc();
  };

  const handleModalTerm = () => {
    console.log('Modal terminos y condiciones');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ mb: { xs: 2, sm: 5 } }}>
        <Typography variant="subtitle1">¡Hola Andrea!</Typography>
        <Typography variant="subtitle1">Empecemos verificando tu información personal</Typography>
      </Box>
      <Card sx={{ p: '8px 0px', mb: { xs: 2, sm: 5 } }}>
        <Box sx={{ px: '20px', pb: '12px' }}>
          <Typography variant="subtitle2">Andrea Rodriguez</Typography>
          <Typography variant="subtitle2">DNI: 78624555</Typography>
        </Box>
        <Divider />
        <Box sx={{ px: '20px', pt: '12px' }}>
          <InputSelect name="country" label="Nacionalidad" options={nationality} control={control} />
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            px: '20px',
            py: '12px',
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
            px: '20px',
            pt: '12px',
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
        labelHandle="Al continuar estoy aceptando los Términos y Condiciones."
        control={control}
        onClick={handleModalTerm}
      />
      <InputCheck
        name="privacy"
        label="Acepto la política de privacidad de datos y cláusula de protección de datos."
        control={control}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: { sm: 2 } }}>
        <Button variant="contained" type="submit" sx={{ width: { xs: 'auto', sm: 320 } }}>
          Continuar
        </Button>
      </Box>

      <ModalResponsive
        open={editCelular}
        handleClose={() => {
          setEditCelular(false);
        }}
      >
        <>
          <Typography variant="subtitle1" mb="12px">
            📱 Editar número de celular
          </Typography>
          <InputText name="celular" label="Ingresa tu nuevo número de celular" control={control} />
          <Button
            variant="contained"
            onClick={async () => {
              const fieldStatus: any = await trigger('celular');
              fieldStatus && setEditCelular(false);
            }}
          >
            Guardar
          </Button>
        </>
      </ModalResponsive>

      <ModalResponsive
        open={editEmail}
        handleClose={() => {
          setEditEmail(false);
        }}
      >
        <>
          <Typography variant="subtitle1" mb="12px">
            ✉️ Editar email
          </Typography>
          <InputText name="email" label="Ingresa tu nuevo email" control={control} />
          <Button
            variant="contained"
            onClick={async () => {
              const fieldStatus: any = await trigger('email');
              fieldStatus && setEditEmail(false);
            }}
          >
            Guardar
          </Button>
        </>
      </ModalResponsive>
    </Box>
  );
}
