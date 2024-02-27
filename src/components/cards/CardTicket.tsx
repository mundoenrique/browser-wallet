'use client';

import { Avatar, Button, Card } from '@mui/material';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';
import CheckCircleIcon from '%/images/arts/CheckCircleIcon';

/**
 * Card used to display the generated result
 *
 * @param children - Child elements.
 * @param textBotton - Button text when in ticket form .
 * @param actionTicket - action handling for ticket button.
 */
export default function CardTicket(props: CardTicketProps) {
  const { children, textBotton, actionTicket } = props;

  return (
    <>
      <Avatar
        sx={{
          bgcolor: fuchsiaBlue[50],
          position: 'absolute',
          top: '19px',
          left: '127px',
          zIndex: 2,
          width: 67,
          height: 67,
        }}
        variant="circular"
      >
        <CheckCircleIcon />
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
          mask: 'radial-gradient(15px at 20px 100%, #0000 98%, #000) -20px',
        }}
      >
        {children}
      </Card>
      <Card
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: 'shape.borderRadius',
          borderTop: `2px dashed ${fuchsiaBlue[800]}`,
          borderTopWidth: '1px',
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
    </>
  );
}
