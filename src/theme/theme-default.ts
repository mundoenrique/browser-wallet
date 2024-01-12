import { createTheme } from '@mui/material/styles';

const white = '#fff';
const black = '#000';

// Primary color - Tenant
const primary = '#5F3F98';

//Secondary color - Tenant
const secondary = '#E1DEF6';

//Tertiary color - Tenant
const tertiary = '#CAC3EF';

// Text color variables
const textColor = '#1E293B';

// Grayscale variables
const greyLight = '#f3f3f3';
const greyNormal = '#d3d3d3';
const greyDark = '#c4c4c4';

// Border variables
const borderRadius = 10;

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      light: tertiary,
    },
    grey: {
      50: greyLight,
      100: greyNormal,
      200: greyDark,
      300: textColor,
    },
  },
  typography: {
    fontFamily: 'Mulish',
    allVariants: {
      color: textColor,
    },
  },
  shape: {
    borderRadius: borderRadius,
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
    // Main container styles
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: secondary,
          maxWidth: 'initial !important',
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          minHeight: '100vh',
        },
      },
    },
    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          height: '52px',
          letterSpacing: 'normal',
          minWidth: '156px',
          textTransform: 'none',
          ':hover': {
            background: primary,
          },
        },
        contained: {
          background: primary,
        },
        textPrimary: {
          color: white,
          ':hover': {
            background: 'transparent',
          },
        },
        outlinedPrimary: {
          ':hover': {
            backgroundColor: primary,
            color: white,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          transform: 'none !important',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: textColor,
          backgroundColor: white,
          height: '52px',
          '& > input::placeholder': {
            color: textColor,
            opacity: 1,
          },
          '& > fieldset > legend': {
            display: 'none',
          },
          '& > fieldset': {
            top: 0,
            borderColor: tertiary,
          },
        },
        input: {
          borderRadius: borderRadius,
          padding: '14px 14px !important',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            paddingTop: 0,
            paddingBottom: 0,
          },
        },
        input: {
          padding: '7.5px 4px 7.5px 5px !important',
        },
        popupIndicatorOpen: {
          transform: 'rotate(90deg)',
        },
        option: {
          backgroundColor: 'transparent !important',
          borderTopColor: tertiary,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderWidth: '0.84px',
          borderStyle: 'solid',
          '&:first-of-type': {
            border: 'none',
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
  },
});

export default theme;
