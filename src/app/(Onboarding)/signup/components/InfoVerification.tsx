'use client';

import { ReactEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Divider, Stack, Typography } from '@mui/material';
//internal app
import { getSchema } from '@/config';
import { stepperStore } from '@/store/volatileStore';
import { InputCheck, InputText, ModalResponsive, InputSelect } from '@/components';

//TODO: data de ejemplo
const nationality = [
  { text: 'Peruana', value: 'pe' },
  { text: 'Colombiana', value: 'co' },
  { text: 'Venezolana', value: 've' },
  { text: 'Ecuatoriana', value: 'ec' },
];

//TODO: Agregar Schemas para el celular y las politicas de privacidad y la nacionalidad
//TODO: Agregar botones de la card para cada step
//BUG: No se resalta las opciones en el campo select
//TODO: Arreglar la edicion de celular/correo para cuando el cancele no le guarde los cambios
//TODO:poner el modal de los terminos
export default function InfoVerification() {
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editCelular, setEditCelular] = useState<boolean>(false);
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const schema = getSchema(['email', 'term', 'country']);
  const { inc }: any = stepperStore();

  const { handleSubmit, trigger, control, setValue } = useForm({
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

  const handleModalTerm = (e: any) => {
    e.preventDefault();
    setOpenTerms(true);
  };
  const handleAcceptTerms = () => {
    setValue('term', true);
    setOpenTerms(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ marginTop: { sm: '40px' } }}>
        <Box sx={{ marginBottom: { sm: '24px' } }}>
          <Typography variant="subtitle1">¡Hola Andrea!</Typography>
          <Typography variant="subtitle1">Empecemos verificando tu información personal</Typography>
        </Box>
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
      <ModalResponsive
        open={openTerms}
        handleClose={() => {
          setOpenTerms(false);
        }}
        sx={{
          width: { sm: '90vw', xs: '100%' },
          maxWidth: { sm: '800px', xs: '100%' },
          height: { sm: '90vh', xs: '80vh' },
          maxHeight: { sm: '600px', xs: '80vh' },
        }}
      >
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          <Typography variant="h6">Términos Y condiciones</Typography>
          <Typography textAlign={'left'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet. Commodo sed egestas egestas fringilla
            phasellus faucibus scelerisque. Id porta nibh venenatis cras sed felis eget. A diam maecenas sed enim ut.
            Ullamcorper a lacus vestibulum sed arcu. Semper viverra nam libero justo laoreet sit amet cursus sit. Ac
            turpis egestas integer eget aliquet nibh. Et malesuada fames ac turpis egestas. Urna molestie at elementum
            eu facilisis sed odio morbi quis. Ac orci phasellus egestas tellus rutrum. Lorem ipsum dolor sit amet
            consectetur adipiscing elit duis. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Enim nec
            dui nunc mattis enim ut tellus elementum sagittis. Nec dui nunc mattis enim ut. Nibh nisl condimentum id
            venenatis a condimentum vitae sapien pellentesque. Vestibulum mattis ullamcorper velit sed ullamcorper
            morbi. Ultricies lacus sed turpis tincidunt id aliquet. Volutpat blandit aliquam etiam erat velit
            scelerisque in dictum non. Morbi tincidunt augue interdum velit euismod. Blandit cursus risus at ultrices mi
            tempus imperdiet nulla malesuada. Id porta nibh venenatis cras sed felis eget. Pellentesque adipiscing
            commodo elit at imperdiet dui accumsan sit amet. Eget nunc lobortis mattis aliquam faucibus purus in massa
            tempor. Mi tempus imperdiet nulla malesuada pellentesque elit. Tellus elementum sagittis vitae et leo.
            Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Semper risus in hendrerit gravida.
            In eu mi bibendum neque egestas congue quisque. Arcu vitae elementum curabitur vitae nunc. Bibendum ut
            tristique et egestas. Donec enim diam vulputate ut pharetra sit amet. Leo integer malesuada nunc vel.
            Egestas sed sed risus pretium quam vulputate dignissim suspendisse in. Hac habitasse platea dictumst
            vestibulum rhoncus est pellentesque. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere
            lorem. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Quam id leo in vitae turpis massa sed
            elementum tempus. Enim facilisis gravida neque convallis a cras semper auctor. Risus at ultrices mi tempus
            imperdiet. Tempus quam pellentesque nec nam aliquam sem et tortor. Eros in cursus turpis massa tincidunt.
            Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. A erat nam at lectus urna duis convallis
            convallis tellus. Scelerisque viverra mauris in aliquam sem fringilla ut. Non sodales neque sodales ut
            etiam. Iaculis nunc sed augue lacus viverra. Est placerat in egestas erat imperdiet sed euismod nisi. Urna
            molestie at elementum eu facilisis sed. Duis at consectetur lorem donec massa sapien faucibus et molestie.
            Id faucibus nisl tincidunt eget nullam non. Accumsan sit amet nulla facilisi morbi tempus iaculis. Eu augue
            ut lectus arcu. Sed libero enim sed faucibus turpis in eu mi. Elementum nibh tellus molestie nunc non
            blandit massa. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Ultricies
            tristique nulla aliquet enim tortor at auctor.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={handleAcceptTerms}>
              Aceptar
            </Button>
          </Stack>
        </Box>
      </ModalResponsive>
    </Box>
  );
}
