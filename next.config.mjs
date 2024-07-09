/** @type {import('next').NextConfig} */

const nextConfig = {
  crossOrigin: 'anonymous',
  poweredByHeader: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pagoefectivo.pe',
      },
    ],
  },
};

export default nextConfig;
