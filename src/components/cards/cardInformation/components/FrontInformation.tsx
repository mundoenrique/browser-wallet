'use client';

import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/RemoveRedEyeOutlined';
//Internal app
import card from '%/images/cardYiro.svg';
import { FrontInformationProps } from '@/interfaces';

export default function FrontInformation(props: FrontInformationProps) {
  const { showDetails, cardNumber, balance } = props;

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
            <Button sx={{ height: 0, minWidth: 0, p: 0 }} onClick={showDetails}>
              <Visibility sx={{ pr: 1 }} />
              <Typography variant="caption" sx={{ textDecoration: 'underline', color: 'white' }}>
                Ver número
              </Typography>
            </Button>
            <Typography variant="body1" color="white" fontWeight={400} sx={{ opacity: 0.5 }}>
              {cardNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, opacity: 0.5 }}>
            <Box width={130}>
              <Typography variant="body2" color="white">
                Disponible
              </Typography>
              <Typography variant="body1" color="white" fontWeight={400} noWrap>
                S/ {balance}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
