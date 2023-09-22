/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  async rewrites() {
    return [
      {
        source: '/uploads/profile-pictures/:path*',
        destination: '/api/uploads/:path*'
      }
    ]
  },
  images: {
    domains: ['localhost']
  }

}

module.exports = nextConfig
