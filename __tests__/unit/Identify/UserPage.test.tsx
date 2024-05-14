import { createRedisInstance } from '@/utils/redis';
import UserPage from '@/app/(Pages)/identify/[user]/page';
import NotFoundError from '@/components/errors/NotFoundError';
import DataUser from '@/app/(Pages)/identify/[user]/partial/DataUser';

jest.mock('jose', () => {
  return {
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('@/utils/redis', () => ({
  createRedisInstance: jest.fn(),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

describe('UserPage', () => {
  let params = { user: '943cc6d1-5f89-498d-933d-badba7a78045' };
  let userData = { code: 'John Doe', country: 'PE' };
  let headersMock;

  let mockRedis = {
    get: jest.fn(),
    del: jest.fn(),
    quit: jest.fn(),
  };

  headersMock = {
    get: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return DataUser component with user data', async () => {
    (createRedisInstance as jest.Mock).mockReturnValue(mockRedis);
    mockRedis.get.mockResolvedValueOnce(JSON.stringify(userData));
    headersMock.get.mockReturnValue('http://example.com');

    const result = await UserPage({ params });

    expect(result.type).toBe(DataUser);
    expect(result.props.user).toEqual(JSON.stringify(userData));
    expect(mockRedis.get).toHaveBeenCalledWith('943cc6d1-5f89-498d-933d-badba7a78045');
    expect(mockRedis.del).toHaveBeenCalledWith('943cc6d1-5f89-498d-933d-badba7a78045');
    expect(mockRedis.quit).toHaveBeenCalled();
  });

  it('should return NotFoundError when user data is not found', async () => {
    mockRedis.get.mockResolvedValueOnce(null);

    const result = await UserPage({ params });

    expect(result.type).toBe(NotFoundError);
    expect(result.props.code).toBe(404);
    expect(mockRedis.get).toHaveBeenCalledWith('943cc6d1-5f89-498d-933d-badba7a78045');
    expect(mockRedis.del).toHaveBeenCalled();
    expect(mockRedis.quit).toHaveBeenCalled();
  });
});
