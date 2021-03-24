module.exports = {
    testEnvironment: "node",
    verbose: true,
    testMatch: ["**/*.test.js"],
    transform: {
        '.js': 'jest-esm-transformer',
    },
};