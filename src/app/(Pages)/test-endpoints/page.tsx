'use client';

import { LoginLayout } from '@/components';
import { useApi } from '@/hooks/useApi';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

export default function TestPage() {
  const apiGee = useApi();
  const handValidate = async () => {
    try {
      const response = await apiGee.get('/onboarding/validate?consultantCode=000001252&countryCode=PE');
      console.log('response-page', response.data);
    } catch (error) {
      throw new Error('Error in apiGee request handling: ' + (error as Error).message);
    }
  };

  const handTemrs = async () => {
    const data = {
      currentPhaseCode: 'ONB_PHASES_TERMS',
      request: {
        consultant: {
          address: 'CUZCO 144',
          consultantCode: '000001252',
          countryCode: 'PE',
          documentNumber: '0002610351',
          documentType: 'DNI',
          email: 'otra@gmail.com',
          firstName: 'AURA ESTELA',
          lastName: 'PALACIOS ZAPATA',
          phoneNumber: '977149371',
        },
        terms: [
          {
            code: 'TERM1',
          },
          {
            code: 'TERM2',
          },
        ],
      },
    };

    try {
      const response = await apiGee.post('/onboarding/termsandconditions', data);
      console.log('response-page', response.data);
    } catch (error) {
      console.error('Error generating card info:', error);
    }
  };

  const handUPdate = async () => {
    const data = {
      onboardingUuId: '59c6078b-8298-4448-b23d-ddb2111b5be9',
      currentPhaseCode: 'ONB_PHASES_CONSULT_DATA',
      request: {
        consultant: {
          occupationCode: 'SELF_EMPLOYED',
          companyType: 'Privado',
          companyName: 'cadena 2',
          companyPosition: 'cadena 3',
        },
      },
    };

    try {
      const response = await apiGee.put('/onboarding/consultantdata', data);
      console.log('consultantdata', response.data);
    } catch (error) {
      console.error('Error generating card info:', error);
    }
  };

  return (
    <LoginLayout>
      <Typography
        variant="h2"
        color="primary"
        sx={{ color: 'white', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Validar endpoints
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Button variant="secondary" type="button" fullWidth onClick={handValidate}>
          Validate Onboarding
        </Button>
        <Button variant="secondary" type="button" fullWidth onClick={handTemrs}>
          Accept Terms and Conditions
        </Button>
        <Button variant="secondary" type="button" fullWidth onClick={handUPdate}>
          Update Consultant Data
        </Button>
      </Box>
    </LoginLayout>
  );
}
