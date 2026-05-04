'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext';
import { CurrencySwitcher } from './CurrencySwitcher';
import { useCurrency } from './CurrencyContext';
import type { CurrencyCode } from '@case-couture/types';

export function SiteHeader() {
  const { items, openCart } = useCart();
  const { currency, setCurrency, options } = useCurrency();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="max-w-[1220px] mx-auto px-0">
      {/* Main row */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-[18px] items-center max-[640px]:grid-cols-[1fr_auto]">
        <a className="flex items-center leading-none" href="/">
          <Image src="/jadeli-logo.png" alt="JADELI" width={160} height={80} className="h-20 w-auto" priority />
        </a>

        {/* Desktop nav */}
        <nav className="flex gap-[18px] items-center text-muted text-[0.95rem] justify-center max-[640px]:hidden">
          <a href="/#new-drops">New</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
        </nav>

        <div className="flex gap-[14px] items-center text-muted text-[0.95rem] justify-end">
          {/* Currency select — desktop only */}
          <span className="max-[640px]:hidden">
            <CurrencySwitcher />
          </span>
          <button
            type="button"
            onClick={openCart}
            className="bg-transparent border-none cursor-pointer text-muted text-[0.95rem] font-[inherit] hover:text-[#1f1722]"
          >
            Cart{totalCount > 0 ? ` (${totalCount})` : ''}
          </button>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="hidden max-[640px]:flex flex-col justify-center gap-[5px] w-7 h-7 bg-transparent border-none cursor-pointer p-0"
            aria-label="Toggle menu"
          >
            <span className={`block h-[2px] bg-[#1f1722] rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] bg-[#1f1722] rounded transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] bg-[#1f1722] rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="hidden max-[640px]:flex flex-col gap-0 pb-4 border-t border-[rgba(31,23,34,0.08)] mt-1">
          {[
            { href: '/#new-drops', label: 'New' },
            { href: '/products', label: 'Products' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-[14px] text-[1rem] text-[#1f1722] border-b border-[rgba(31,23,34,0.06)] no-underline"
            >
              {label}
            </a>
          ))}

          {/* Currency pill buttons */}
          <div className="pt-5">
            <p className="text-[0.72rem] uppercase tracking-[0.12em] text-muted mb-3">Currency</p>
            <div className="flex gap-3">
              {options.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCurrency(c as CurrencyCode); setMenuOpen(false); }}
                  className={`flex-1 py-3 rounded-full text-[1rem] font-semibold border cursor-pointer font-[inherit] transition-colors ${
                    currency === c
                      ? 'bg-[#1f1722] text-white border-[#1f1722]'
                      : 'bg-transparent text-[#1f1722] border-[rgba(31,23,34,0.2)] hover:border-[#1f1722]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
