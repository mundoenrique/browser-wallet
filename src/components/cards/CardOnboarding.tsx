'use client';

import { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
// Internal app
import { ChildrenProps } from '@/interfaces';
import { ModalResponsive } from '@/components';

export default function CardOnboarding({ children }: ChildrenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [openDialog, setOpenDialog] = useState(false);

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Card
      sx={{
        bgcolor: { xs: 'transparent', sm: '#F0EDFA' },
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 'auto', sm: 672 },
        justifyContent: 'space-between',
        maxWidth: 570,
        padding: '24px',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight={700} textAlign="center">
        Paso {activeStep + 1}/4
      </Typography>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 'initial' }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Modal
        </Button>
        <ModalResponsive
          open={openDialog}
          handleClose={() => {
            setOpenDialog(false);
          }}
        >
          <Typography>Modal Content</Typography>
        </ModalResponsive>
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          sx={{ display: activeStep === 0 ? 'none' : 'block' }}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Anterior
        </Button>
        <Button variant="contained" sx={{ width: activeStep === 0 ? 320 : 'initial' }} onClick={handleNext}>
          Siguiente
        </Button>
      </CardActions>
    </Card>
  );
}
