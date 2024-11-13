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
 * @param fontSize - Font size.
 * @param iconSize - Object with height and width for the icon.
 * @param onClick - Handle action.
 * @param adormentStart - Show the icon at the beginning of the element.
 * @param adormentEnd - Show the icon at the end of the element.
 */
export default function Linking(props: Readonly<LinkingProps>): JSX.Element {
  const {
    href,
    mb = 4,
    label,
    color,
    underline,
    hidenArrow,
    fontSize = 12,
    iconSize = { height: 14, width: 14 },
    onClick,
    adormentStart,
    adormentEnd,
  } = props;

  return (
    <LinkMui
      component={Link}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: underline ? 'underline' : 'none',
        color: color ?? 'primary.main',
      }}
      mb={mb}
      fontWeight={700}
      fontSize={fontSize}
      onClick={onClick}
      replace
    >
      {!hidenArrow && adormentStart && <Arrow sx={{ mr: 2, width: iconSize.width, height: iconSize.height }} />}
      {label}
      {!hidenArrow && adormentEnd && <Arrow sx={{ ml: 2, width: iconSize.width, height: iconSize.height }} />}
    </LinkMui>
  );
}
