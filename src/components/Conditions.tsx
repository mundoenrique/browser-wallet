import { Typography } from '@mui/material';

/**
 *
 * Component used to display the conditions of service and as a webview in the mobile application
 */
export default function Conditions() {
  return (
    <>
      <Typography variant="h6" align="left" sx={{ mb: 3 }}>
        Condiciones de contrato de dinero electónico.
      </Typography>
      <Typography textAlign={'left'} variant="body2" sx={{ mb: 3 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
      <Typography variant="h6" align="left" sx={{ mb: 3 }}>
        Lorem ipsum dolor sit amet
      </Typography>
      <Typography textAlign={'left'} variant="body2" sx={{ mb: 3 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Typography>
    </>
  );
}
