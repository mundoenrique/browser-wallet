import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/utils/apiGeeServer';

/** GET /api/gettoken
* @param {NextRequest} request
* @returns {Promise<NextResponse>}
* @description Get token from Apigee

**/
export async function POST(request: NextRequest) {
  const tokenResponse = await getToken();
  const { access_token } = tokenResponse;
  const response = NextResponse.json({ data: access_token, status: 200 });
  return response;
}
