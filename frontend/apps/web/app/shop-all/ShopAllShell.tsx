'use client';

import { CartProvider } from '../../components/CartContext';
import { CartDrawer } from '../../components/CartDrawer';
import { PhoneCaseCard } from '../../components/PhoneCaseCard';
import styles from './page.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  label?: string;
}

export function ShopAllShell({ products }: { products: Product[] }) {
  return (
    <CartProvider>
      <CartDrawer />
      <div className={styles.grid}>
        {products.map((product) => (
          <PhoneCaseCard
            key={product.id}
            name={product.name}
            price={product.price}
            label={product.label}
          />
        ))}
      </div>
    </CartProvider>
  );
}
