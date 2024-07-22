'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Card, Divider, List, Typography, Link as LinkMui } from '@mui/material';
//Internal app
import card from '%/images/cardYiro.svg';
import ItemsSidebar from './ItemsSidebar';
import LogoPurple from '%/images/LogoPurple';
import { fuchsiaBlue } from '@/theme/theme-default';
import { LogoutAppIcons, LogoutIcons } from '%/Icons';
import ItemSecondarySidebar from './ItemSecondarySidebar';
import { useConfigCardStore, useHeadersStore } from '@/store';

//Eliminar este store despues de la certificacion de inicio de sesión
import { accessSessionStore } from '@/store/accessSessionStore';

/**
 * Complete sidebar structure.
 * @remarks
 *
 * In the sybar structure we find: The logo, primary menu elements (ItemsSidebar.tsx) and secondary menu elements (ItemSecondarySidebar.tsx)
 */
export default function ListSidebar(): JSX.Element {
  const updatePage = useConfigCardStore((state) => state.updatePage);

  const isPhysicalCard = useConfigCardStore((state) => state.isPhysicalCard);

  const cardActivationStatus = useConfigCardStore((state) => state.cardActivationStatus);

  //Eliminar este store despues de la certificacion de inicio de sesión
  const { setAccessSession } = accessSessionStore();

  const { backLink } = useHeadersStore();

  const host = useHeadersStore((state) => state.host);

  return (
    <>
      <Box
        sx={{
          width: 132,
          height: 74,
          display: { xs: 'none', md: 'block' },
          mx: 'auto',
          my: 11 / 2,
        }}
      >
        <LogoPurple />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }}>
        <LinkMui component={Link} href="/dashboard/card-configuration" sx={{ textDecoration: 'none' }}>
          {!isPhysicalCard() && (
            <Card
              variant="detailCard"
              sx={{ mt: { xs: 10, md: 'auto' }, mb: { xs: 0, md: 'auto' } }}
              onClick={() => {
                updatePage(cardActivationStatus() === 'PENDING' ? 'activatePhysicalCard' : 'requestPhysicalCard');
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section:
                      cardActivationStatus() === 'PENDING'
                        ? `Yiro :: ¿Ya activaste tu tarjeta? :: menu_1`
                        : `Yiro :: ¿Ya solicitaste tu tarjeta? :: menu_1`,
                    previous_section: 'dashboard',
                    selected_content:
                      cardActivationStatus() === 'PENDING'
                        ? 'menu_1 :: ¿Ya activaste tu tarjeta?'
                        : 'menu_1 :: ¿Ya solicitaste tu tarjeta?',
                    destination_page: `${host}/card-configuration`,
                  },
                });
              }}
            >
              <Box sx={{ mr: 3, display: 'flex', alignItems: 'center' }}>
                <Image src={card} width={70} height={44} alt="Tarjeta Yiro" priority />
              </Box>
              <Typography fontSize="14px" fontWeight={700} mr={4}>
                {cardActivationStatus() === 'PENDING' ? '¿Ya activaste tu tarjeta?' : '¿Ya solicitaste tu tarjeta?'}
              </Typography>
            </Card>
          )}
        </LinkMui>
        <ItemsSidebar />
      </Box>

      <List>
        <ItemSecondarySidebar
          href={backLink}
          text="Regresa a Somos Belcorp"
          icon={<LogoutAppIcons />}
          onClick={() => {
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: `Yiro :: Regresa a Somos Belcorp :: menu_1`,
                previous_section: 'dashboard',
                selected_content: 'menu_1 :: Regresa a Somos Belcorp',
                destination_page: `${backLink}`,
              },
            });
          }}
        />
        <Divider variant="middle" sx={{ bgcolor: `${fuchsiaBlue[400]}` }} />
        <ItemSecondarySidebar
          href="/signin"
          text="Cerrar sesión"
          icon={<LogoutIcons />}
          color
          onClick={() => {
            setAccessSession(false);
            sessionStorage.clear();
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: `Yiro :: Cerrar sesión :: menu_1`,
                previous_section: 'dashboard',
                selected_content: 'menu_1 :: Cerrar sesión',
                destination_page: `${host}/signin`,
              },
            });
          }}
        />
      </List>
    </>
  );
}
