module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react-native', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    'no-shadow': ['warn', { hoist: 'never' }],
    'indent': 'off',
  },
};
