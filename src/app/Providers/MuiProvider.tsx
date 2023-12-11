'use client';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ProviderProps } from '../interfaces';
import view from '../themes/theme-default';

export default function MuiProvider({ children }: ProviderProps) {
	return (
		<ThemeProvider theme={view}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
