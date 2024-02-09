'use client';

import { Box, styled } from '@mui/material';

export const BodyCard = styled(Box, {
  name: 'BodyCard',
  slot: 'root',
})(({ theme }) => ({
  height: 180,
  maxWidth: '320px',
  perspective: '900px',
  perspectiveOrigin: '50% calc(50% - 18em)',
  position: 'relative',
  width: 320,
}));

export const BodyCardAction = styled(Box, {
  name: 'BodyCardAction',
  slot: 'root',
})(({ theme }) => ({
  m: 'auto',
  textAlign: 'justify',
  transition: 'all 1s cubic-bezier(0.8, -0.4, 0.2, 1.7)',
  transformStyle: 'preserve-3d',
  '&.active': {
    backgroundColor: 'transparent',
    transform: 'rotateY(180deg)',
  },
}));
