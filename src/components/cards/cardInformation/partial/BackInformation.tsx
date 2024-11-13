'use client';

import CopyToClipboard from 'react-copy-to-clipboard';
import { Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import { fuchsiaBlue } from '@/theme/theme-default';
import { BackInformationProps } from '@/interfaces';

/**
 * Shows information on the back of the 3D card
 *
 * @param hideDetails - Function to hide cardholder information
 * @param holder - Owner's name.
 * @param cardNumber - Card number.
 * @param expDate - Card expiration date.
 * @param cvc - Shows the cvv2.
 */
export default function BackInformation(props: Readonly<BackInformationProps>): JSX.Element {
  const { hideDetails, holder, cardNumber, expDate, cvc } = props;

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
            <CopyToClipboard text={cardNumber}>
              <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }}>
                <CopyIcons sx={{ color: 'primary.main' }} />
              </IconButton>
            </CopyToClipboard>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
          <Box>
            <Typography variant="body2">Fecha vencimiento</Typography>
            <Typography variant="subtitle2">{expDate.substring(0, 2) + '/' + expDate.substring(2)}</Typography>
          </Box>
          <Box pr={3}>
            <Typography variant="body2">CVV</Typography>
            <Typography variant="subtitle2">{cvc}</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
