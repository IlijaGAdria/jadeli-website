'use client';

import styles from './CartDrawer.module.css';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCart();

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={closeCart}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`} aria-modal="true" role="dialog">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Your Cart</h2>
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <img src={item.imageSrc} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemSize}>{item.size}</p>
                    <p className={styles.itemPrice}>
                      {item.price}
                      {item.quantity > 1 && <span className={styles.itemQty}> × {item.quantity}</span>}
                    </p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <a href="/checkout" className={styles.checkoutBtn}>Checkout</a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
