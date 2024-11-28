'use client';

import { Box } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { NavExternal } from '@/components';
import { sendGTMEvent } from '@next/third-parties/google';
import { useHeadersStore, useKeyStore, useRegisterStore } from '@/store';

export default function SignupStepper(props: Readonly<{ currentStep: number; children: JSX.Element[] }>) {
  const { currentStep, children } = props;

  const { backLink } = useHeadersStore();

  const { showHeader } = useRegisterStore();

  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);

  let section = '';
  let previous = 'identify';
  if (currentStep > 0) {
    section = `::step${currentStep}`;
    previous = `::step${currentStep - 1}`;
  } else if (currentStep === 3) {
    section = '::step3::3.2consultora';
    previous = '::step2';
  } else if (currentStep === 4) {
    section = '::step3::3.3PEP';
    previous = '::step3::3.2consultora';
  }

  const closeSession = async () => {
    sessionStorage.clear();
    localStorage.clear();
    await api.delete('/redis', { data: { jwePublicKey, delParam: 'jwt', removeRedis: true } });

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: `Yiro :: onboarding${section}`,
        previous_section: previous,
        selected_content: 'Volver a Somos Belcorp',
        destination_page: `${backLink}`,
      },
    });

    setTimeout(() => {
      window.open(backLink != '' ? backLink : (process.env.NEXT_PUBLIC_ALLOW_ORIGIN as string), '_self');
    }, 1000);
  };

  return (
    <Box
      sx={{
        background:
          currentStep > 0 ? 'none' : 'linear-gradient(35deg, rgba(146,218,142,0) 45%, rgba(172,255,167,0.6) 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {showHeader && (
        <NavExternal
          image
          closeApp
          onClick={ closeSession }
        />
      )}

      {children[currentStep]}
    </Box>
  );
}
