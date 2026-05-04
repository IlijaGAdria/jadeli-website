import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AnnouncementBar } from '../../../components/AnnouncementBar';
import { ProductPurchasePanel } from '../../../components/ProductPurchasePanel';
import { SiteFooter } from '../../../components/SiteFooter';
import { SiteHeader } from '../../../components/SiteHeader';
import { getPrimaryVariant, getProduct, getProducts } from '../../../lib/api';
import allReviews from '../../../lib/reviews.json';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ style?: string }>;
};

const STYLE_IMAGES: Record<string, string> = {
  Clear: '/Example 01.jpeg',
  MagSafe: '/Example 0.3.png',
  Leather: '/Example 0.4.png',
  Rugged: '/Example 0.5.png',
};

const card = "bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.12)] rounded-[32px] [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] p-6";
const eyebrow = "uppercase tracking-[0.14em] text-[0.76rem]";

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { style } = await searchParams;
  const reviews = style ? (allReviews as Record<string, typeof allReviews.Clear>)[style] ?? [] : [];

  let product: Awaited<ReturnType<typeof getProduct>> = null;
  let allProducts: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    [product, allProducts] = await Promise.all([getProduct(slug), getProducts()]);
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center px-5">
        <p className="text-muted text-[1rem]">Unable to load product — please try again later.</p>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  const allDevices = allProducts.map((p) => ({ slug: p.slug, name: p.name }));

  const primaryVariant = getPrimaryVariant(product);
  const availableQuantity = primaryVariant?.inventory?.availableQuantity ?? 0;
  const content = product.content;

  return (
    <main className="min-h-screen px-5 pb-[72px]">
      <AnnouncementBar />
      <SiteHeader />

      {/* Hero grid */}
      <section className="max-w-[1220px] mx-auto py-[18px] grid grid-cols-[1.15fr_0.85fr] gap-6 items-start max-[860px]:grid-cols-1">
        <div className={card}>
          <Link href="/products" className={`${eyebrow} inline-block text-muted mb-[18px]`}>
            ← Back to products
          </Link>
          <span className={`${eyebrow} text-[#1f1722] block mb-[18px]`}>JDÉ Product Story</span>
          <h1 className="text-[clamp(2.3rem,5vw,4rem)] leading-[0.98] tracking-[-0.04em] max-w-[12ch] mb-[14px]">
            {content?.title ?? product.name}
          </h1>
          {content?.tagline && <p className="text-[1.18rem] text-[#1f1722] mb-4">{content.tagline}</p>}
          <p className="text-muted leading-[1.75] max-w-[56ch] mb-6">
            {content?.intro ?? product.description ?? 'A statement piece designed to elevate your everyday.'}
          </p>

          <div className="grid grid-cols-2 gap-[14px] mb-[22px]">
            <div>
              <span className={`${eyebrow} text-muted`}>Primary fit</span>
              <strong className="block mt-2 text-[1.02rem]">{primaryVariant?.deviceModel ?? 'Coming soon'}</strong>
            </div>
            <div>
              <span className={`${eyebrow} text-muted`}>Stock</span>
              <strong className="block mt-2 text-[1.02rem]">
                {availableQuantity > 0 ? `${availableQuantity} available` : 'Out of stock'}
              </strong>
            </div>
          </div>

          <ProductPurchasePanel product={product} allDevices={allDevices} />
        </div>

        {/* Product image */}
        <div className={`${card} overflow-hidden p-0`}>
          {(() => {
            const imgSrc = (style && STYLE_IMAGES[style]) ? STYLE_IMAGES[style] : product.imageUrl;
            return imgSrc ? (
              <div className="relative aspect-[3/4] w-full bg-[#f5eef2]">
                <Image
                  src={imgSrc}
                  alt={style ? `${style} case` : product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div
                className="aspect-[3/4] w-full"
                style={{ background: 'linear-gradient(160deg, #f8cddd, #fff0f6)' }}
              />
            );
          })()}
        </div>
      </section>

      {/* Story blocks */}
      <section className="max-w-[1220px] mx-auto pt-[54px]">
        <div className="mb-[22px]">
          <span className={`${eyebrow} text-muted`}>In Focus</span>
          <h2 className="mt-[10px] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.04em]">CMS story blocks</h2>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
          {[
            { h: content?.detailsHeading ?? 'The Details', p: content?.detailsBody ?? 'Use this section for close-up craftsmanship and texture details.' },
            { h: content?.motionHeading ?? 'In Motion', p: content?.motionBody ?? 'Describe how the case feels and fits into daily use.' },
            { h: content?.lifestyleHeading ?? 'The Lifestyle', p: content?.lifestyleBody ?? 'Use this block for the editorial, aspirational angle around the product.' },
          ].map(({ h, p }) => (
            <article key={h} className={card}>
              <h3 className="m-0 mb-2">{h}</h3>
              <p className="mt-[10px] m-0 text-muted leading-[1.75]">{p}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="max-w-[1220px] mx-auto pt-[54px]">
          <div className="mb-[22px]">
            <span className={`${eyebrow} text-muted`}>Community</span>
            <h2 className="mt-[10px] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.04em]">
              What our customers say
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-[18px] max-[640px]:grid-cols-1">
            {reviews.map((r) => (
              <article key={r.id} className={card}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="m-0 font-semibold text-[0.95rem] text-[#1f1722]">{r.author}</p>
                    <p className="m-0 text-[0.78rem] text-muted">{r.location} · {r.date}</p>
                  </div>
                  <div className="flex gap-[2px] shrink-0">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <span key={i} className="text-[#b8860b] text-[0.9rem]">★</span>
                    ))}
                    {Array.from({ length: 5 - r.rating }).map((_, i) => (
                      <span key={i} className="text-[#e0d0c0] text-[0.9rem]">★</span>
                    ))}
                  </div>
                </div>
                <p className="m-0 text-muted leading-[1.75] text-[0.95rem]">&ldquo;{r.body}&rdquo;</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Shipping */}
      <section className="max-w-[1220px] mx-auto pt-[54px]">
        <div className="mb-[22px]">
          <span className={`${eyebrow} text-muted`}>Shipping &amp; Availability</span>
          <h2 className="mt-[10px] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.04em]">Checkout testing copy</h2>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[860px]:grid-cols-1">
          {[
            { h: 'Delivery', p: content?.shippingDelivery ?? 'Use Directus to explain delivery timing and expectations.' },
            { h: 'Ordering', p: content?.shippingOrdering ?? 'This ties nicely into your local checkout testing flow.' },
            { h: 'Availability', p: content?.shippingAvailability ?? 'Use this block for limited drop or low-stock messaging.' },
          ].map(({ h, p }) => (
            <article key={h} className={card}>
              <h3 className="m-0 mb-2">{h}</h3>
              <p className="mt-[10px] m-0 text-muted leading-[1.75]">{p}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
