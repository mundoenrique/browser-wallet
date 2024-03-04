'use client';

import { Avatar, Card } from '@mui/material';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Card used to display the generated result
 *
 * @param children - Child elements.
 * @param avatarImage - Confirm and receive the image link.
 * @param avatarText - Receive a text when you do not receive the image.
 */
export default function CardReport(props: CardTicketProps) {
  const { children, avatarImage, avatarText } = props;

  return (
    <Card
      sx={{
        bgcolor: fuchsiaBlue[50],
        borderRadius: 'shape.borderRadius',
        display: 'flex',
        justifyContent: 'space-between',
        pt: 4,
        px: 1,
        pb: 3 / 2,
        mb: 3 / 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: fuchsiaBlue[50],
          position: 'absolute',
          top: '7px',
          left: '140px',
        }}
        variant="circular"
      >
        {avatarImage ? (
          <picture>
            <img src={avatarImage.src.src} alt="Proveedor" />
          </picture>
        ) : (
          avatarText
        )}
      </Avatar>
      {children}
    </Card>
  );
}
