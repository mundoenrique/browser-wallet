'use client';

//Internal app
import { Success, Error, Debt } from './partial';
import { useDebStore } from '@/store';

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
