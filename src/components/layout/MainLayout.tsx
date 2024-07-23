'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
//Internal app
import { useRouter } from 'next/navigation';
import { ChildrenProps } from '@/interfaces';
import Navbar from '../navigation/navbar/Navbar';
import Sidebar from '../navigation/sidebar/Sidebar';
import { useDrawerStore, useUserStore } from '@/store';
import NavbarLower from '../navigation/navbar/NavbarLower';
//Eliminar este store despues de la certificacion de inicio de sesión
import { accessSessionStore } from '@/store/accessSessionStore';
import ModalCardBundle from '../modal/ModalCardBundle';

/**
 * Container used in the internal views of the application
 *
 * @param children - Children elements.
 */
export default function MainLayout({ children }: ChildrenProps): JSX.Element {
  const { push } = useRouter();
  const drawerWidth = 315;

  //Eliminar esta logica despues de la certificacion de inicio de sesión
  const { accessSession } = accessSessionStore();

  const { drawerStatus, setDrawerStatus } = useDrawerStore();

  const { cardSolutions } = useUserStore((state) => state.user);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const [cardBundle, setCardBundle] = useState<boolean>(false);

  if (accessSession === false) {
    push('/signin');
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setDrawerStatus(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setDrawerStatus(!drawerStatus);
    }
  };

  useEffect(() => {
    if (
      cardSolutions.status?.code === '17' ||
      cardSolutions.status?.code === '41' ||
      cardSolutions.status?.code === '43'
    ) {
      setCardBundle(true);
      return;
    }
    setCardBundle(false);
  }, [cardSolutions]);

  return (
    <>
      {accessSession && (
        <Box sx={{ display: 'flex' }}>
          <Navbar onClick={handleDrawerToggle} />
          <Sidebar
            open={drawerStatus}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            drawerWidth={drawerWidth}
          />
          <Box
            component="main"
            sx={{
              display: 'grid',
              width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
              mt: { xs: '60px', md: 'auto' },
              mx: { xs: 'auto', md: 0 },
            }}
          >
            {children}
          </Box>

          <NavbarLower />
        </Box>
      )}

      <ModalCardBundle open={cardBundle} />
    </>
  );
}
