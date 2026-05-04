import { cookies } from 'next/headers';

import type { CurrencyCode } from '@case-couture/types';

import {
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  isCurrencyCode,
} from './currency';

export async function getCurrentCurrency(): Promise<CurrencyCode> {
  const store = await cookies();
  const value = store.get(CURRENCY_COOKIE)?.value;
  return isCurrencyCode(value) ? value : DEFAULT_CURRENCY;
}
