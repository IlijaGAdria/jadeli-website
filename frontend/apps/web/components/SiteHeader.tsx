'use client';

import Image from 'next/image';
import { useCart } from './CartContext';
import { CurrencySwitcher } from './CurrencySwitcher';

export function SiteHeader() {
  const { items, openCart } = useCart();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="max-w-[1220px] mx-auto px-0 grid grid-cols-[1fr_auto_1fr] gap-[18px] items-center overflow-hidden">
      <a className="flex items-center leading-none" href="/">
        <Image src="/jadeli-logo.png" alt="JADELI" width={160} height={80} className="h-20 w-auto" priority />
      </a>

      <nav className="flex gap-[18px] items-center text-muted text-[0.95rem] justify-center">
        <a href="/#new-drops">New</a>
        <a href="/#devices">Shop by device</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
      </nav>

      <div className="flex gap-[14px] items-center text-muted text-[0.95rem] justify-end">
        <CurrencySwitcher />
        <button
          type="button"
          onClick={openCart}
          className="bg-transparent border-none cursor-pointer text-muted text-[0.95rem] font-[inherit] hover:text-[#1f1722]"
        >
          Cart{totalCount > 0 ? ` (${totalCount})` : ''}
        </button>
      </div>
    </header>
  );
}
