/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.builder.io"],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
