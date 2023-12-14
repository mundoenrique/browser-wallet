import { Metadata } from 'next';
import Script from 'next/script';
export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script src="/register.js" />
      <body>{children}</body>
    </html>
  );
}
