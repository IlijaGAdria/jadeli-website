import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/">
        <img src="/jadeli-logo.png" alt="JADELI" className={styles.logo} />
      </a>

      <nav className={styles.nav}>
        <a href="#new-drops">New</a>
        <a href="#devices">Shop by device</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
      </nav>

      <div className={styles.actions}>
        <a href="#">Cart (0)</a>
      </div>
    </header>
  );
}
