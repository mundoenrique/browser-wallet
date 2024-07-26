import { headers } from 'next/headers';
//Internal app
import { createRedisInstance } from '@/utils/redis';
import UserPage from '@/app/(Pages)/identify/[user]/page';
import NotFoundError from '@/components/errors/NotFoundError';

describe('UserPage', () => {
  let result: any;
  let params = { user: '051999541' };
  let headersMock = {
    get: jest.fn(),
  };
  let mockRedis = {
    getRedis: jest.fn(),
    delRedis: jest.fn(),
  };
  (createRedisInstance as jest.Mock).mockReturnValue(mockRedis);
  (headers as jest.Mock).mockReturnValue(headersMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return NotFoundError when user data is not found', async () => {
    await mockRedis.getRedis.mockResolvedValueOnce(null);
    await mockRedis.delRedis(`identify:${params.user}`)

    result = await UserPage({ params });

    expect(result.type).toBe(NotFoundError);
    expect(result.props.code).toBe(404);
    expect(mockRedis.delRedis).toHaveBeenCalledTimes(1);
  });
});
