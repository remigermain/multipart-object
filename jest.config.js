/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  modulePaths: [
    "<rootDir>/src",
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  setupFiles: [
    "./test/mock.ts"
  ],
  // for convert import to locale directory
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1",
  }
};