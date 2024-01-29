'use client';

import { Box, Button, Typography } from '@mui/material';
//Internal app
import { stepperStore } from '@/store/volatileStore';
import { InputSelect, InputText } from '@/components';

export default function Ocupation() {
  const { updateStep, inc }: any = stepperStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ marginBottom: { sm: '24px' } }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Queremos saber más de ti
        </Typography>
        <InputSelect name="¿Cuál es tu ocupación?" label="¿Cuál es tu ocupación?" options={[]} />
        <InputSelect name="Tipo de empresa" label="Tipo de empresa" options={[]} />
        <InputText name="Nombre empresa" label="Nombre empresa" />
        <InputText name="Cargo empresa" label="Cargo empresa" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <Button
          variant="outlined"
          onClick={() => {
            updateStep(1);
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
