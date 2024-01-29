'use client';

import { Box, Drawer } from '@mui/material';
//Internal app
import { SidebarProps } from '@/interfaces';
import ItemSidebarPwa from './ItemSidebarPwa';
import ItemSidebarDesktop from './ItemSidebarDesktop';

export default function Sidebar(props: SidebarProps) {
  const { drawerWidth, open, onTransitionEnd, onClose } = props;

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        open={open}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
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
            background: 'radial-gradient(41.61% 90.43% at 91.05% 2.46%, rgba(172, 255, 167, 0.60) 0%, #E1DEF6 100%)',
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
          <ItemSidebarPwa />
        </Box>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'secondary.main',
            borderRight: '1px solid #B0A1E4',
            justifyContent: ' space-between',
          },
        }}
        open
      >
        <ItemSidebarDesktop />
      </Drawer>
    </Box>
  );
}
