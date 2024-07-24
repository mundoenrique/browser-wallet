jest.mock('@next/third-parties/google', () => ({
  GoogleTagManager: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
  sendGTMEvent: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));

jest.mock('@/utils/toolHelper', () => ({
  encryptForge: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
  handleMaskOtp: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
  stringAvatar: jest.fn(() => ({ plaintext: 'mocked plaintext' })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jose', () => {
  return {
    __esModule: true,
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('mui-one-time-password-input', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('@/utils/redis', () => ({
  createRedisInstance: jest.fn(),
  delRedis: jest.fn(),
  getRedis: jest.fn(),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn().mockReturnValue(new Map([['referer', 'testReferer']])),
}));

// Mock the toolHelper module
jest.mock('@/utils/toolHelper', () => ({
  ...jest.requireActual('@/utils/toolHelper'),
  setDataRedis: jest.fn().mockResolvedValue({}),
}));
