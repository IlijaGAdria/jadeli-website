import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata = {
  title: 'About — JADELI',
  description: 'The story behind JADELI luxury phone cases.',
};

export default function About5Page() {
  return (
    <main className={styles.page}>
      <AnnouncementBar />
      <SiteHeader />

      {/* Stacked hero with side-by-side photos */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>About JADELI</span>
          <h1>Where luxury meets everyday.</h1>
        </div>
        <div className={styles.heroImages}>
          <div className={styles.heroImgWrap}>
            <img src="/Example%2001.jpeg" alt="JADELI pink croc case" />
          </div>
          <div className={styles.heroImgWrap}>
            <img src="/Example%2002.jpeg" alt="JADELI black croc case" />
          </div>
        </div>
      </section>

      {/* Centered manifesto */}
      <section className={styles.manifesto}>
        <p>
          We started JADELI because we were tired of ordinary. Phones are the most
          personal object you own — the case protecting yours should say something.
          Ours says: quality, detail, and intention.
        </p>
      </section>

      {/* Alternating feature rows */}
      <section className={styles.features}>
        <div className={styles.featureRow}>
          <div className={styles.featureNumber}>01</div>
          <div className={styles.featureCard}>
            <h2>Signature materials</h2>
            <p>
              Premium crocodile texture, signature gold logo, hand-placed crystal
              detail. Every element is chosen for how it looks, how it feels, and
              how long it lasts.
            </p>
          </div>
        </div>

        <div className={styles.featureRow}>
          <div className={styles.featureNumber}>02</div>
          <div className={styles.featureCard}>
            <h2>Limited by design</h2>
            <p>
              We produce in small quantities — never restocked, never repeated.
              When a drop sells out, that design is retired. Your case stays rare.
            </p>
          </div>
        </div>

        <div className={styles.featureRow}>
          <div className={styles.featureNumber}>03</div>
          <div className={styles.featureCard}>
            <h2>Built for the details</h2>
            <p>
              From precise cutouts to seamless edges, every JADELI case is engineered
              to fit perfectly and feel premium from every angle.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className={styles.ctaBanner}>
        <h2>This is more than a phone case.</h2>
        <p>It&apos;s a reflection of your style.</p>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <h4>JADELI</h4>
            <p>Luxury in the details.</p>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <p>info@jadeli.com</p>
          </div>
          <div className={styles.footerCol}>
            <h4>Follow us</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} JADELI. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
