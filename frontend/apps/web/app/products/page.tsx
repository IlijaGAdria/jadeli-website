import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';
import { ShopAllShell } from './ShopAllShell';
import { getShopAllProducts } from './products';

export const metadata = {
  title: 'Products — JADELI',
  description: 'Browse the full JADELI collection.',
};

export default async function ShopAllPage() {
  const products = await getShopAllProducts();

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSubtitle}>{products.length} styles</p>
        </div>

        <ShopAllShell products={products} />
      </main>
    </>
  );
}
