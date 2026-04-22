'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './PhoneCaseCard.module.css';
import { useCart } from './CartContext';

interface PhoneCaseCardProps {
  slug: string;
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  sizes?: string[];
}

export function PhoneCaseCard({
  slug,
  name,
  price,
  label,
  imageSrc = '/Example 01.jpeg',
  sizes = [],
}: PhoneCaseCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const cart = useCart();

  function handleChooseSize() {
    setShowSizes(true);
    setAddedToCart(false);
  }

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    setShowSizes(false);
  }

  function handleAddToCart() {
    if (!selectedSize) return;
    cart.addItem({ name, price, size: selectedSize, imageSrc });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={imageSrc} alt={name} className={styles.image} />
        {label && <span className={styles.label}>{label}</span>}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price}</p>

        {selectedSize && !showSizes && (
          <p className={styles.sizeSelected}>{selectedSize}</p>
        )}

        <div className={styles.actionsWrap}>
          {showSizes && (
            <div className={styles.sizePicker}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizePill} ${selectedSize === size ? styles.sizePillActive : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <div className={styles.actions}>
            {!selectedSize && !showSizes && (
              <>
                <button className={styles.btnPrimary} onClick={handleChooseSize}>
                  Choose Size
                </button>
                <Link href={`/products/${slug}`} className={styles.btnSecondary}>
                  View Details
                </Link>
              </>
            )}

            {showSizes && (
              <button className={styles.btnSecondary} onClick={() => setShowSizes(false)}>
                Cancel
              </button>
            )}

            {selectedSize && !showSizes && (
              <>
                <button className={styles.btnPrimary} onClick={handleAddToCart} disabled={addedToCart}>
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>
                <button className={styles.btnSecondary} onClick={handleChooseSize}>
                  Change Size
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
