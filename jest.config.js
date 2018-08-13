module.exports = {
  verbose: true,
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/__tests__/setupTest.js',
    '<rootDir>/__tests__/__mocks__/mockLocalStorage.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/client/src/**/*.{js,jsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/setupTest',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/components/*',
    '<rootDir>/public',
    '<rootDir>/src/',
    '<rootDir>/src/index.jsx',
    '<rootDir>/__tests__/__mocks__/*',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
