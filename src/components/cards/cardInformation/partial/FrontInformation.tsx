'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
//Internal app
import card from '%/images/cardYiro.svg';
import { FrontInformationProps } from '@/interfaces';

/**
 * Displays information on the front of the 3D card.
 *
 * @param showDetails - Function to show cardholder information
 * @param cardNumber - Card number.
 * @param balance - The available account balance.
 */
export default function FrontInformation(props: Readonly<FrontInformationProps>): JSX.Element {
  const { showDetails, cardNumber, balance, cardInformationError, balanceError } = props;
  const [showBalance, setShowBalance] = useState<boolean>(false);

  return (
    <Box
      sx={{
        position: 'relative',
        top: 0,
        left: 0,
        backfaceVisibility: 'hidden',
        backgroundSize: 'cover',
        borderRadius: '16px',
      }}
    >
      <Box sx={{ position: 'absolute' }}>
        <Image src={card} width={320} height={180} alt="Tarjeta Yiro" priority />
      </Box>
      <Box sx={{ display: 'grid', position: 'relative', gap: 1, p: 2, height: 180, alignItems: 'end' }}>
        <Box>
          <Box mb={1}>
            {!cardInformationError &&
              (cardNumber ? (
                <>
                  <Button
                    sx={{ height: 0, minWidth: 0, p: 0 }}
                    onClick={() => {
                      showDetails();
                    }}
                  >
                    <Visibility sx={{ pr: 1, color: 'white' }} />
                    <Typography variant="caption" sx={{ textDecoration: 'underline', color: 'white' }}>
                      Ver número
                    </Typography>
                  </Button>
                  <Typography variant="body1" color="white" fontWeight={400} sx={{ opacity: 0.5 }}>
                    {cardNumber}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={{ opacity: 0.5 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor: 'white', width: '100px' }} />
                  </Typography>
                  <Typography variant="body1" color="white" fontWeight={400} sx={{ opacity: 0.5 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor: 'white', width: '180px' }} />
                  </Typography>
                </>
              ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box width={130}>
              {balanceError ? (
                <>
                  <Box sx={{ height: 24 }}></Box>
                  <Typography variant="body1" color="white" fontWeight={400} noWrap sx={{ opacity: 0.5 }}>
                    Sin datos
                  </Typography>
                </>
              ) : balance ? (
                <>
                  <Button
                    sx={{ height: 0, minWidth: 0, p: 0 }}
                    onClick={() => {
                      setShowBalance(!showBalance);
                    }}
                  >
                    {showBalance ? (
                      <VisibilityOff sx={{ pr: 1, color: 'white' }} />
                    ) : (
                      <Visibility sx={{ pr: 1, color: 'white' }} />
                    )}
                    <Typography variant="caption" sx={{ textDecoration: 'underline', color: 'white' }}>
                      {showBalance ? 'Ocultar saldo' : 'Mostrar saldo'}
                    </Typography>
                  </Button>
                  <Typography variant="body1" color="white" fontWeight={400} noWrap sx={{ opacity: 0.5 }}>
                    {showBalance
                      ? Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(balance as any)
                      : '******'}
                  </Typography>
                </>
              ) : (
                <Typography sx={{ opacity: 0.5 }}>
                  <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor: 'white', width: '100px' }} />
                  <Skeleton variant="text" sx={{ fontSize: '1rem', backgroundColor: 'white', width: '100px' }} />
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
