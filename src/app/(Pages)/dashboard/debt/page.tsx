'use client';

import { useEffect } from 'react';
//Internal app
import { useDebStore } from '@/store';
import { Success, Error, Debt, Congratulations } from './partial';

export default function MyDebt() {
  const { debt, view, setView } = useDebStore();

  useEffect(() => {
    if (debt.amount <= 0) {
      setView('CONGRATULATIONS');
    }
  }, [debt]); //eslint-disable-line

  const configDebtRoutes = (page: any) => {
    const routes: { [key: string]: any } = {
      DEBT: <Debt />,
      SUCCESS: <Success />,
      ERROR: <Error />,
      CONGRATULATIONS: <Congratulations />,
    };

    return routes[page] || routes['DEBT'];
  };

  return <>{configDebtRoutes(view)}</>;
}
