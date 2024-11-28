/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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
    domains: ['**.pagoefectivo.pe'],
  },
};

export default nextConfig;
