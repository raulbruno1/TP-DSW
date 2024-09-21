module.exports = {
    displayName:'skillhub',
    maxWorkers: 3,
    bail:true,
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src/'],
    testMatch:['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv:['<rootDir>/src/test.ts'],
    collectCoverage:true,
    cacheDirectory: '<rootDir>/jestCache',
    coverageReporters:['text-summary', 'lcov'],
    coverageDirectory: 'coverage/mi-sitio-web',
    testPathIgnorePatterns: ['<rootDir>/cypress/'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
             },
    globals:{
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
};