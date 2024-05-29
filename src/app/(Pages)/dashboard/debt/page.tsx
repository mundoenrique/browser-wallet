'use client';

//Internal app
import { useDebStore } from '@/store';
import { Success, Error, Debt } from './partial';

export default function MyDebt() {
  const { view } = useDebStore();

  const configDebtRoutes = (page: any) => {
    const routes: { [key: string]: any } = {
      DEBT: <Debt />,
      SUCCESS: <Success />,
      ERROR: <Error title="Hola" description="Tenemos un error" onClick={() => console.log('Hola')} />,
    };

    return routes[page] || routes['DEBT'];
  };

  return <>{configDebtRoutes(view)}</>;
}
