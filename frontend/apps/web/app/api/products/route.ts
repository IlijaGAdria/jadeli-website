import { NextResponse } from 'next/server';

export async function GET() {
  const headers = new Headers();

  if (process.env.API_KEY) {
    headers.set("Authorization", `Bearer ${process.env.API_KEY}`);
  }

  const res = await fetch(`${process.env.API_URL}/products`, {
    headers,
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
