'use client';

import Link from 'next/link';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Typography variant="h2">Not Found</Typography>
      <Typography variant="body1">Could not find requested resource</Typography>
      <Link href="" onClick={goBack}>
        Return Home
      </Link>
    </>
  );
}
