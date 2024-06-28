/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  images: {
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
