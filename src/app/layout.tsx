import { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
//Internal app
import { ChildrenProps } from '@/interfaces';
import GlobalErrorMessage from '@/components/layout/GlobalErrorMessage';
import { HydrationProvider, KeyProvider, LoadingScreen, MuiProvider } from '@/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Yiro',
      default: 'Yiro',
    },
    manifest: `/manifest.webmanifest`,
    description: 'La billetera digital que te ayudará a pagar, cobrar y ordenar tus finanzas.',
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        url: '/images/favicon.ico',
      },
    ],
  };
}

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="es">
      <GoogleTagManager gtmId="GTM-M94NWV2J" />
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M94NWV2J"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="google-tag-manager"
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <AppRouterCacheProvider>
          <MuiProvider>
            <HydrationProvider>
              <LoadingScreen />
              <GlobalErrorMessage />
              <KeyProvider>{children}</KeyProvider>
            </HydrationProvider>
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
