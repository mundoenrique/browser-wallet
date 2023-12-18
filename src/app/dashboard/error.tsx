'use client';

import { Typography } from '@mui/material';

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <Typography variant="h2">{error.message}</Typography>
    </>
  );
}
