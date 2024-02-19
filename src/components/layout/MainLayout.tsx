'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
//Internal app
import Navbar from '../navigation/navbar/Navbar';
import { ChildrenProps } from '@/interfaces';
import Sidebar from '../navigation/sidebar/Sidebar';
import NavbarLower from '../navigation/navbar/NavbarLower';

/**
 * Container used in the internal views of the application
 *
 * @param children - Children elements.
 */
export default function MainLayout({ children }: ChildrenProps): JSX.Element {
  const drawerWidth = 315;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onClick={handleDrawerToggle} />
      <Sidebar
        open={mobileOpen}
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
