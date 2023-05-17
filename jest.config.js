module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    ' \\.(css|less|sass|scss)$': '<rootDir>/tests/unit/mocks/styleMock.js',
  },
  collectCoverage: true,
  transform: {
    '^.*\\.js$': 'babel-jest',
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/**/index.js',
    '!src/main.js',
    '!src/registerServiceWorker.js',
    '!src/sw.js',
    '!src/helpers/*',
    '!src/router/**',
    '!src/lang/**',
    '!src/plugins/**',
  ],
};
