/** @type {import('next').NextConfig} */
const applicationConfig = require('./config/app.config')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  publicRuntimeConfig: applicationConfig,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['d1vu88wh6vye3r.cloudfront.net'],
  },
  async headers() {
    return [
      {
        source: '/api/(.*?)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "connect-src 'self' https:;img-src 'self'",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer'
          },
          {
            key: 'X-Download-Options',
            value: 'noopen'
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none'
          },
          {
            key: 'Vary',
            value: 'Origin'
          }
        ],
      },
    ]
  },
  // experimental: { appDir: true },
  webpack(config) {
    // config.experiments = { ...config.experiments, topLevelAwait: true }
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    // disable plugins
                    prefixIds: false,
                    removeViewBox: false,
                    cleanupIDs: false,
                    cleanupClasses: false,
                  },
                },
              },
            ],
          },
        },
      }]
    });
    return config;
  },
}

module.exports = nextConfig
