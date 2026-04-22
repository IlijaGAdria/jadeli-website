import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AnnouncementBar } from '../../../components/AnnouncementBar';
import { ProductPurchasePanel } from '../../../components/ProductPurchasePanel';
import { SiteHeader } from '../../../components/SiteHeader';
import { getPrimaryVariant, getProduct } from '../../../lib/api';
import styles from './page.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

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
    <main className={styles.page}>
      <AnnouncementBar />
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.copy}>
          <Link href="/shop-all" className={styles.backLink}>
            Back to shop all
          </Link>
          <span className={styles.kicker}>JDÉ Product Story</span>
          <h1>{content?.title ?? product.name}</h1>
          {content?.tagline ? <p className={styles.tagline}>{content.tagline}</p> : null}
          <p className={styles.description}>
            {content?.intro ?? product.description ?? 'A statement piece designed to elevate your everyday.'}
          </p>

          <div className={styles.metaStrip}>
            <div>
              <span className={styles.metaLabel}>Primary fit</span>
              <strong>{primaryVariant?.deviceModel ?? 'Coming soon'}</strong>
            </div>
            <div>
              <span className={styles.metaLabel}>Stock</span>
              <strong>{availableQuantity > 0 ? `${availableQuantity} available` : 'Out of stock'}</strong>
            </div>
          </div>

          <ProductPurchasePanel product={product} />
        </div>

        <div className={styles.storyCard}>
          <span className={styles.storyEyebrow}>Why It&apos;s Special</span>
          <p>{content?.whyItsSpecial ?? 'Add your hero storytelling copy in Directus to replace this placeholder.'}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>In Focus</span>
            <h2>CMS story blocks</h2>
          </div>
        </div>

        <div className={styles.storyGrid}>
          <article className={styles.storyBlock}>
            <h3>{content?.detailsHeading ?? 'The Details'}</h3>
            <p>{content?.detailsBody ?? 'Use this section for close-up craftsmanship and texture details.'}</p>
          </article>
          <article className={styles.storyBlock}>
            <h3>{content?.motionHeading ?? 'In Motion'}</h3>
            <p>{content?.motionBody ?? 'Describe how the case feels and fits into daily use.'}</p>
          </article>
          <article className={styles.storyBlock}>
            <h3>{content?.lifestyleHeading ?? 'The Lifestyle'}</h3>
            <p>{content?.lifestyleBody ?? 'Use this block for the editorial, aspirational angle around the product.'}</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>Community</span>
            <h2>What our community says</h2>
          </div>
        </div>

        <div className={styles.testimonialGrid}>
          <blockquote className={styles.quote}>
            “{content?.testimonial1 ?? 'Add your first testimonial in Directus.'}”
          </blockquote>
          <blockquote className={styles.quote}>
            “{content?.testimonial2 ?? 'Add your second testimonial in Directus.'}”
          </blockquote>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>Shipping & Availability</span>
            <h2>Checkout testing copy</h2>
          </div>
        </div>

        <div className={styles.shippingGrid}>
          <article className={styles.shippingCard}>
            <h3>Delivery</h3>
            <p>{content?.shippingDelivery ?? 'Use Directus to explain delivery timing and expectations.'}</p>
          </article>
          <article className={styles.shippingCard}>
            <h3>Ordering</h3>
            <p>{content?.shippingOrdering ?? 'This ties nicely into your local checkout testing flow.'}</p>
          </article>
          <article className={styles.shippingCard}>
            <h3>Availability</h3>
            <p>{content?.shippingAvailability ?? 'Use this block for limited drop or low-stock messaging.'}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
