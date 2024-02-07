'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
//Internal app
import Navbar from '../navigation/navbar/Navbar';
import { ChildrenProps } from '@/interfaces';
import Sidebar from '../navigation/sidebar/Sidebar';
import NavbarLower from '../navigation/navbar/NavbarLower';

export default function MainLayout({ children }: ChildrenProps) {
  const drawerWidth = 315;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: { xs: 9, sm: 'auto' } }}
      >
        {children}
      </Box>

      <NavbarLower />
    </Box>
  );
}
