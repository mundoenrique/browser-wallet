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
      {
        protocol: 'https',
        hostname: '**.novopayment.net',
      },
    ],
  },
};

export default nextConfig;
