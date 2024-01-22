'use client';
import Image from 'next/image';
import { Avatar, Card } from '@mui/material';

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
        px: '12px',
        pb: '12px',
        mb: '12px',
      }}
    >
      <Avatar sx={{ bgcolor: 'white', position: 'absolute', transform: 'translate(130px, -50px)' }} variant="circular">
        {avatarImage && <Image src={avatarImage.src} width={22} height={22} alt={avatarImage.alt} priority />}
        {avatarText}
      </Avatar>

      {children}
    </Card>
  );
}
