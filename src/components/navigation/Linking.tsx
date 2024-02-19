'use client';

import Link from 'next/link';
import { Link as LinkMui } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowBackIos';
//Internal app
import { LinkingProps } from '@/interfaces';

/**
 * Combination of MUI with Next to create link.
 *
 * @param href - Navigation route.
 * @param mb - Lower margin {@defaultValue `4 or 32px`}.
 * @param label - Link text.
 * @param color - Link color confirmation.
 * @param underline - Confirm if the link should be underlined.
 * @param hidenArrow - Hide the arrow icon.
 */
export default function Linking(props: LinkingProps): JSX.Element {
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
