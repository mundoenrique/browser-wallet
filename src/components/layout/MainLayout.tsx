'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { useRouter } from 'next/navigation';
import { ChildrenProps } from '@/interfaces';
import Navbar from '../navigation/navbar/Navbar';
import Sidebar from '../navigation/sidebar/Sidebar';
import ModalCardBundle from '../modal/ModalCardBundle';
import { PurpleLayout, Timersession } from '@/components';
import NavbarLower from '../navigation/navbar/NavbarLower';
import { useDrawerStore, useUserStore, useAccessSessionStore } from '@/store';

/**
 * Container used in the internal views of the application
 *
 * @param children - Children elements.
 */
export default function MainLayout({ children }: ChildrenProps): JSX.Element {
  const { push } = useRouter();
  const drawerWidth = 315;

  const { drawerStatus, setDrawerStatus } = useDrawerStore();

  const accessSession = useAccessSessionStore((state) => state.accessSession);

  const { cardSolutions } = useUserStore((state) => state.user);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const [cardBundle, setCardBundle] = useState<boolean>(false);

  useEffect(() => {
    if (accessSession === false) {
      push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessSession]);

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
      {accessSession ? (
        <Box sx={{ display: 'flex' }}>
          <Timersession />
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
      ) : (
        <PurpleLayout>
          <LogoGreen />
        </PurpleLayout>
      )}

      <ModalCardBundle open={cardBundle} />
    </>
  );
}
