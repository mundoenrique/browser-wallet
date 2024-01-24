'use client';

import { Box, Button, Typography } from '@mui/material';

//Internal app
import { stepperStore } from '@/store/volatileStore';

export default function SelfieInfo() {
  const { dec, inc }: any = stepperStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ marginTop: { sm: '40px' }, marginBottom: { sm: '24px' }, width: '100%' }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Ahora es momento de activar tu cuenta
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '24px' }}>
          ¿Eres una Persona Políticamente Expuesta (PEP)?
        </Typography>
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
