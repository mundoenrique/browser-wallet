'use client';

import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { StepperProps } from '@/interfaces';

export default function CardStep(props: StepperProps) {
  const { children, stepNumber } = props;

  const theme = useTheme();

  return (
    <Card variant="signup">
      <Typography
        variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
        align="center"
        mb={{ sm: 4 }}
      >
        Paso {stepNumber}/4
      </Typography>
      {children}
    </Card>
  );
}
