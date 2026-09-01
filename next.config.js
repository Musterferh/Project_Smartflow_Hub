/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable persistent disk caching in development to permanently eliminate stale Webpack chunk errors (e.g. Cannot find module './682.js')
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
