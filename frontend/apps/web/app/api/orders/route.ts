import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from '../../../lib/env';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${env.API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(env.API_KEY ? { Authorization: `Bearer ${env.API_KEY}` } : {}),
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
