/* eslint-disable */
/** @type {import('next').NextConfig} */

const loadConfig = (env) => {
  switch (env) {
    case 'prod':
      return require('@u-next/site_config/prod.js').default;
    case 'itstg':
      return require('@u-next/site_config/itstg.js').default;
    case 'itstg2':
      return require('@u-next/site_config/itstg2.js').default;
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
    accessKeyId: process.env.ACCESSKEY_ID,
    secretAccessKey: process.env.SECRET_ACCESSKEY,
    h2ucrmAccount: process.env.H2UCRM_ACCOUNT,
    h2ucrmPassword: process.env.H2UCRM_PASSWORD,
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
