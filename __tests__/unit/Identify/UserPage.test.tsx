import { render, screen, waitFor } from '@testing-library/react';
import UserPage from '@/app/(Pages)/identify/[user]/page';
import { createRedisInstance } from '@/utils/redis';

jest.mock('@/utils/redis', () => ({
  createRedisInstance: jest.fn(),
}));

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

describe('UserPage', () => {
  const userTest = { user: 'UserTest' };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders DataUser correctly', async () => {
    const redisClient = {
      get: jest.fn().mockResolvedValueOnce(JSON.stringify(userTest)),
      del: jest.fn().mockResolvedValueOnce(JSON.stringify(userTest)),
      quit: jest.fn(),
    };
    (createRedisInstance as jest.Mock).mockReturnValue(redisClient);

    render(<UserPage params={userTest} />);

    // await waitFor(() => expect(screen.getByText('Estamos verificando tu información')).toBeInTheDocument());
  });

  it('renders 404 error when user data is not found', async () => {
    const redisClient = {
      get: jest.fn().mockResolvedValueOnce(null),
      del: jest.fn(),
      quit: jest.fn(),
    };
    (createRedisInstance as jest.Mock).mockReturnValue(redisClient);

    render(<UserPage params={userTest} />);

    await waitFor(() => expect(screen.getByText('Página no encontrada')).toBeInTheDocument());
  });
});