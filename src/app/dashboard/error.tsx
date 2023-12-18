'use client';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Typography variant="h2">Something went wrong!</Typography>
      <Button onClick={() => reset()}>Try again</Button>
    </>
  );
}
