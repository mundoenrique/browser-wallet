'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Link as LinkMui } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//Internal app
import logo from '%/images/yiro.svg';
import { MuiNavExternalProps } from '@/interfaces';

export default function NavExternal({ image, color, relative, closeApp }: MuiNavExternalProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: image ? 'space-between' : { xs: 'start', sm: 'end' },
        width: '100%',
        position: { xs: 'relative', sm: relative ? 'relative' : 'absolute' },
        zIndex: 1,
        top: 0,
      }}
    >
      {image && (
        <Box sx={{ mt: '41px', mb: '23px', ml: '74px', display: { xs: 'none', sm: 'block' } }}>
          <Image src={logo} width={132} height={74} alt="Yiro app" priority />
        </Box>
      )}

      <Box
        sx={{
          mt: { xs: 2, sm: image ? '52px' : 2 },
          mb: { xs: 2, sm: '52px' },
          mr: image ? '74px' : 2,
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
