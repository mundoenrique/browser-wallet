'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Link as LinkMui, Card, CardActions, CardContent, Typography } from '@mui/material';
// Internal app
import logo from '%/images/yiro.svg';
import { ChildrenProps } from '@/interfaces';
import { GradientContainer, ModalResponsive } from '@/components';

const CardOnboarding = ({ children }: ChildrenProps) => {
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
};

const NavBarOnbording = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Box sx={{ mt: '41px', mb: '23px', ml: '74px', display: { xs: 'none', sm: 'block' } }}>
        <Image src={logo} width={132} height={74} alt="Picture of the author" />
      </Box>
      <Box sx={{ mt: { xs: 2, sm: '52px' }, mb: { xs: 2, sm: '52px' }, mr: '74px', ml: { xs: 3, sm: 0 } }}>
        <LinkMui
          component={Link}
          href="/"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center' }}
          fontWeight={700}
          fontSize={{ xs: '12px', sm: 'initial' }}
        >
          <ArrowBackIosIcon sx={{ mr: 2 }} />
          Volver a ésika Conmigo
        </LinkMui>
      </Box>
    </Box>
  );
};

export default function Onboarding() {
  return (
    <GradientContainer>
      <NavBarOnbording />
      <CardOnboarding>Contenido</CardOnboarding>
    </GradientContainer>
  );
}
