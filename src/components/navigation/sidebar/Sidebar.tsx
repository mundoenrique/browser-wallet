'use client';

import { Box, Drawer } from '@mui/material';
//Internal app
import { SidebarProps } from '@/interfaces';
import ListSidebar from './components/ListSidebar';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Sidebar(props: SidebarProps) {
  const { drawerWidth, open, onTransitionEnd, onClose } = props;

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        open={open}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            bgcolor: 'secondary.main',
            borderRadius: '0 14px 14px 0',
          },
        }}
      >
        <Box
          sx={{
            background: `radial-gradient(41.61% 90.43% at 91.05% 2.46%, rgba(172, 255, 167, 0.60) 0%, ${fuchsiaBlue[200]} 100%)`,
            minHeight: '100vh',
            display: 'grid',
            alignContent: 'space-between',
            '&:before': {
              content: `' '`,
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url('/images/pelcas/pelcasMenu.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top',
              backgroundSize: 'contain',
            },
          }}
        >
          <ListSidebar />
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'secondary.main',
            borderRight: `1px solid ${fuchsiaBlue[400]}`,
            justifyContent: 'space-between',
          },
        }}
      >
        <ListSidebar />
      </Drawer>
    </Box>
  );
}
