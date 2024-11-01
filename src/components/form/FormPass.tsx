'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { getSchema } from '@/config';
import { useHeadersStore } from '@/store';
import { FormPassProps } from '@/interfaces';
import { Conditions, InputCheck, InputPass, ModalResponsive } from '@/components';

/**
 * Form component for password management (Change and create password)
 *
 * @param onSubmit - Function that sends the data.
 * @param description - Descriptive paragraph of the form.
 * @param buttons - Assign the necessary buttons for the form.
 * @param register - Specifies whether the form is from the registration flow.
 * @returns The JSON with the data delivered.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 */
export default function FormPass(porps: FormPassProps): JSX.Element {
  const { onSubmit, description, buttons, register } = porps;

  const host = useHeadersStore((state) => state.host);

  const [showModal, setShowModal] = useState<boolean>(false);

  const schema = register
    ? getSchema(['newPassword', 'newPasswordConfirmation', 'policy'])
    : getSchema(['newPassword', 'newPasswordConfirmation']);

  const initialValues = register
    ? { newPassword: '', newPasswordConfirmation: '', policy: false }
    : { newPassword: '', newPasswordConfirmation: '' };

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, mb: { sm: 2 } }}>
          {description}
          <InputPass
            name="newPassword"
            control={control}
            label={register ? 'Crea tu contraseña' : 'Ingresa tu contraseña'}
          />
          <InputPass name="newPasswordConfirmation" control={control} label="Confirma tu contraseña" />
          {register && (
            <InputCheck
              name="policy"
              labelHandle={
                <>
                  Acepto y declaro bajo juramento que la información proporcionada es veraz, completa y actualizada, de
                  conformidad con la Ley 29985 y{' '}
                  <Typography
                    onClick={() => setShowModal(true)}
                    component="span"
                    variant="body2"
                    sx={{ textDecoration: 'underline' }}
                  >
                    condiciones de Contrato de la cuenta de dinero electrónico.
                  </Typography>
                </>
              }
              control={control}
              onClick={() => {
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'checkbox',
                    section: 'Yiro :: onboarding :: step4 :: createPassword',
                    previous_section: 'Yiro :: onboarding :: step3 :: 3.3PEP',
                    selected_content:
                      'Acepto y declaro bajo juramento que la información proporcionada es veraz, completa y actualizada, de conformidad con la Ley 29985 y condiciones de Contrato de la cuenta de dinero electrónico.',
                    destination_page: `${host}/signup`,
                  },
                });
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: { xs: 3, sm: 0 } }}>{buttons}</Box>
      </Box>

      <ModalResponsive
        open={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        sx={{
          width: { sm: '90vw', xs: '100%' },
          maxWidth: { sm: 800, xs: '100%' },
          height: { sm: '90vh', xs: '80vh' },
          maxHeight: { sm: 600, xs: '80vh' },
        }}
      >
        <Box sx={{ height: '90%', overflow: 'auto', px: 2 }}>
          <Conditions />
        </Box>
      </ModalResponsive>
    </>
  );
}
