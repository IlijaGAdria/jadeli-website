import { NextResponse, type NextRequest } from 'next/server';

import {
  COUNTRY_TO_CURRENCY,
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
} from './lib/currency';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(CURRENCY_COOKIE)) {
    const country = request.headers.get('x-vercel-ip-country') ?? '';
    const currency = COUNTRY_TO_CURRENCY[country] ?? DEFAULT_CURRENCY;
    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)'],
};
