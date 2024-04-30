import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function EmptySlot() {
  return (
    <Box sx={{ marginX: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        ¡Estamos encantados de tenerte con nosotros!
      </Typography>
      <Typography variant="body2" color="initial">
        tu cuenta está lista para empezar a recibir transacciones. Una vez que realices algún movimiento, comenzarás a
        ver aquí un registro detallado de todas tus transacciones.
      </Typography>
    </Box>
  );
}
