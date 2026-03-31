import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        port: '',
        pathname: '/img/harmoniq/**',
      },
    ],
  },
};

export default nextConfig;
