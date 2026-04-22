import Link from 'next/link';

import type { ProductCardDto } from "@case-couture/types";

import styles from './ProductTile.module.css';

export function ProductTile({ name, subtitle, price, label, slug }: ProductCardDto) {
  const href = slug ? `/products/${slug}` : '#';

  return (
    <article className={styles.tile}>
      <div className={styles.media}>
        <span>{label}</span>
      </div>
      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{subtitle}</p>
        <div className={styles.meta}>
          <strong>{price}</strong>
          <Link href={href}>View product</Link>
        </div>
      </div>
    </article>
  );
}
