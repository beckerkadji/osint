/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Content-Secutity-Policy',
    value: "default-src *"
  }
]
const nextConfig = {
  async headers(){
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
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
