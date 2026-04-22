'use client';

import { useState } from 'react';
import styles from './PhoneCaseCard.module.css';

const SIZES = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16',
  'Galaxy S26 Ultra',
  'Galaxy S26',
  'Galaxy S25 Ultra',
  'Galaxy S25',
];

interface PhoneCaseCardProps {
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
}

export function PhoneCaseCard({ name, price, label, imageSrc = '/Example 01.jpeg' }: PhoneCaseCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  function handleChooseSize() {
    setShowSizes(true);
    setAddedToCart(false);
  }

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    setShowSizes(false);
  }

  function handleAddToCart() {
    // Will connect to backend later
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

        {showSizes && (
          <div className={styles.sizePicker}>
            {SIZES.map((size) => (
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
            <button className={styles.btnPrimary} onClick={handleChooseSize}>
              Choose Size
            </button>
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
    </article>
  );
}
