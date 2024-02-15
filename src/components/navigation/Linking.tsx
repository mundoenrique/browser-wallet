'use client';

import Link from 'next/link';
import { Link as LinkMui } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowBackIos';
//Internal app
import { LinkingProps } from '@/interfaces';

export default function Linking(props: LinkingProps) {
  const { href, mb = 4, label, color, underline, hidenArrow } = props;

  return (
    <LinkMui
      component={Link}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: underline ? 'underline' : 'none',
        color: color ? color : 'primary.main',
      }}
      mb={mb}
      fontWeight={700}
      fontSize={12}
    >
      {!hidenArrow && <Arrow sx={{ mr: 2, width: 14, height: 14 }} />}
      {label}
    </LinkMui>
  );
}
