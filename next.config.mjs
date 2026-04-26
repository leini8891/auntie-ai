/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GLM API responses can take 8-15s; let edge functions wait
  experimental: {},
};

export default nextConfig;
