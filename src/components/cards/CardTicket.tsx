'use client';

import { Avatar, Button, Card } from '@mui/material';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Card used to display the generated result
 *
 * @param children - Child elements.
 * @param avatarImage - Confirm and receive the image link.
 * @param avatarText - Receive a text when you do not receive the image.
 * @param textBotton - Button text when in ticket form .
 * @param ticket - Activate the design in ticket form.
 * @param actionTicket - action handling for ticket button.
 */
export default function CardTicket(props: CardTicketProps) {
  const { children, avatarImage, avatarText, textBotton, ticket, actionTicket } = props;

  return (
    <>
      <Avatar
        sx={{
          bgcolor: fuchsiaBlue[50],
          position: 'absolute',
          top: '15px',
          left: '127px',
          zIndex: 2,
          width: 65,
          height: 51,
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
      <Card
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: 'shape.borderRadius',
          display: 'flex',
          justifyContent: 'space-between',
          pt: 7,
          px: 2,
          pb: 3 / 2,
          mb: ticket ? 0 : 3 / 2,
          mask: ticket ? 'radial-gradient(15px at 20px 100%, #0000 98%, #000) -20px' : 'none',
        }}
      >
        {children}
      </Card>

      {ticket && (
        <Card
          sx={{
            bgcolor: fuchsiaBlue[50],
            borderRadius: 'shape.borderRadius',
            borderTop: `2px dashed ${fuchsiaBlue[800]}`,
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            py: 3,
            mb: 3 / 2,
            mask: 'radial-gradient(15px at 20px 0, #0000 98%, #000) -20px',
          }}
        >
          <Button variant="contained" fullWidth onClick={actionTicket}>
            {textBotton}
          </Button>
        </Card>
      )}
    </>
  );
}
