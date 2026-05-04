'use client';

import type { ReactNode } from 'react';

import type { CurrencyCode } from '@case-couture/types';

import { CartProvider } from './CartContext';
import { CartDrawer } from './CartDrawer';
import { CurrencyProvider } from './CurrencyContext';

export function Providers({
  children,
  initialCurrency,
}: {
  children: ReactNode;
  initialCurrency: CurrencyCode;
}) {
  return (
    <CurrencyProvider initialCurrency={initialCurrency}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </CurrencyProvider>
  );
}
