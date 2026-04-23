import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AnnouncementBar } from '../../../components/AnnouncementBar';
import { ProductPurchasePanel } from '../../../components/ProductPurchasePanel';
import { SiteHeader } from '../../../components/SiteHeader';
import { getPrimaryVariant, getProduct } from '../../../lib/api';

type Props = {
  params: Promise<{ slug: string }>;
};

const card = "bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.12)] rounded-[32px] [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] p-6";
const eyebrow = "uppercase tracking-[0.14em] text-[0.76rem]";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

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

          <ProductPurchasePanel product={product} />
        </div>

        <div className={card}>
          <span className={`${eyebrow} text-muted`}>Why It&apos;s Special</span>
          <p className="mt-[10px] text-muted leading-[1.75]">
            {content?.whyItsSpecial ?? 'Add your hero storytelling copy in Directus to replace this placeholder.'}
          </p>
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

      {/* Testimonials */}
      <section className="max-w-[1220px] mx-auto pt-[54px]">
        <div className="mb-[22px]">
          <span className={`${eyebrow} text-muted`}>Community</span>
          <h2 className="mt-[10px] text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.04em]">What our community says</h2>
        </div>
        <div className="grid grid-cols-2 gap-[18px] max-[640px]:grid-cols-1">
          <blockquote className={card}>&ldquo;{content?.testimonial1 ?? 'Add your first testimonial in Directus.'}&rdquo;</blockquote>
          <blockquote className={card}>&ldquo;{content?.testimonial2 ?? 'Add your second testimonial in Directus.'}&rdquo;</blockquote>
        </div>
      </section>

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
    </main>
  );
}
