'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Button, Collapse, Slide, Typography } from '@mui/material';
import { useForm, useFieldArray, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { useSignupStore } from '@/store/volatileStore';
import { InputCheckCondition, InputDatePicker, InputSelect, InputText } from '@/components';
import { getSchema } from '@/config';

const options: any = [
  { text: 'Sí', value: 'true' },
  { text: 'No', value: 'false' },
];

export default function PEP() {
  const initialized = useRef(false);
  const [isPep, setIsPep] = useState(false);
  const [parents, setParents] = useState(false);

  const { dec, inc }: any = useSignupStore();

  const schema = getSchema(['pep']);

  const { control, watch } = useForm({
    defaultValues: {
      pep: '',
      participacion: '',
      parientes: '',
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parents',
  });

  const watchPep = watch('pep');
  const watchParents = watch('parientes');

  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    setIsPep(watchPep.toLowerCase() === 'true');
    setParents(watchParents.toLowerCase() === 'true');
    if (!initialized.current && watchParents.toLowerCase() === 'true') {
      append({ firstName: '', lastName: '' });
      initialized.current = true;
    }
    console.log(dirtyFields);
  }, [watchPep, watchParents]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ mb: { sm: '24px' }, display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <Typography variant="subtitle1" align="center">
          Queremos saber más de ti
        </Typography>
        <Typography variant="body2" align="center" sx={{ textDecoration: 'underline' }}>
          ¿Eres una Persona Políticamente Expuesta (PEP)?
          <br />
          ¿Trabajas en entidades gubernamentales?
        </Typography>
        <Box>
          <InputCheckCondition name="pep" options={options} control={control} />
        </Box>

        <Collapse in={isPep} timeout={300}>
          <InputText name="Cargo en la institución pública" label="Cargo en la institución pública" control={control} />
          <InputText name="Nombre de la institución" label="Nombre de la institución" control={control} />
          <InputText name="Dirección" label="Dirección" control={control} />
          <InputSelect name="Distrito" label="Distrito" options={[]} control={control} />
          <InputSelect name="Provincia" label="Provincia" options={[]} control={control} />
          <InputSelect name="Departamento" label="Departamento" options={[]} control={control} />
          <InputDatePicker name="Fecha" control={control} />

          <Typography variant="body1" align="left" sx={{ marginBottom: '24px' }}>
            ¿Posees participación, aporte o capital social igual o mayor al 25% en alguna (s) empresa (s)?
          </Typography>
          <Box
            sx={{
              '& .MuiFormGroup-root': {
                justifyContent: 'center',
              },
            }}
          >
            <InputCheckCondition name="participacion" options={options} control={control} />
          </Box>

          <Typography variant="body1" align="left" sx={{ marginBottom: '24px' }}>
            ¿Posee parientes vivos PEP hasta el segundo grado de consanguinidad (padres, hijos, hermanos y nietos) y
            segundo grado de afinidad (cónyuge o conviviente, suegros y cuñados)?
          </Typography>
          <Box
            sx={{
              '& .MuiFormGroup-root': {
                justifyContent: 'center',
              },
            }}
          >
            <InputCheckCondition name="parientes" options={options} control={control} />
          </Box>

          <Collapse in={parents} timeout={300}>
            {fields.map((item, index) => (
              <Box key={item.id}>
                <InputSelect name="Tipo de documento" label="Tipo de documento" options={[]} control={control} />
                <InputText name="Número de documento" label="Número de documento" control={control} />
                <InputText name="Nombre completo" label="Nombre completo" control={control} />
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              <Button
                variant="outlined"
                sx={{
                  width: '320px',
                }}
                onClick={() => {
                  append({ 'Tipo de documento': '', 'Número de documento': '', 'Nombre completo': '' });
                }}
              >
                Agregar parientes
              </Button>
            </Box>
          </Collapse>
        </Collapse>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
        <Button
          variant="outlined"
          onClick={() => {
            dec();
          }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            inc();
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
