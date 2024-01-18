'use client';

import Link from 'next/link';
import Image from 'next/image';

//UI
import { Box, Link as LinkMui, Card, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//store
import { useVolatileStore } from '@/store/volatileStore';

// Internal app

import logo from '%/images/yiro.svg';

//stepper

import { OnboardingStepper, Step1, Step2 } from './components';
import { GradientContainer } from '@/components';

//main component

const CardOnboarding = (props: { title?: string; children: JSX.Element }) => {
  const { children } = props;
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
  const { step }: any = useVolatileStore();
  return (
    <>
      {step > 0 && <NavBarOnbording />}
      <OnboardingStepper step={step}>
        {/*Step 0*/}
        <GradientContainer>
          <NavBarOnbording></NavBarOnbording>
          <Typography>COntenido</Typography>
        </GradientContainer>

        {/*Step 1*/}
        <CardOnboarding>
          <Step1 />
        </CardOnboarding>

        {/*Step 2*/}
        <CardOnboarding>
          <Step2 />
        </CardOnboarding>
      </OnboardingStepper>
    </>
  );
}
