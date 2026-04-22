import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';
import { ShopAllShell } from './ShopAllShell';

const PLACEHOLDER_PRODUCTS = [
  { id: 1,  name: 'JDÉ Croc Case',         price: '$38', label: 'New' },
  { id: 2,  name: 'JDÉ Rosé Frame',         price: '$36', label: 'Bestseller' },
  { id: 3,  name: 'JDÉ Cloud Mirror',       price: '$39', label: 'Limited' },
  { id: 4,  name: 'JDÉ Ribbon Pop',         price: '$35', label: 'Fresh' },
  { id: 5,  name: 'JDÉ Velvet Noir',        price: '$40' },
  { id: 6,  name: 'JDÉ Pearl Blush',        price: '$37', label: 'New' },
  { id: 7,  name: 'JDÉ Gold Curve',         price: '$42', label: 'Limited' },
  { id: 8,  name: 'JDÉ Lux Weave',          price: '$38' },
  { id: 9,  name: 'JDÉ Crystal Clear',      price: '$35', label: 'Bestseller' },
  { id: 10, name: 'JDÉ Satin Blush',        price: '$36' },
  { id: 11, name: 'JDÉ Onyx Croc',          price: '$41', label: 'New' },
  { id: 12, name: 'JDÉ Ivory Quilt',        price: '$39', label: 'Limited' },
];

export const metadata = {
  title: 'Shop All — JADELI',
  description: 'Browse the full JADELI collection.',
};

export default function ShopAllPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Shop All</h1>
          <p className={styles.pageSubtitle}>{PLACEHOLDER_PRODUCTS.length} styles</p>
        </div>

        <ShopAllShell products={PLACEHOLDER_PRODUCTS} />
      </main>
    </>
  );
}
