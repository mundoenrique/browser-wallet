'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
//Internal app
import { NavbarProps } from '@/interfaces';

export default function Navbar(props: NavbarProps) {
  const { onClick } = props;
  return (
    <AppBar
      position="fixed"
      sx={{
        display: { sm: 'none' },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
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
