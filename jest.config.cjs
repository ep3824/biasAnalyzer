// jest.config.js
module.exports = {
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testEnvironment: 'node',
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'], // Adjust the path as necessary
}
