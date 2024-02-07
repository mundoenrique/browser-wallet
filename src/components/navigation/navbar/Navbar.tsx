'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
//Internal app
import { NavbarProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Navbar(props: NavbarProps) {
  const { onClick } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { sm: 'none' },
        backgroundColor: fuchsiaBlue[200],
        boxShadow: 0,
        height: 60,
      }}
    >
      <Toolbar sx={{ minHeight: 60 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{ mr: 2, display: { sm: 'none' }, color: 'primary.main' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
