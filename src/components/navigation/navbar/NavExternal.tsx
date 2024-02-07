'use client';

import Link from 'next/link';
import { Box, Link as LinkMui } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//Internal app
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
          <LinkMui
            component={Link}
            href="/signin"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
            fontWeight={700}
            fontSize="12px"
            color={color}
          >
            <ArrowBackIosIcon sx={{ mr: 2 }} />
            Volver
          </LinkMui>
        ) : (
          <LinkMui
            component={Link}
            href="#"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
            fontWeight={700}
            fontSize="12px"
            color={color}
          >
            <ArrowBackIosIcon sx={{ mr: 2 }} />
            Volver a ésika Conmigo
          </LinkMui>
        )}
      </Box>
    </Box>
  );
}
