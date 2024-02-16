'use client';

import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { FormPassProps } from '@/interfaces';
import { InputCheck, InputPass } from '@/components';

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
  const schema = register
    ? getSchema(['newPassword', 'newPasswordConfirmation', 'policy'])
    : getSchema(['newPassword', 'newPasswordConfirmation']);

  const initialValues = register
    ? { newPassword: '', newPasswordConfirmation: '', policy: '' }
    : { newPassword: '', newPasswordConfirmation: '' };

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
            label="Acepto y declaro bajo juramento que la información proporcionada es veraz, completa y actualizada, de conformidad con la Ley 26702 y las condiciones de dinero electrónico."
            control={control}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: { xs: 3, sm: 0 } }}>{buttons}</Box>
    </Box>
  );
}
