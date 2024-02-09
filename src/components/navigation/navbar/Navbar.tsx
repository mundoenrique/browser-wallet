'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppBar, IconButton, Toolbar, Link as LinkMui, Typography, Box } from '@mui/material';
//Internal app
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
      <Toolbar sx={{ minHeight: 60, justifyContent: dashboardNav ? 'flex-start' : 'space-between' }}>
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
          <LinkMui
            component={Link}
            href="#"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
            fontWeight={700}
            fontSize="12px"
          >
            <ArrowBackIosIcon sx={{ mr: 2 }} />
            Volver a ésika Conmigo
          </LinkMui>
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
