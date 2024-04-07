'use client';

import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
// Internal App
import { LoginLayout } from '@/components';
import { WebApi } from '@/hooks/useWebApi';

export default function TestPage() {
  const apiGee = WebApi();
  const handValidate = async () => {
    try {
      const response = await apiGee.get('/validate?consultantCode=000001252&countryCode=PE');
      console.log('response-page', response.data);
    } catch (error) {
      console.error('Error generating card info:', error);
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
      </Box>
    </LoginLayout>
  );
}
