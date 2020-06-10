module.exports = {
  verbose: true,
  testURL: 'http://localhost',
  collectCoverage: true,
  testMatch: ['**/unit/**/*.test.js', '**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  setupFiles: ['<rootDir>/.jest/register-context.js', 'jest-canvas-mock'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@dpc-sdp*|ol|ol-ext|ol-mapbox-style|storybook-addon-vue-info|@storybook*)/)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy'
  }
}
