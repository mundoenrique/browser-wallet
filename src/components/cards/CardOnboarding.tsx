'use client';

import { Card } from '@mui/material';
// Internal app
import { ChildrenProps } from '@/interfaces';

export default function CardOnboarding({ children }: ChildrenProps) {
  //const { children } = props;
  return (
    <>
      <Card
        sx={{
          bgcolor: { xs: 'transparent', sm: '#F0EDFA' },
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          minHeight: { xs: 'auto', sm: 'calc(100vh - 180px)' },
          width: { xs: 'auto', sm: 570 },
          padding: { xs: '16px', sm: '24px' },
          marginX: 'auto',
        }}
      >
        {children}
      </Card>
    </>
  );
}
