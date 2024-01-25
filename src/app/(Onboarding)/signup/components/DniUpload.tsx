'use client';

import { Box, Button, Typography } from '@mui/material';

//Internal app
import { stepperStore } from '@/store/volatileStore';
import { InputText } from '@/components';

export default function DniUpload() {
  const { dec, inc }: any = stepperStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ marginTop: { sm: '40px' }, marginBottom: { sm: '24px' }, width: '100%' }}>
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
            Toma una foto frontal de tu DNI
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ marginBottom: '24px' }}>
            Consideraciones:
          </Typography>
          <Typography variant="body2">
            Enfoca la información de tu DNI.
            <br /> Evita las sombras y usar el flash.
          </Typography>
        </Box>
        <InputText name="Adjunta tu DNI" label="Adjunta tu DNI" />
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
            Toma una foto del reverso de tu DNI
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ marginBottom: '24px' }}>
            Consideraciones:
          </Typography>
          <Typography variant="body2">
            Enfoca la información de tu DNI.
            <br /> Evita las sombras y usar el flash.
          </Typography>
        </Box>
        <InputText name="Adjunta tu DNI" label="Adjunta tu DNI" />
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
