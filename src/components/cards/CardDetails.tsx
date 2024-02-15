'use client';

import { Avatar, Card } from '@mui/material';
//Internal app
import { CardDetailsProps } from '@/interfaces';

export default function CardDetails(props: CardDetailsProps) {
  const { children, avatarImage, avatarText } = props;

  return (
    <Card
      sx={{
        borderRadius: 'shape.borderRadius',
        display: 'flex',
        justifyContent: 'space-between',
        pt: 4,
        px: 3 / 2,
        pb: 3 / 2,
        mb: 3 / 2,
      }}
    >
      <Avatar sx={{ bgcolor: 'white', position: 'absolute', top: '5px', left: '140px' }} variant="circular">
        {avatarImage && <img src={avatarImage.src.src} />}
        {avatarText}
      </Avatar>

      {children}
    </Card>
  );
}
