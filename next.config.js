/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: ['bridgee.lon1.digitaloceanspaces.com'],
  },
};

module.exports = nextConfig;
