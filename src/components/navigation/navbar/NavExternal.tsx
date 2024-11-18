'use client';

import { Box } from '@mui/material';
//Internal app
import Linking from '../Linking';
import { useHeadersStore } from '@/store';
import LogoPurple from '%/images/LogoPurple';
import { MuiNavExternalProps } from '@/interfaces';

/**
 * Navigation bar used in onboarding flows.
 *
 * @param image - Confirm and display the product logo.
 * @param color - Link Text Color.
 * @param closeApp - Confirm if the link to exit the application is displayed.
 * @param onClick - Handle action.
 */
export default function NavExternal({ image, color, closeApp, onClick }: Readonly<MuiNavExternalProps>): JSX.Element {
  const { backLink } = useHeadersStore();

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: image ? 'space-between' : { xs: 'start', sm: 'end' },
        width: '100%',
        position: 'relative',
        zIndex: 1,
        top: 0,
      }}
    >
      {image && (
        <Box sx={{ mt: '41px', mb: '23px', ml: '74px', display: { xs: 'none', sm: 'block' } }}>
          <LogoPurple />
        </Box>
      )}

      <Box
        sx={{
          mt: { xs: 2, sm: image ? 0 : '52px' },
          mb: { sm: 2 },
          mr: { sm: '10px', md: '57px' },
          ml: { xs: 3, sm: 0 },
        }}
      >
        {!closeApp ? (
          <Linking href="/signin" label="Volver" mb={0} adormentStart onClick={onClick} />
        ) : (
          <Linking
            href={backLink}
            label="Volver a Somos Belcorp"
            mb={0}
            color={color}
            adormentStart
            onClick={onClick}
          />
        )}
      </Box>
    </Box>
  );
}
