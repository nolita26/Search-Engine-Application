module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/app"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};