'use client';
import { Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

export default function GlobalError({ error, reset }: { error: ReactNode; reset: () => void }) {
  return (
    <html>
      <body>
        <Typography variant="h2">{error}</Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
