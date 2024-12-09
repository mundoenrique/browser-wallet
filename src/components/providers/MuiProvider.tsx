'use client';

import { CssBaseline } from '@mui/material';
import { useCallback, useEffect } from 'react';
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
  const handleBeforeUnload = useCallback(async () => {
    // await axios.get('/api/v1/logout');
    console.log('Cerro sesion------------------------');
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (process.env.NEXT_PUBLIC_HANDLE_SESS === 'ON') {
        const keyRegex = /^r$/i;
        const keyEvent = keyRegex.test(event.key);
        const isF5 = event.key === 'F5';
        const isCtrlR = event.ctrlKey && keyEvent;
        const isMetaR = event.metaKey && keyEvent;

        if (isF5 || isCtrlR || isMetaR) {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        }
      }
    },
    [handleBeforeUnload]
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HANDLE_SESS === 'ON') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [handleKeyDown, handleBeforeUnload]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
