import { HandleCustomerRequest } from '@/utils/apiGeeServer';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return HandleCustomerRequest(request);
}

export async function POST(request: NextRequest) {
  return HandleCustomerRequest(request);
}

export async function PUT(request: NextRequest) {
  return HandleCustomerRequest(request);
}

export async function PATCH(request: NextRequest) {
  return HandleCustomerRequest(request);
}
