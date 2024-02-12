'use client';

import { Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import { fuchsiaBlue } from '@/theme/theme-default';
import { BackInformationProps } from '@/interfaces';

export default function BackInformation(props: BackInformationProps) {
  const { hideDetails, holder, cardNumber, expDate, cvc } = props;

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber);
    } catch (error) {
      console.error('Error al copiar texto:', error);
    }
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        background: '#F3FBF2',
        backgroundSize: 'cover',
        borderRadius: '16px',
        border: '2px solid white',
        display: 'flex',
        flexDirection: 'column',
        height: '180px',
        left: 0,
        transform: 'rotateY(180deg)',
        top: 0,
        position: 'absolute',
        width: '100%',
        py: 1,
      }}
    >
      <Stack
        divider={<Divider flexItem sx={{ bgcolor: `${fuchsiaBlue[400]}` }} variant="fullWidth" />}
        useFlexGap
        flexWrap="wrap"
        spacing={1}
        width="100%"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          <Box>
            <Typography variant="body2">Titular</Typography>
            <Typography variant="subtitle2">{holder}</Typography>
          </Box>
          <Chip variant="signup" label="Cerrar" onClick={hideDetails} />
        </Box>

        <Box px={3}>
          <Typography variant="body2">Número de tarjeta</Typography>
          <Typography variant="subtitle2" color={fuchsiaBlue[700]}>
            {cardNumber}
            <IconButton aria-label="delete" sx={{ color: fuchsiaBlue[700], py: 0 }} onClick={copyText}>
              <CopyIcons />
            </IconButton>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          <Box>
            <Typography variant="body2">Fecha vencimiento</Typography>
            <Typography variant="subtitle2">{expDate}</Typography>
          </Box>
          <Box pr={3}>
            <Typography variant="body2">CVC</Typography>
            <Typography variant="subtitle2">{cvc}</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
