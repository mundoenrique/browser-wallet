'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//Internal app
import theme from '../../theme/theme-default';
import { ProviderProps } from '../interfaces';

export default function MuiProvider({ children }: ProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
