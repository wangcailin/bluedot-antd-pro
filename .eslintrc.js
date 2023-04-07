module.exports = {
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    require.resolve('@umijs/max/eslint'),
  ],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
};
