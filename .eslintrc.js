module.exports = {
  extends: ['react-app'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
  },
};
