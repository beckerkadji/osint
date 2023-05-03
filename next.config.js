/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers(){
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'http://35.181.28.82:8080' "
          }
        ]
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental:{
    appDir: true
  },
  images: {
    remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "http",
          hostname: "**",
        },
    ],
    minimumCacheTTL: 15000000,
},
}

module.exports = nextConfig
