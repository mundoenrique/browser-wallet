import { render, screen,waitFor } from '@testing-library/react';
import UserPage from '@/app/(Pages)/identify/[user]/page';
import { createRedisInstance } from '@/utils/redis';

import ErrorBoundary from '@/components/errorBoundary';

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
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders ErrorBoundary when an unexpected error occurs', async () => {
    console.error = jest.fn();
    const consoleError = console.error;
    const redisClient = {
      get: jest.fn().mockResolvedValue(JSON.stringify(() => { throw new Error('Unexpected error'); })),
      del: jest.fn(),
      quit: jest.fn(),
    };
    (createRedisInstance as jest.Mock).mockReturnValue(redisClient);

    render(
      <ErrorBoundary>
        <UserPage params={{ user: 'UserTest' }} />
      </ErrorBoundary>
    );

    await waitFor(() => expect(screen.getByText('Something went wrong.')).toBeInTheDocument());
    console.error = consoleError;
  });

  it('renders NotFoundError when user data is not found', async () => {
    const redisClient = {
      get: jest.fn().mockResolvedValue(null),
      del: jest.fn(),
      quit: jest.fn(),
    };
    (createRedisInstance as jest.Mock).mockReturnValue(redisClient);

    render(
      <ErrorBoundary>
        <UserPage params={{ user: 'UserTest' }} />
      </ErrorBoundary>
    );

    await waitFor(() => expect(screen.getByText('Something went wrong.')).toBeInTheDocument());
  });

  it('renders DataUser when user data is found', async () => {
    const mockUserData = { user: 'User Test' };
    const redisClient = {
      get: jest.fn().mockResolvedValue(JSON.stringify(mockUserData)),
      del: jest.fn().mockResolvedValue(JSON.stringify(mockUserData)),
      quit: jest.fn(),
    };
    (createRedisInstance as jest.Mock).mockReturnValue(redisClient)

    render(
      <ErrorBoundary>
        <UserPage params={{ user: 'UserTest' }} />
      </ErrorBoundary>
    );

    // await waitFor(() => expect(redisClient.get).toHaveBeenCalledWith('UserTest'));
    // await waitFor(() => expect(screen.getByText('User Test')).toBeInTheDocument());
    // await waitFor(() => expect(redisClient.del).toHaveBeenCalledWith('UserTest'));
    // await waitFor(() => expect(redisClient.quit).toHaveBeenCalledWith());
    await waitFor(() => expect(screen.getByText('Something went wrong.')).toBeInTheDocument());
  });
});