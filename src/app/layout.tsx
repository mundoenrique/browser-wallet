import { Metadata } from 'next';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Indigo',
      default: 'Indigo',
    },
    // manifest: `/api/manifest.webmanifest`,
    description: 'La billetera digital que te ayudará a pagar, cobrar y ordenar tus finanzas.',
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        url: '',
      },
    ],
  };
}

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
