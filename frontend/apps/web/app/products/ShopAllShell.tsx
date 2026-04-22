'use client';

import { PhoneCaseCard } from '../../components/PhoneCaseCard';
import styles from './page.module.css';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  sizes?: string[];
}

export function ShopAllShell({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <PhoneCaseCard
          key={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          label={product.label}
          imageSrc={product.imageSrc}
          sizes={product.sizes}
        />
      ))}
    </div>
  );
}
