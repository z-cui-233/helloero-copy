/* eslint-disable */
/** @type {import('next').NextConfig} */

const loadConfig = (env) => {
  console.log('env is =>', env);
  switch (env) {
    case 'prod':
      return require('./config/prod.js').default;
    case 'itstg':
      return require('./config/itstg.js').default;
    default:
      return require('./config/local.js').default;
  }
};

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: loadConfig(process.env.APP_ENV),
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
    return config;
  },
};
