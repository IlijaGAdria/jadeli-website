'use client';

import type { CurrencyCode } from '@case-couture/types';

import { useCurrency } from './CurrencyContext';

export function CurrencySwitcher({ className = '' }: { className?: string }) {
  const { currency, setCurrency, options } = useCurrency();

  return (
    <label className={`inline-flex items-center gap-2 text-[0.85rem] text-muted ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="bg-transparent border border-[rgba(31,23,34,0.16)] rounded-full px-3 py-1 text-[0.82rem] font-semibold text-[#1f1722] cursor-pointer font-[inherit] outline-none hover:border-[#1f1722]"
        aria-label="Select currency"
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}
