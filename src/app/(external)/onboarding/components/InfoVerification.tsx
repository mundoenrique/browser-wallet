'use client';
import { useEffect, useState } from 'react';
//UI
import { Box, Button, Card, Chip, Divider, Typography } from '@mui/material';

//form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//store
import { stepperStore } from '@/store/volatileStore';

//internal app
import { getSchema } from '@/config';
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
//TODO:poner el de los terminos
export default function InfoVerification() {
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editCelular, setEditCelular] = useState<boolean>(false);

  const { inc }: any = stepperStore();

  const schema = getSchema(['email', 'term', 'country']);

  const { handleSubmit, trigger, watch, control } = useForm({
    defaultValues: {
      country: null,
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

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ marginTop: { sm: '40px' } }}>
        <Box sx={{ marginBottom: { sm: '24px' } }}>
          <Typography variant="subtitle1">¡Hola Andrea!</Typography>
          <Typography variant="subtitle1">Empecemos verificando tu información personal</Typography>
        </Box>
        <Card sx={{ padding: '8px 0px' }}>
          <Box sx={{ paddingX: '20px', paddingBottom: '12px' }}>
            <Typography variant="subtitle2">Andrea Rodriguez</Typography>
            <Typography variant="subtitle2">DNI 78624555</Typography>
          </Box>
          <Divider />
          <Box sx={{ paddingX: '20px', paddingTop: '12px' }}>
            <InputSelect name="country" label="Nacionalidad" options={nationality} control={control}></InputSelect>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingX: '20px',
              paddingY: '12px',
            }}
          >
            <Box>
              <Typography variant="body2">Número de Celular:</Typography>
              <Typography variant="body2">{control._formValues.celular}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Chip
                variant="onboarding"
                label="Editar"
                onClick={() => {
                  setEditCelular(true);
                }}
              ></Chip>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingX: '20px',
              paddingTop: '12px',
            }}
          >
            <Box>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body2">{control._formValues.email} </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Chip
                variant="onboarding"
                label="Editar"
                onClick={() => {
                  setEditEmail(true);
                }}
              ></Chip>
            </Box>
          </Box>
        </Card>
        <InputCheck
          name="term"
          label="Al continuar estoy aceptando los Términos y Condiciones."
          control={control}
        ></InputCheck>
        <InputCheck
          name="privacy"
          label="Acepto la política de privacidad de datos y cláusula de protección de datos."
          control={control}
        ></InputCheck>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" type="submit" sx={{ width: { xs: 'auto', sm: 320 } }}>
            Continuar
          </Button>
        </Box>
      </Box>
      <ModalResponsive
        open={editCelular}
        handleClose={() => {
          setEditCelular(false);
        }}
      >
        <>
          <Typography variant="subtitle1">📱 Editar número de celular</Typography>
          <InputText name="celular" label="Ingresa tu nuevo número de celular" control={control}></InputText>
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
          <Typography variant="subtitle1">✉️ Editar email</Typography>
          <InputText name="email" label="Ingresa tu nuevo email" control={control}></InputText>
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
