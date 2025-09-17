// backend/jest.backend.config.js
module.exports = {
  rootDir: '.',
  testMatch: [
    "<rootDir>/tests/**/__tests__/**/*.{js,ts}",
    "<rootDir>/tests/**/*.{spec,test}.{js,ts}",
    "<rootDir>/src/**/*.{spec,test}.{js,ts}"
  ],
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./reports/jest",
        outputName: "backend-junit.xml"
      }
    ]
  ],
  // Node transform if using ES modules/ts: add as required for your stack
};
