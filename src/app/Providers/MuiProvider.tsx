'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//Internal app
import { ProviderProps } from '@/interfaces';
import theme from '../../theme/theme-default';

export default function MuiProvider({ children }: ProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
