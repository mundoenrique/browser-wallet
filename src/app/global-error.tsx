'use client';
import { Typography, Button } from '@mui/material';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <Typography variant="h2">{error.message}</Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
}
