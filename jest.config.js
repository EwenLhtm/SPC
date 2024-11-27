module.exports = {
    setupFilesAfterEnv: ['<rootDir>/__test__/script.test.js'],
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    testEnvironment: 'jsdom'
}