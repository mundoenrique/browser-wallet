'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
//Internal app
import { ChildrenProps } from '@/interfaces';
import Navbar from '../navigation/navbar/Navbar';
import Sidebar from '../navigation/sidebar/Sidebar';
import NavbarLower from '../navigation/navbar/NavbarLower';
import { useDrawerStore } from '@/store';

/**
 * Container used in the internal views of the application
 *
 * @param children - Children elements.
 */
export default function MainLayout({ children }: ChildrenProps): JSX.Element {
  const drawerWidth = 315;

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const { drawerStatus, setDrawerStatus } = useDrawerStore();

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
  );
}
