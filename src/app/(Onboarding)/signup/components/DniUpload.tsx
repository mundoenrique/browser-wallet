'use client';

import { Box, Button, Typography } from '@mui/material';
//Internal app
import { InputText } from '@/components';
import { useSignupStore } from '@/store/signupStore';

export default function DniUpload() {
  const { dec, inc } = useSignupStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <Typography variant="subtitle1" align="center">
          Toma una foto frontal de tu DNI
        </Typography>
        <Typography variant="subtitle2" align="center">
          Consideraciones:
        </Typography>
        <Typography variant="body2">
          Enfoca la información de tu DNI.
          <br /> Evita las sombras y usar el flash.
        </Typography>
        <Box sx={{ marginTop: '12px' }}>
          <InputText name="Adjunta tu DNI" label="Adjunta tu DNI" />
        </Box>
        <Typography variant="subtitle1" align="center">
          Toma una foto del reverso de tu DNI
        </Typography>
        <Typography variant="subtitle2" align="center">
          Consideraciones:
        </Typography>
        <Typography variant="body2">
          Enfoca la información de tu DNI.
          <br /> Evita las sombras y usar el flash.
        </Typography>
        <Box sx={{ marginTop: '12px' }}>
          <InputText name="Adjunta tu DNI" label="Adjunta tu DNI" />
        </Box>
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
