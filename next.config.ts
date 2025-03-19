/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otakudesu.cloud',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.otakudesu.cloud',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'samehadaku.mba',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.samehadaku.mba',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig