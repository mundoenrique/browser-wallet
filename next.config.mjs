/** @type {import('next').NextConfig} */

const nextConfig = {
  crossOrigin: 'anonymous',
  poweredByHeader: false,
  output: 'standalone',
  images: {
    domains: ['pre1a.niubizqr.pagoefectivo.pe'],
    formats: ['image/webp'],
  },
};

export default nextConfig;
