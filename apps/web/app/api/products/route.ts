import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`${process.env.API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
