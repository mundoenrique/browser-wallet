import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(_req: NextApiRequest, _res: NextApiResponse) {
  return new Response('Health check ok test', {
    status: 200,
  });
}
