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
    'src/app/**/belcorp/*page.tsx',
    'src/app/**/dashboard/card-configuration/*page.tsx',
    'src/app/**/dashboard/clients/*page.tsx',
    'src/app/**/dashboard/collect/*page.tsx',
    'src/app/**/dashboard/debt/*page.tsx',
    'src/app/**/dashboard/help/*page.tsx',
    'src/app/**/dashboard/help/frequent-questions/*page.tsx',
    'src/app/**/dashboard/legal/*page.tsx',
    'src/app/**/dashboard/movements/*page.tsx',
    'src/app/**/dashboard/recharge/*page.tsx',
    'src/app/**/dashboard/*page.tsx',
    'src/app/**/identify/[user]/*page.tsx',
    'src/app/**/password-recover/*page.tsx',
    'src/app/**/signin/*page.tsx',
    'src/app/**/signout/*page.tsx',
    'src/app/**/signup/*page.tsx',
    'src/app/**/conditions/*page.tsx',
    'src/app/**/questions/*page.tsx',
    'src/app/**/legal/*page.tsx',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage/junit' }]],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/mocks/',
    '<rootDir>/__tests__/tools/',
    '<rootDir>/__tests__/unit/Dashboard/change-password/',
    '<rootDir>/__tests__/unit/Dashboard/transfer/',
  ],
};

export default createJestConfig(config);
