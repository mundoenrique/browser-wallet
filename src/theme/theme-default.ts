import { createTheme } from '@mui/material/styles';
import { Montserrat, Mulish } from 'next/font/google';
//Internal app
import './theme.d';

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});
const mulish = Mulish({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const success = '#99F462';
const borderRadius = 10;

export const fuchsiaBlue = {
  50: '#F7F5FD',
  100: '#F0EDFA',
  200: '#E1DEF6', // Secondary color
  300: '#CAC3EF', // Tertiary color
  400: '#B0A1E4',
  500: '#947BD7',
  600: '#815EC9',
  700: '#7652B8',
  800: '#5F3F98', // Primary color
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
  700: '#334155', // Text color
  800: '#1E293B',
  900: '#0F172A',
  950: '#020617',
};

const theme = createTheme({
  palette: {
    primary: {
      main: fuchsiaBlue[800],
    },
    secondary: {
      main: fuchsiaBlue[200],
      light: fuchsiaBlue[300],
      dark: fuchsiaBlue[500],
    },
    success: {
      main: success,
    },
  },
  typography: {
    fontFamily: mulish.style.fontFamily,
    allVariants: {
      color: slate[700],
    },
    subtitle1: {
      fontFamily: mulish.style.fontFamily,
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontFamily: mulish.style.fontFamily,
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
      fontFamily: mulish.style.fontFamily,
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0.1px',
      color: slate[700],
    },
    h6: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '28px',
      letterSpacing: '0.15px',
      color: slate[700],
    },
  },
  shape: {
    borderRadius: borderRadius,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: slate[700],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      body{
        padding-right: 0 !important;
      }

      .check-circle{
        position: absolute;
        animation: circleAnimation .6s;
      }

      @keyframes circleAnimation {
        0% {
          transform: scale(0.2);
        }
        50% {
          transform: scale(1.2);
        }
        75% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1.2);
        }
      }

      .eye-show {
        position: absolute;
        animation: isotipoYiro 1.5s infinite alternate;
      }

      @keyframes isotipoYiro {
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
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: fuchsiaBlue[200],
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
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            color: 'white',
            backgroundColor: fuchsiaBlue[800],
            fontWeight: 700,
            '&:hover': {
              backgroundColor: fuchsiaBlue[800],
              color: 'white',
            },
            '&.Mui-disabled': {
              backgroundColor: fuchsiaBlue[800],
              opacity: 0.3,
              color: 'white',
            },
          },
        },
        {
          props: { variant: 'underline' },
          style: {
            color: 'white',
            fontWeight: 700,
            textDecoration: 'underline',
            width: '100%',
            '&:hover': { textDecoration: 'underline', background: 'transparent' },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            color: fuchsiaBlue[800],
            backgroundColor: 'white',
            fontWeight: 700,
            width: '100%',
            '&:hover': { backgroundColor: 'white', color: fuchsiaBlue[800] },
            '&.Mui-disabled': { backgroundColor: fuchsiaBlue[200] },
          },
        },
        {
          props: { variant: 'payment' },
          style: {
            backgroundColor: fuchsiaBlue[800],
            color: 'white',
            display: 'grid',
            fontWeight: 700,
            height: '144px',
            justifyItems: 'center',
            maxWidth: '144px',
            minWidth: 'auto',
            padding: '16px',
            width: '100%',
            '&:hover': {
              backgroundColor: fuchsiaBlue[800],
              color: 'white',
            },
          },
        },
        {
          props: { variant: 'return' },
          style: {
            backgroundColor: 'transparent',
            color: fuchsiaBlue[800],
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.1px',
            justifyContent: 'start',
            padding: '0',
            // margin: '0',
            // boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              color: fuchsiaBlue[800],
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: slate[700],
            fontWeight: 700,
            '&:hover': { backgroundColor: 'transparent' },
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
            background: fuchsiaBlue[800],
          },
        },
        contained: {
          background: fuchsiaBlue[800],
        },
        textPrimary: {
          color: 'white',
          ':hover': {
            background: 'transparent',
          },
        },
        outlinedPrimary: {
          ':hover': {
            backgroundColor: 'initial',
            color: fuchsiaBlue[800],
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
            padding: '24px 24px 42px 24px',
            flex: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '24px',
            alignContent: 'space-between',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            [theme.breakpoints.down('md')]: {
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
            border: `0.753px solid white`,
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
          color: slate[700],
          backgroundColor: 'white',
          height: '52px',
          '& > input::placeholder': {
            color: slate[700],
            opacity: 1,
          },
          '& > fieldset > legend': {
            display: 'none',
          },
          '& > fieldset': {
            top: 0,
            borderColor: fuchsiaBlue[300],
          },
          '&.Mui-focused, &:hover': {
            borderColor: success,
          },
          '&.Mui-disabled': {
            backgroundColor: fuchsiaBlue[200],
          },
          '&.Mui-error': {
            backgroundColor: '#FBE5E5',
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
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ef5350',
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
          borderTopColor: fuchsiaBlue[300],
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
            backgroundColor: fuchsiaBlue[200],
            color: fuchsiaBlue[800],
            fontFamily: mulish.style.fontFamily,
            fontSize: '9.819px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '14.027px',
            letterSpacing: '0.281px',
            ' :hover': {
              backgroundColor: fuchsiaBlue[200],
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
