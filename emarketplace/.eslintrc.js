module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: ['node_modules/*', '!.prettierrc.js', 'src/types/*'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules#
    'plugin:prettier/recommended', // Prettier plugin
    'next/core-web-vitals',
    'plugin:cypress/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-unused-vars': 'off',
    'eslint-plugin-jsx-a11y': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/display-name': 'off',
    'no-console': ['warn'],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: false,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
  },
  plugins: ['cypress'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
