import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const headers = new Headers();

  if (process.env.API_KEY) {
    headers.set("Authorization", `Bearer ${process.env.API_KEY}`);
  }

  const res = await fetch(`${process.env.API_URL}/products/${slug}`, {
    headers,
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: res.status },
    );
  }

  return NextResponse.json(await res.json());
}
