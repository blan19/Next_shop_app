// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
