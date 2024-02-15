'use client';

import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
//Internal app
import Linking from '../Linking';
import { NavbarProps } from '@/interfaces';
import { useNavTitleStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Navbar(props: NavbarProps) {
  const { onClick } = props;
  const pathname = usePathname();
  const dashboardNav = pathname === '/dashboard';
  const { title }: any = useNavTitleStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { md: 'none' },
        backgroundColor: fuchsiaBlue[200],
        boxShadow: 0,
        height: 60,
      }}
    >
      <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{ display: { md: 'none' }, color: 'primary.main' }}
        >
          <MenuIcon />
        </IconButton>

        {dashboardNav ? (
          <Linking href="#" label="Volver a ésika Conmigo" mb={0} />
        ) : (
          <>
            <Typography variant="subtitle1" color="primary.main">
              {title}
            </Typography>

            <Box width={40} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
