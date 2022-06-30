/* eslint-disable */
/** @type {import('next').NextConfig} */

const loadConfig = (env) => {
  switch (env) {
    case 'prod':
      return require('@u-next/site_config/prod.js').default;
    case 'itstg':
      return require('@u-next/site_config/itstg.js').default;
    default:
      return require('@u-next/site_config/local.js').default;
  }
};

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: false,
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: loadConfig(process.env.APP_ENV),
  serverRuntimeConfig: {
    wabitUrl: process.env.WABIT_URL, // gqlと設定を共有するため、このURLはenvから取得
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'cleanupIDs',
                  active: true,
                },
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    config.resolve.symlinks = false;

    return config;
  },
};
