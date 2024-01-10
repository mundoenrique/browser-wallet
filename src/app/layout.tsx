import { Metadata } from 'next';
//Internal app
import { RootLayoutProps } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Indigo',
      default: 'Indigo',
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
