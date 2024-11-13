'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
//Internal app
import theme from '@/theme/theme-default';
import { ChildrenProps } from '@/interfaces';

/**
 * Provider setting material ui theme
 *
 * @param children - Children element.
 */
export default function MuiProvider({ children }: Readonly<ChildrenProps>): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
