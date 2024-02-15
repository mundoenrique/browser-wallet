'use client';

import { Box } from '@mui/material';
//Internal app
import Linking from '../Linking';
import LogoPurple from '%/images/LogoPurple';
import { MuiNavExternalProps } from '@/interfaces';

export default function NavExternal({ image, color, closeApp }: MuiNavExternalProps) {
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
          <Linking href="/signin" label="Volver" mb={0} />
        ) : (
          <Linking href="#" label="Volver a ésika Conmigo" mb={0} color={color} />
        )}
      </Box>
    </Box>
  );
}
