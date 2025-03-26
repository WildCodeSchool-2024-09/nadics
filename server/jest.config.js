/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"], // This ensures .env is loaded
  testTimeout: 30000, // Increase timeout for tests
};
