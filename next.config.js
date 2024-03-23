/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    domains: [
      'images.pexels.com',
      'i0.wp.com',
      'media.licdn.com',
      'www.linkedin.com',
      'res.cloudinary.com',
    ],
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
