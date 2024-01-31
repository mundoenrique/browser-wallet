'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
//Internal app
import { useSignupStore } from '@/store/volatileStore';
import { InputSelect, InputText } from '@/components';

export default function Ocupation() {
  const { updateStep, inc }: any = useSignupStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ mb: { sm: '24px' }, display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Queremos saber más de ti
        </Typography>
        <Box>
          <InputSelect name="¿Cuál es tu ocupación?" label="¿Cuál es tu ocupación?" options={[]} />
          <InputSelect name="Tipo de empresa" label="Tipo de empresa" options={[]} />
          <InputText name="Nombre empresa" label="Nombre empresa" />
          <InputText name="Cargo empresa" label="Cargo empresa" />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
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
