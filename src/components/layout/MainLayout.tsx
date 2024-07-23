'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { useRouter } from 'next/navigation';
import { ChildrenProps } from '@/interfaces';
import Navbar from '../navigation/navbar/Navbar';
import Sidebar from '../navigation/sidebar/Sidebar';
import { PurpleLayout, Timersession } from '@/components';
import NavbarLower from '../navigation/navbar/NavbarLower';
import { useDrawerStore, useAccessSessionStore } from '@/store';

/**
 * Container used in the internal views of the application
 *
 * @param children - Children elements.
 */
export default function MainLayout({ children }: ChildrenProps): JSX.Element {
  const drawerWidth = 315;

  const { drawerStatus, setDrawerStatus } = useDrawerStore();

  const accessSession = useAccessSessionStore((state) => state.accessSession);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const { push } = useRouter();

  useEffect(() => {
    if (accessSession === false) {
      push('/signin');
    }
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
    </>
  );
}
