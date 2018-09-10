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
    '**/client/src/**/**/*.{js,jsx}',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/__tests__/setupTest',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/public',
    '<rootDir>/src/index.jsx',
    '<rootDir>/__tests__/__mocks__/*',
  ],
  moduleNameMapper: { '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/__mocks__/assetsTransformer.js', '\\.(css|less)$': '<rootDir>/__tests__/__mocks__/assetsTransformer.js' },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
