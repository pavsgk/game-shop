module.exports = {
  'client/src/**/*.{js,jsx,ts}': [
    'eslint --fix',
    'prettier --write',
  ],
  'client/src/**/*.{css,sass,scss}': [
    'prettier --write'
  ]
}