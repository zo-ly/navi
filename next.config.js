/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/quote',
        destination: 'https://apiv3.shanbay.com/weapps/dailyquote/quote/', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
