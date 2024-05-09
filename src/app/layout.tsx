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

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="es">
      <GoogleTagManager gtmId="GTM-M8QMC8" />
      <body>
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
