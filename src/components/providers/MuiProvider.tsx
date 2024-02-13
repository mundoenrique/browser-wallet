'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//Internal app
import theme from '@/theme/theme-default';
import { ChildrenProps } from '@/interfaces';

export default function MuiProvider({ children }: ChildrenProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
