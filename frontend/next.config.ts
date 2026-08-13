import type { NextConfig } from "next";

const apiTarget = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4080";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['98.88.37.44', 'localhost', '127.0.0.1'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiTarget}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${apiTarget}/health`,
      },
      {
        source: '/count',
        destination: `${apiTarget}/count`,
      },
    ];
  },
};

export default nextConfig;