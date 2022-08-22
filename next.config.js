/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  rewrites: () => {
    return [
      {
        source: '/api',
        destination: 'https://randomuser.me/api',
      },
    ];
  },
};

module.exports = nextConfig;
