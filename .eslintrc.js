module.exports = {
  root: true,
  ignorePatterns: ['public/**/*.js'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  plugins: ['import'],
};
