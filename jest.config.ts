import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './src/',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/__tests__/mocks/mocks.test.tsx'],
  clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^%/(.*)$': '<rootDir>/public/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/signup/*page.tsx',
    'src/app/**/signin/*page.tsx',
    'src/app/**/identify/[user]/*page.tsx',
    // 'src/app/**/password-recover/*page.tsx',
    'src/app/**/dashboard/*page.tsx',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage/junit' }]],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/mocks/',
    '<rootDir>/__tests__/tools/',
    '<rootDir>/__tests__/unit/Dashboard/change-password',
    '<rootDir>/__tests__/unit/Dashboard/clients',
    '<rootDir>/__tests__/unit/Dashboard/collect',
    '<rootDir>/__tests__/unit/Dashboard/debt',
    '<rootDir>/__tests__/unit/Dashboard/movements',
    '<rootDir>/__tests__/unit/Dashboard/transfer',
    '<rootDir>/__tests__/unit/Dashboard/help',
    '<rootDir>/__tests__/unit/Dashboard/card-configuration',
    '<rootDir>/__tests__/unit/Dashboard/legal',
    '<rootDir>/__tests__/unit/Dashboard/recharge',
    '<rootDir>/__tests__/unit/PasswordRecover',
  ],
};

export default createJestConfig(config);
