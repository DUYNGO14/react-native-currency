/** @type {import('jest').Config} */
module.exports = {
    projects: [
        {
            displayName: 'utils',
            testMatch: ['<rootDir>/__tests__/lib/**/*.test.ts'],
            testEnvironment: 'node',
            transform: {
                '^.+\\.[jt]sx?$': 'babel-jest',
            },
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/$1',
            },
            transformIgnorePatterns: [
                '/node_modules/(?!(dayjs)/)',
            ],
        },
        {
            displayName: 'components',
            preset: 'jest-expo',
            testMatch: ['<rootDir>/__tests__/components/**/*.test.tsx'],
            transformIgnorePatterns: [
                '/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|nativewind|clsx|dayjs)',
            ],
            moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/$1',
                '^expo/src/winter$': '<rootDir>/__mocks__/expoWinterRuntime.js',
                '^expo/src/winter/runtime$': '<rootDir>/__mocks__/expoWinterRuntime.js',
                '^expo/src/winter/runtime\\.native$': '<rootDir>/__mocks__/expoWinterRuntime.js',
            },
        },
    ],
};