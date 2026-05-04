import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata = {
  title: 'About — JADELI',
  description: 'The story behind JADELI luxury phone cases.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-5 pb-[72px] max-[640px]:px-[14px]">
      <AnnouncementBar />
      <SiteHeader />

      {/* Stacked hero with side-by-side photos */}
      <section className="max-w-[var(--max-width)] mx-auto pt-16 pb-14 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="uppercase tracking-[0.14em] text-[0.76rem] text-muted">About JADELI</span>
          <h1 className="m-0 text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">Where luxury meets everyday.</h1>
        </div>
        <div className="grid grid-cols-2 gap-[18px] max-[640px]:grid-cols-1">
          <div className="aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)]">
            <img src="/Example%2001.jpeg" alt="JADELI pink croc case" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)]">
            <img src="/Example%2002.jpeg" alt="JADELI black croc case" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Centered manifesto */}
      <section className="max-w-[var(--max-width)] mx-auto py-16 flex justify-center">
        <p className="m-0 text-center text-[clamp(1.2rem,3vw,1.8rem)] leading-[1.5] tracking-[-0.02em] max-w-[44ch] text-muted">
          We started JADELI because we were tired of ordinary. Phones are the most
          personal object you own — the case protecting yours should say something.
          Ours says: quality, detail, and intention.
        </p>
      </section>

      {/* Alternating feature rows */}
      <section className="max-w-[var(--max-width)] mx-auto flex flex-col gap-0">
        {[
          { n: '01', title: 'Signature materials', body: 'Premium crocodile texture, signature gold logo, hand-placed crystal detail. Every element is chosen for how it looks, how it feels, and how long it lasts.' },
          { n: '02', title: 'Limited by design', body: 'We produce in small quantities — never restocked, never repeated. When a drop sells out, that design is retired. Your case stays rare.' },
          { n: '03', title: 'Built for the details', body: 'From precise cutouts to seamless edges, every JADELI case is engineered to fit perfectly and feel premium from every angle.' },
        ].map(({ n, title, body }) => (
          <div key={n} className="grid grid-cols-[80px_1fr] gap-10 py-10 border-b border-[rgba(31,23,34,0.10)] max-[640px]:grid-cols-1 max-[640px]:gap-3">
            <div className="text-[2.2rem] font-bold tracking-[-0.05em] text-[rgba(31,23,34,0.15)]">{n}</div>
            <div className="bg-[rgba(255,255,255,0.86)] border border-[rgba(31,23,34,0.10)] rounded-[var(--radius-xl)] p-10 shadow-[var(--shadow)]">
              <h2 className="mt-0 mb-4 text-[1.5rem] tracking-[-0.03em]">{title}</h2>
              <p className="m-0 text-muted leading-[1.7]">{body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA banner */}
      <section className="max-w-[var(--max-width)] mx-auto my-20 bg-[#1f1722] text-white rounded-[var(--radius-xl)] p-16 text-center">
        <h2 className="m-0 mb-3 text-[clamp(1.8rem,5vw,3rem)] tracking-[-0.03em]">This is more than a phone case.</h2>
        <p className="m-0 text-[rgba(255,255,255,0.65)] text-[1.1rem]">It&apos;s a reflection of your style.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
