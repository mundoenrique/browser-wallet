import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { HydrationProvider, JWTProvider, MuiProvider, RSAKeyPairProvider } from './Providers';

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
      <body>
        <MuiProvider>
          <HydrationProvider>
            <RSAKeyPairProvider>
              <JWTProvider>{children}</JWTProvider>
            </RSAKeyPairProvider>
          </HydrationProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
