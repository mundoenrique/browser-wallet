'use client';

import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
// Internal app
import { stepperStore } from '@/store/volatileStore';
import BiometricValidation from './components/BiometricValidation';
import {
  SignupStepper,
  Landing,
  InfoVerification,
  CelularValidation,
  Ocupation,
  PEP,
  DniInfo,
  DniUpload,
  SelfieInfo,
  SelfieUpload,
} from './components';

export default function Signup() {
  const theme = useTheme();
  const { step }: any = stepperStore();

  return (
    <>
      <SignupStepper step={step}>
        {/*Step 0*/}
        <Landing />

        {/*Step 1*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 1/4
          </Typography>
          <InfoVerification />
        </Card>

        {/*Step 2*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 2/4
          </Typography>
          <CelularValidation />
        </Card>

        {/*Step 3*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 3/4
          </Typography>
          <Ocupation />
        </Card>

        {/*Step 4*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 3/4
          </Typography>
          <PEP />
        </Card>
        {/*Step 5*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 4/4
          </Typography>
          <DniInfo />
        </Card>

        {/*Step 6*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 4/4
          </Typography>
          <DniUpload />
        </Card>

        {/*Step 7*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 4/4
          </Typography>
          <SelfieInfo />
        </Card>

        {/*Step 8*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 4/4
          </Typography>
          <SelfieUpload />
        </Card>
        <BiometricValidation />
      </SignupStepper>
    </>
  );
}
