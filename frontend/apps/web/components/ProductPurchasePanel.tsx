'use client';

import { useMemo, useState } from 'react';

import type { ProductDetailDto } from '@case-couture/types';

import { useCart } from './CartContext';
import styles from './ProductPurchasePanel.module.css';

type Props = {
  product: ProductDetailDto;
};

export function ProductPurchasePanel({ product }: Props) {
  const cart = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [added, setAdded] = useState(false);

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      product.variants[0] ??
      null,
    [product.variants, selectedVariantId],
  );

  function handleAddToCart() {
    if (!selectedVariant) return;

    cart.addItem({
      name: product.name,
      price: `€${(selectedVariant.priceInCents / 100).toFixed(2)}`,
      size: selectedVariant.deviceModel,
      imageSrc: '/Example 01.jpeg',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  if (!selectedVariant) {
    return null;
  }

  const availableQuantity = selectedVariant.inventory?.availableQuantity ?? 0;

  return (
    <div className={styles.panel}>
      <div className={styles.topRow}>
        <div>
          <span className={styles.metaLabel}>Selected fit</span>
          <strong>{selectedVariant.deviceModel}</strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Price</span>
          <strong>€{(selectedVariant.priceInCents / 100).toFixed(2)}</strong>
        </div>
      </div>

      <label className={styles.label} htmlFor="variant-select">
        Choose device
      </label>
      <select
        id="variant-select"
        className={styles.select}
        value={selectedVariant.id}
        onChange={(event) => setSelectedVariantId(event.target.value)}
      >
        {product.variants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.deviceModel} · {variant.color ?? 'Signature'} · €
            {(variant.priceInCents / 100).toFixed(2)}
          </option>
        ))}
      </select>

      <p className={styles.inventory}>
        {availableQuantity > 0 ? `${availableQuantity} available now` : 'Currently out of stock'}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleAddToCart}
          disabled={availableQuantity <= 0}
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
        <a href="/checkout" className={styles.secondaryButton}>
          Test checkout
        </a>
      </div>
    </div>
  );
}
