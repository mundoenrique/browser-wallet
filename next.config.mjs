/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  poweredByHeader: false,
  output: 'standalone',
  images: {
    domains: ['pre1a.niubizqr.pagoefectivo.pe'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pre1a.niubizqr.pagoefectivo.pe',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
