import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['34.234.66.12', 'localhost', '127.0.0.1'], // change to your IP in production
};

export default nextConfig;