import { Button } from '@case-couture/ui';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { SiteHeader } from '../components/SiteHeader';
import { HeroCard } from '../components/HeroCard';
import { ProductTile } from '../components/ProductTile';
import { getProducts, toProductCard } from '../lib/api';
import { getCurrentCurrency } from '../lib/server-currency';
import { SiteFooter } from '../components/SiteFooter';

const maxW = 'max-w-[var(--max-width)] mx-auto';
const videoArticle = 'bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow)]';

const FEATURED = [
  { slug: 'iphone-17-pro-max', label: 'New Drop' },
  { slug: 'galaxy-s26-ultra',  label: 'Best Seller' },
  { slug: 'iphone-16-pro',     label: 'Popular' },
  { slug: 'galaxy-s25-edge',   label: 'Limited' },
];

export default async function HomePage() {
  const currency = await getCurrentCurrency();
  const products = await getProducts();
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

  const drops = FEATURED.flatMap(({ slug, label }) => {
    const p = bySlug[slug];
    if (!p) return [];
    const card = toProductCard(p, currency);
    return [{ ...card, label }];
  });

  return (
    <main className="min-h-screen px-5 pb-[72px] max-[640px]:px-[14px] max-[640px]:pb-[52px]">
      <AnnouncementBar />
      <SiteHeader />

      <section className={`${maxW} pt-3 pb-[26px] grid grid-cols-[1.05fr_1fr] gap-6 items-stretch max-[1080px]:grid-cols-1`}>
        <div className="bg-[rgba(255,255,255,0.78)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] p-12 shadow-[var(--shadow)] max-[640px]:p-[30px_24px]">
          <span className="uppercase tracking-[0.14em] text-[0.76rem]">JDÉ Croc Case</span>
          <h1 className="mt-[14px] mb-[18px] text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.03em] max-w-[20ch]">
            A statement piece designed to elevate your everyday.
          </h1>
          <p className="mb-6 max-w-[58ch] text-muted leading-[1.7] text-[1.02rem]">
            Crafted with a premium crocodile texture and finished with our signature gold logo and crystal detail.
          </p>
          <p className="mb-6 max-w-[58ch] text-muted leading-[1.7] text-[1.02rem]">
            <strong>This is more than a phone case — it&apos;s a reflection of your style.</strong>
          </p>
          <p className="font-bold uppercase tracking-[0.14em] text-[0.85rem] text-[#1f1722] mb-[18px]">
            Limited drop.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button href="/products/butter-kiss-case">BUY NOW</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[18px] max-[860px]:flex max-[860px]:flex-col">
          <HeroCard
            eyebrow="New capsule"
            title="JDE croc case"
            description="Premium croc texture. Signature gold logo. Designed to elevate your everyday."
            align="tall"
            image="/Example%2001.jpeg"
          />
          <HeroCard
            eyebrow="Limited colorway"
            title="Why it is special:"
            description="Signature crystal detail.Luxury croc finish. Limited drop"
            image="/Example%2002.jpeg"
          />
        </div>
      </section>

      <section id="new-drops" className={`${maxW} pt-14`}>
        <div className="flex justify-between items-end gap-[18px] mb-[22px] max-[640px]:items-start max-[640px]:flex-col">
          <div>
            <span className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">New drops</span>
            <h2 className="mt-[10px] mb-0 text-[clamp(2rem,5vw,3.2rem)] leading-[0.98] tracking-[-0.04em]">Fresh styles for your newest lineup</h2>
          </div>
          <a href="/products" className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">View all</a>
        </div>
        <div className="grid grid-cols-4 gap-[18px] max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {drops.map((item) => (
            <ProductTile key={item.slug ?? item.name} {...item} />
          ))}
        </div>
      </section>

      <section id="videos" className={`${maxW} pt-14`}>
        <div className="flex justify-between items-end gap-[18px] mb-[22px] max-[640px]:items-start max-[640px]:flex-col">
          <div>
            <span className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">Up close</span>
            <h2 className="mt-[10px] mb-0 text-[clamp(2rem,5vw,3.2rem)] leading-[0.98] tracking-[-0.04em]">See it in action</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          <article className={videoArticle}>
            <div className="relative w-full aspect-[9/14] overflow-hidden bg-[#1f1722]">
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Close up maske"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full object-cover block border-none"
              />
            </div>
            <h3 className="mx-5 mt-4 mb-[6px] text-[1.25rem] tracking-[-0.03em]">Close up maske</h3>
            <p className="mx-5 mb-[18px] text-muted leading-[1.6] text-[0.95rem]">Premium crocodile texture and gold detailing up close.</p>
          </article>

          <article className={videoArticle}>
            <div className="relative w-full aspect-[9/14] overflow-hidden bg-[#1f1722]">
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Wearing"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full object-cover block border-none"
              />
            </div>
            <h3 className="mx-5 mt-4 mb-[6px] text-[1.25rem] tracking-[-0.03em]">Wearing</h3>
            <p className="mx-5 mb-[18px] text-muted leading-[1.6] text-[0.95rem]">How it feels in your hand, everyday.</p>
          </article>

          <article className={videoArticle}>
            <div className="relative w-full aspect-[9/14] overflow-hidden bg-[#1f1722]">
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Lifestyle"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full object-cover block border-none"
              />
            </div>
            <h3 className="mx-5 mt-4 mb-[6px] text-[1.25rem] tracking-[-0.03em]">Lifestyle</h3>
            <p className="mx-5 mb-[18px] text-muted leading-[1.6] text-[0.95rem]">Made to complement your look.</p>
          </article>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}
