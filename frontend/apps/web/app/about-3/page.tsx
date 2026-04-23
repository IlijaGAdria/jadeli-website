import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata = {
  title: 'About — JADELI',
  description: 'The story behind JADELI luxury phone cases.',
};

export default function About3Page() {
  return (
    <main className="min-h-screen px-5 pb-[72px] max-[640px]:px-[14px]">
      <AnnouncementBar />
      <SiteHeader />

      {/* Giant type hero */}
      <section className="max-w-[var(--max-width)] mx-auto pt-16 pb-14 flex flex-col gap-5">
        <span className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">Our story</span>
        <h1 className="m-0 text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.04em] max-w-[18ch]">Luxury in every detail</h1>
        <p className="m-0 max-w-[54ch] text-muted leading-[1.7] text-[1.05rem]">
          JADELI was created for those who refuse to settle. We make phone cases
          that feel as refined as the phone inside them — designed with real texture,
          real craft, and a signature finish that sets you apart.
        </p>
      </section>

      {/* Feature cards — large + 2 small */}
      <div className="max-w-[var(--max-width)] mx-auto grid grid-cols-[1.6fr_1fr_1fr] gap-[18px] max-[860px]:grid-cols-1">
        <article className="bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow)]">
          <h2 className="mt-0 mb-4 text-[1.8rem] tracking-[-0.03em]">Crafted with intention</h2>
          <p className="m-0 text-muted leading-[1.7]">
            Every JADELI case starts with the question: does this feel premium?
            We use only materials that answer yes — crocodile textures, gold accents,
            crystal details.
          </p>
        </article>
        <article className="bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow)]">
          <h2 className="mt-0 mb-4 text-[1.4rem] tracking-[-0.03em]">Limited drops only</h2>
          <p className="m-0 text-muted leading-[1.65] text-[0.95rem]">
            We never mass produce. Each collection is a small run,
            released once — then gone.
          </p>
        </article>
        <article className="bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow)]">
          <h2 className="mt-0 mb-4 text-[1.4rem] tracking-[-0.03em]">Exclusive by design</h2>
          <p className="m-0 text-muted leading-[1.65] text-[0.95rem]">
            JADELI is for people who see their accessories as an
            extension of their identity.
          </p>
        </article>
      </div>

      {/* Manifesto quote */}
      <div className="max-w-[var(--max-width)] mx-auto py-20 flex flex-col items-center gap-4 text-center">
        <blockquote className="m-0 text-[clamp(1.4rem,4vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.2] max-w-[28ch]">
          &ldquo;This is more than a phone case — it&apos;s a reflection of your style.&rdquo;
        </blockquote>
        <cite className="text-muted text-[0.9rem] not-italic">— JADELI</cite>
      </div>

      {/* Values as a list */}
      <section className="max-w-[var(--max-width)] mx-auto">
        <div className="flex justify-between items-end pb-6 mb-6 border-b border-[rgba(31,23,34,0.10)]">
          <h2 className="m-0 text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.03em]">What we stand for</h2>
          <span className="text-muted text-[0.82rem] uppercase tracking-[0.14em]">03 values</span>
        </div>
        <div className="flex flex-col gap-0">
          <div className="grid grid-cols-[1fr_2fr] gap-8 py-6 border-b border-[rgba(31,23,34,0.10)] max-[640px]:grid-cols-1 max-[640px]:gap-2">
            <h3 className="m-0 text-[1.1rem] font-semibold tracking-[-0.01em]">Premium materials</h3>
            <p className="m-0 text-muted leading-[1.7]">Every case features high-quality textures and finishes that look and feel luxurious in your hand.</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-8 py-6 border-b border-[rgba(31,23,34,0.10)] max-[640px]:grid-cols-1 max-[640px]:gap-2">
            <h3 className="m-0 text-[1.1rem] font-semibold tracking-[-0.01em]">Limited drops</h3>
            <p className="m-0 text-muted leading-[1.7]">We release in small batches to keep each design rare, exclusive, and special for those who own one.</p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-8 py-6 border-b border-[rgba(31,23,34,0.10)] max-[640px]:grid-cols-1 max-[640px]:gap-2">
            <h3 className="m-0 text-[1.1rem] font-semibold tracking-[-0.01em]">Detail obsessed</h3>
            <p className="m-0 text-muted leading-[1.7]">From the signature gold logo to the crystal accent, every element is deliberate and considered.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-[var(--max-width)] mx-auto mt-[72px] pt-12 border-t border-[rgba(31,23,34,0.10)]">
        <div className="grid grid-cols-3 gap-6 max-[640px]:grid-cols-1">
          <div>
            <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">JADELI</h4>
            <p className="m-0 text-muted text-[0.95rem] leading-[1.6]">Luxury in the details.</p>
          </div>
          <div>
            <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">Contact</h4>
            <p className="m-0 text-muted text-[0.95rem] leading-[1.6]">info@jadeli.com</p>
          </div>
          <div>
            <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">Follow us</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted text-[0.95rem] no-underline">Instagram</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[rgba(31,23,34,0.08)] text-muted text-[0.82rem]">
          <span>&copy; {new Date().getFullYear()} JADELI. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
