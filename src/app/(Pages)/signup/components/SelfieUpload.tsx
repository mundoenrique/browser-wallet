'use client';

import { Box, Button, Typography } from '@mui/material';
//Internal app
import { InputText } from '@/components';
import { useRegisterStore } from '@/store';

export default function SelfieUpload() {
  const { dec, inc } = useRegisterStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ mb: { sm: 3 }, width: '100%' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
            Tómate una selfie
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ mb: 3 }}>
            Consideraciones:
          </Typography>
          <Typography variant="body2">
            Evita realizar gestos.
            <br />
            Usa un ambiente limpio e iluminado.
          </Typography>
        </Box>
        <InputText name="Adjunta tu selfie" label="Adjunta tu selfie" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
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
