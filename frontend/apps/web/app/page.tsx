import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@case-couture/ui';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { SiteHeader } from '../components/SiteHeader';
import { HeroCard } from '../components/HeroCard';
import { getProducts } from '../lib/api';
import { getCurrentCurrency } from '../lib/server-currency';
import { SiteFooter } from '../components/SiteFooter';

const maxW = 'max-w-[var(--max-width)] mx-auto';
const videoArticle = 'bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow)]';

const STYLE_DROPS = [
  {
    name: 'Clear Case',
    subtitle: 'Barely-there protection that lets your phone shine through. Ultra-slim, crystal finish.',
    imageUrl: '/Example 01.jpeg',
    label: 'Bestseller',
    href: '/products?style=Clear',
  },
  {
    name: 'MagSafe Case',
    subtitle: 'Built-in MagSafe magnets for seamless wireless charging and snap-on accessories.',
    imageUrl: '/Example 0.3.png',
    label: 'New Drop',
    href: '/products?style=MagSafe',
  },
  {
    name: 'Leather Case',
    subtitle: 'Full-grain croc-embossed leather. Ages beautifully. Signature gold JDÉ monogram.',
    imageUrl: '/Example 0.4.png',
    label: 'Popular',
    href: '/products?style=Leather',
  },
  {
    name: 'Rugged Case',
    subtitle: 'Military-grade drop protection wrapped in luxury. Style that survives everything.',
    imageUrl: '/Example 0.5.png',
    label: 'Limited',
    href: '/products?style=Rugged',
  },
];

export default async function HomePage() {
  const currency = await getCurrentCurrency();
  // keep products available for future use
  try { await getProducts(); } catch { /* API unavailable */ }

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
            <Button href="/products">BUY NOW</Button>
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
            <span className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">Our styles</span>
            <h2 className="mt-[10px] mb-0 text-[clamp(2rem,5vw,3.2rem)] leading-[0.98] tracking-[-0.04em]">Four materials. One standard.</h2>
          </div>
          <a href="/products" className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">View all</a>
        </div>
        <div className="grid grid-cols-4 gap-[18px] max-[1080px]:grid-cols-2 max-[640px]:grid-cols-1">
          {STYLE_DROPS.map((item) => (
            <article key={item.name} className="overflow-hidden rounded-[24px] border border-[rgba(31,23,34,0.12)] bg-[rgba(255,255,255,0.85)] [box-shadow:0_20px_50px_rgba(113,72,96,0.14)]">
              <div className="relative aspect-[4/5] bg-[#f5eef2]">
                <Image src={item.imageUrl} alt={item.name} fill className="object-contain" />
                <span className="absolute top-3 left-3 inline-flex px-3 py-2 rounded-full bg-[rgba(255,255,255,0.78)] border border-[rgba(31,23,34,0.08)] text-[0.74rem] uppercase tracking-[0.12em]">
                  {item.label}
                </span>
              </div>
              <div className="p-[18px]">
                <h3 className="m-0 mb-2 text-[1.06rem]">{item.name}</h3>
                <p className="m-0 text-muted leading-[1.55] min-h-[48px]">{item.subtitle}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link href={item.href} className="text-muted text-[0.9rem] no-underline">View style →</Link>
                </div>
              </div>
            </article>
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
