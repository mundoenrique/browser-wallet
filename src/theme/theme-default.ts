import './theme.d';
import { createTheme } from '@mui/material/styles';

const white = '#fff';

// Primary color - Tenant
const primary = '#5F3F98';

//Secondary color - Tenant
const secondary = '#E1DEF6';

//Tertiary color - Tenant
const tertiary = '#CAC3EF';

// Text color variables
const textColor = '#334155';

const success = '#99F462';
// Grayscale variables
const greyLight = '#f3f3f3';
const greyNormal = '#d3d3d3';
const greyDark = '#c4c4c4';

// Border variables
const borderRadius = 10;

export const fuchsiaBlue = {
  50: '#F7F5FD',
  100: '#F0EDFA',
  200: '#E1DEF6',
  300: '#CAC3EF',
  400: '#B0A1E4',
  500: '#947BD7',
  600: '#815EC9',
  700: '#7652B8',
  800: '#5F3F98',
  900: '#4E357D',
  950: '#312154',
};

export const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#020617',
};
export const grayscale = {
  '06': '#353434',
};

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      light: tertiary,
      dark: fuchsiaBlue[500],
    },
    success: {
      main: success,
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
    subtitle1: {
      fontFamily: 'Mulish',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontFamily: 'Mulish',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },
    subtitle3: {
      fontFamily: 'Mulish',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '16px',
      letterSpacing: '0.1px',
    },
    body2: {
      fontFamily: 'Mulish',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0.1px',
      color: textColor,
    },
    h6: {
      fontFamily: 'Montserrat',
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '28px',
      letterSpacing: '0.15px',
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

      .eye-show {
        position: absolute;
        animation: animacion-imagen 1.5s infinite alternate;
      }

      @keyframes animacion-imagen {
        0% {
          opacity: 1;
        }
        10% {
          opacity: 0;
        }
        20%{
          opacity: 1;
        }
        30%{
          opacity: 1;
        }
        40% {
          opacity: 1;
        }
        60% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 1;
        }
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
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            color: white,
            backgroundColor: primary,
            fontWeight: 700,
            '&:hover': {
              backgroundColor: primary,
              color: white,
            },
            '&.Mui-disabled': {
              backgroundColor: primary,
              opacity: 0.3,
              color: white,
            },
          },
        },
        {
          props: { variant: 'underline' },
          style: {
            color: white,
            fontWeight: 700,
            textDecoration: 'underline',
            width: '100%',
            '&:hover': { textDecoration: 'underline', background: 'transparent' },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            color: primary,
            backgroundColor: white,
            fontWeight: 700,
            width: '100%',
            '&:hover': { backgroundColor: white, color: primary },
          },
        },
      ],
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
            backgroundColor: 'initial',
            color: primary,
          },
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'signup' },
          style: {},
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'signup' },
          style: ({ theme }) => ({
            background: fuchsiaBlue[100],
            minHeight: '458px',
            width: '570px',
            padding: '0px 24px 42px 24px',
            flex: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '24px',
            alignContent: 'space-between',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            [theme.breakpoints.down('sm')]: {
              background: 'transparent',
              minHeight: '560px',
              width: 'auto',
              padding: '24px 20px 0px 20px',
              marginLeft: '0',
              marginRight: '0',
              marginBottom: '0',
              flex: 1,
              alignContent: 'start',
            },
          }),
        },
        {
          props: { variant: 'detailCard' },
          style: ({ theme }) => ({
            alignItems: 'center',
            background: 'linear-gradient(109deg, #A8F9A1 21.13%, #BC9DFA 86.79%)',
            borderRadius: borderRadius,
            border: `0.753px solid ${white}`,
            display: 'flex',
            paddingLeft: '12px',
            minHeight: '62px',
            width: '265px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 16,
            [theme.breakpoints.down('sm')]: {
              width: '244px',
            },
          }),
        },
      ],
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
        root: ({ theme }) => ({
          transform: 'none !important',
          fontSize: theme.breakpoints.down('sm') ? '14px' : '16px',
        }),
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
          '&.Mui-focused, &:hover': {
            borderColor: success,
          },
          '&.Mui-disabled': {
            backgroundColor: secondary,
          },
        },
        input: {
          borderRadius: borderRadius,
          padding: '14px 14px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: success,
          },
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
          height: '52px',
          '&:first-of-type': {
            border: 'none',
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          '& ~ span': {
            paddingLeft: 8,
          },
        },
        switchBase: {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: success,
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: '#E9E9EA',
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.3,
          },
        },
        thumb: {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginBottom: '2px',
          marginTop: '2px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '0 !important',
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'signup' },
          style: {
            height: '24px',
            backgroundColor: secondary,
            color: primary,
            fontFamily: 'Mulish',
            fontSize: '9.819px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '14.027px',
            letterSpacing: '0.281px',
            ' :hover': {
              backgroundColor: secondary,
            },
          },
        },
      ],
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            borderWidth: '1px',
            borderColor: fuchsiaBlue[400],
          },
        },
      ],
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          backgroundColor: 'transparent !important',
          '&.Mui-disabled': {
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
