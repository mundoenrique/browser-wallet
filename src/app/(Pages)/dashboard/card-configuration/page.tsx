'use client';

import { useEffect } from 'react';

import Main from './partial/Main';

//Internal app
import { useNavTitleStore, useMenuStore, useConfigCardStore } from '@/store';
import { ActivatePhysicalCard, BlockCard, ChangePin, DeleteAccount, RequestPhysicalCard, Survey } from './partial';

export default function CardConfiguration() {
  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();
  const { page, updatePage } = useConfigCardStore();

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('card-settings');
    updatePage('main');
  }, [updateTitle, setCurrentItem, updatePage]);

  const configCardRoutes = (page: string) => {
    const routes: { [key: string]: any } = {
      main: <Main />,
      activatePhysicalCard: <ActivatePhysicalCard />,
      blockCard: <BlockCard />,
      changePin: <ChangePin />,
      requesPhysicalCard: <RequestPhysicalCard />,
      deleteAccount: <DeleteAccount />,
      survey: <Survey />,
    };
    return routes[page] || routes['main'];
  };

  return <>{configCardRoutes(page)}</>;
}
