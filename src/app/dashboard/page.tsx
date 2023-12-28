'use client';

import { Suspense } from 'react';
import Loading from './loading';

export default function Dashboard() {
  return <Suspense fallback={<Loading />} />;
}
