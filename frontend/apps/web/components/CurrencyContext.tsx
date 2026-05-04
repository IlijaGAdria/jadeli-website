'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { CurrencyCode } from '@case-couture/types';

import {
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
} from '../lib/currency';

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (next: CurrencyCode) => void;
  options: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: CurrencyCode;
  children: ReactNode;
}) {
  const router = useRouter();
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);

  const setCurrency = useCallback(
    (next: CurrencyCode) => {
      setCurrencyState(next);
      // Persist override in cookie so middleware respects it
      document.cookie = `${CURRENCY_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      // Refetch server components so prices re-render in the new currency
      router.refresh();
    },
    [router],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, options: SUPPORTED_CURRENCIES }),
    [currency, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}

export { DEFAULT_CURRENCY };
