module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/test/unit/styleMock.js',
  },
  collectCoverage: true,
  transform: {
    '^.*\\.js$': 'babel-jest',
    '^.+\\.m?js$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/**/index.js',
    '!src/main.js',
    '!src/router/**',
    '!src/assets/css/**',
  ],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  coverageReporters: ['lcov', 'html', 'text', 'text-summary'],
  coveragePathIgnorePatterns: ['src/assets'],
};
