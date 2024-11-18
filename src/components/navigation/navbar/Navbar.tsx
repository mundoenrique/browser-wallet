'use client';

import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import { sendGTMEvent } from '@next/third-parties/google';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
//Internal app
import Linking from '../Linking';
import { NavbarProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useHeadersStore, useNavTitleStore } from '@/store';

/**
 * Top bar used in responsive to show menu and titles.
 *
 * @param onClick - Function that receives the action of opening or closing the "sidebar" menu.
 * @remarks
 *
 * The titles are rendered based on the current page with a useEffect and stored in a global state, this is done directly from each page.
 */
export default function Navbar(props: Readonly<NavbarProps>): JSX.Element {
  const { onClick } = props;

  const { title } = useNavTitleStore();
  const backLink = useHeadersStore((state) => state.backLink);

  const pathname = usePathname();
  const dashboardNav = pathname === '/dashboard';

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { md: 'none' },
        backgroundColor: fuchsiaBlue[200],
        boxShadow: 0,
        height: 60,
      }}
    >
      <Toolbar sx={{ minHeight: 60, justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{ display: { md: 'none' }, color: 'primary.main' }}
        >
          <MenuIcon />
        </IconButton>

        {dashboardNav ? (
          <Linking
            href={backLink}
            label="Volver a Somos Belcorp"
            mb={0}
            adormentEnd
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: Volver a Somos Belcorp :: menu_1',
                  previous_section: 'dashboard',
                  selected_content: 'menu_1 :: Volver a Somos Belcorp',
                  destination_page: `${backLink}`,
                },
              });
            }}
          />
        ) : (
          <>
            <Typography variant="subtitle1" color="primary.main">
              {title}
            </Typography>

            <Box width={40} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
