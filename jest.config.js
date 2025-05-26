module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};