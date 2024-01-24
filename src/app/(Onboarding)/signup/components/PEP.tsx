'use client';

import { Box, Button, Collapse, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { stepperStore } from '@/store/volatileStore';
import { InputCheckCondition, InputDatePicker, InputSelect, InputText } from '@/components';
import { getSchema } from '@/config';
import { useEffect, useState } from 'react';

const options: any = [
  { text: 'Sí', value: 'true' },
  { text: 'No', value: 'false' },
];

export default function PEP() {
  const [isPep, setIsPep] = useState(false);
  const [parents, setParents] = useState(false);

  const { dec, inc }: any = stepperStore();

  const schema = getSchema(['pep']);

  const { control, watch } = useForm({
    defaultValues: {
      pep: '',
      participacion: '',
      parientes: '',
    },
    resolver: yupResolver(schema),
  });

  const watchPep = watch('pep');
  const watchParents = watch('parientes');

  useEffect(() => {
    setIsPep(watchPep.toLowerCase() === 'true');
    setParents(watchParents.toLowerCase() === 'true');
  }, [watchPep, watchParents]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ marginTop: { sm: '40px' }, marginBottom: { sm: '24px' }, width: '100%' }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Queremos saber más de ti
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '24px' }}>
          ¿Eres una Persona Políticamente Expuesta (PEP)?
        </Typography>
        <Box>
          <InputCheckCondition name="pep" options={options} control={control} />
        </Box>
        {isPep && (
          <>
            <InputText name="Cargo en la institución pública" label="Cargo en la institución pública" />
            <InputText name="Nombre de la institución" label="Nombre de la institución" />
            <InputText name="Dirección" label="Dirección" />
            <InputSelect name="Distrito" label="Distrito" options={[]} />
            <InputSelect name="Provincia" label="Provincia" options={[]} />
            <InputSelect name="Departamento" label="Departamento" options={[]} />
            <InputDatePicker name="Fecha" />

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
            {parents && (
              <>
                <InputSelect name="Tipo de documento" label="Tipo de documento" options={[]} />
                <InputText name="Número de documento" label="Número de documento" />
                <InputText name="Nombre completo" label="Nombre completo" />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dec();
                    }}
                    sx={{
                      width: '320px',
                    }}
                  >
                    Agregar parientes
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
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
