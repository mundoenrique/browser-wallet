import { createTheme } from '@mui/material/styles';

const textColor = '#FF0000';

const theme = createTheme({
	typography: {
		fontFamily: 'Mulish',
		allVariants: {
			color: textColor,
		},
	},

	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					color: textColor,
				},
			},
		},

		// Global component styles
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
				font-family: 'Mulish';
				font-style: normal;
				font-display: swap;
				font-weight: 400;
				src: local('Mulish'), local('Mulish-Regular'), url(/fonts/Mulish-Regular.ttf) format('truetype');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			}
			@font-face {
				font-family: 'Mulish';
				font-style: normal;
				font-display: swap;
				font-weight: 700;
				src: local('Mulish'), local('Mulish-Bold'), url(/fonts/Mulish-Bold.ttf) format('truetype');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			}
			@font-face {
				font-family: 'Mulish';
				font-style: normal;
				font-display: swap;
				font-weight: 500;
				src: local('Mulish'), local('Mulish-SemiBold'), url(/fonts/Mulish-SemiBold.ttf) format('truetype');
				unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
			}
			`,
		},
	},
});

export default theme;
