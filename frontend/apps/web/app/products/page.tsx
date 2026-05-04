import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteFooter } from '../../components/SiteFooter';
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

      <main className="max-w-[1220px] mx-auto px-6 pt-12 pb-24">
        <div className="flex items-baseline gap-4 mb-10">
          <h1 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-[#1f1722]">Products</h1>
          <p className="m-0 text-[0.9rem] text-muted">{products.length} styles</p>
        </div>

        <ShopAllShell products={products} />
      </main>

      <SiteFooter />
    </>
  );
}

