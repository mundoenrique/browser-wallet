'use client';

import { useEffect } from 'react';
//Internal app
import { useNavTitleStore, useMenuStore, useConfigCardStore } from '@/store';
import {
  ActivatePhysicalCard,
  BlockCard,
  ChangePin,
  DeleteAccount,
  Main,
  RequestPhysicalCard,
  Success,
  Survey,
} from './partial';

export default function CardConfiguration() {
  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();
  const { page, updatePage } = useConfigCardStore();

  useEffect(() => {
    updateTitle('Configuración de mi tarjeta');
    setCurrentItem('card-settings');
    updatePage('main');
  }, [updateTitle, setCurrentItem, updatePage]);

  const configCardRoutes = (page: string) => {
    const routes: { [key: string]: any } = {
      main: <Main />,
      activatePhysicalCard: <ActivatePhysicalCard />,
      blockCard: <BlockCard />,
      changePin: <ChangePin />,
      requestPhysicalCard: <RequestPhysicalCard />,
      deleteAccount: <DeleteAccount />,
      survey: <Survey />,
      success: <Success />,
    };
    return routes[page] || routes['main'];
  };

  return <>{configCardRoutes(page)}</>;
}
