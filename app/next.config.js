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
  webpack(config) {
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
