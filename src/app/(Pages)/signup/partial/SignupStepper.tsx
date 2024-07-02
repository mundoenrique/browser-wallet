'use client';

import { Box } from '@mui/material';
//Internal app
import { NavExternal } from '@/components';
import { sendGTMEvent } from '@next/third-parties/google';
import { useHeadersStore, useRegisterStore } from '@/store';

export default function SignupStepper(props: { currentStep: number; children: JSX.Element[] }) {
  const { currentStep, children } = props;

  const { backLink } = useHeadersStore();

  const { showHeader } = useRegisterStore();

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
          onClick={() => {
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: onboarding',
                previous_section: 'identify',
                selected_content: 'Volver a ésika Conmigo',
                destination_page: `${backLink}`,
              },
            });
          }}
        />
      )}

      {children[currentStep]}
    </Box>
  );
}
