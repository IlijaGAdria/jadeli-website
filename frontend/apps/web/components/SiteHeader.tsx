'use client';

import Link from 'next/link';

import { useCart } from './CartContext';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const { items, openCart } = useCart();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        <img src="/jadeli-logo.png" alt="JADELI" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link href="/#new-drops">New</Link>
        <Link href="/#devices">Shop by device</Link>
        <Link href="/shop-all">Shop all</Link>
        <Link href="/about">About</Link>
      </nav>

      <div className={styles.actions}>
        <button type="button" className={styles.cartButton} onClick={openCart}>
          Cart ({totalCount})
        </button>
      </div>
    </header>
  );
}
