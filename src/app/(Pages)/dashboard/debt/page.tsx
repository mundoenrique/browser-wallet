'use client';

import { useDebStore } from '@/store';
import { Success, ErrorPage, Debt, Congratulations } from './partial';

export default function MyDebt() {
  const { view } = useDebStore();

  const configDebtRoutes = (page: any) => {
    const routes: { [key: string]: any } = {
      DEBT: <Debt />,
      SUCCESS: <Success />,
      ERROR: <ErrorPage />,
      CONGRATULATIONS: <Congratulations />,
    };

    return routes[page] || routes['DEBT'];
  };

  return <>{configDebtRoutes(view)}</>;
}
