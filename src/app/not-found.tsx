'use client';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const goBack = () => {
    router.back(); // Redirige a la página anterior
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
