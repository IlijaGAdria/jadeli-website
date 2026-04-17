import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata = {
  title: 'About — JADELI',
  description: 'The story behind JADELI luxury phone cases.',
};

export default function About3Page() {
  return (
    <main className={styles.page}>
      <AnnouncementBar />
      <SiteHeader />

      {/* Giant type hero */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Our story</span>
        <h1>Luxury in every detail</h1>
        <p>
          JADELI was created for those who refuse to settle. We make phone cases
          that feel as refined as the phone inside them — designed with real texture,
          real craft, and a signature finish that sets you apart.
        </p>
      </section>

      {/* Feature cards — large + 2 small */}
      <div className={styles.cards}>
        <article className={styles.cardLarge}>
          <h2>Crafted with intention</h2>
          <p>
            Every JADELI case starts with the question: does this feel premium?
            We use only materials that answer yes — crocodile textures, gold accents,
            crystal details.
          </p>
        </article>
        <article className={styles.cardSmall}>
          <h2>Limited drops only</h2>
          <p>
            We never mass produce. Each collection is a small run,
            released once — then gone.
          </p>
        </article>
        <article className={styles.cardSmall}>
          <h2>Exclusive by design</h2>
          <p>
            JADELI is for people who see their accessories as an
            extension of their identity.
          </p>
        </article>
      </div>

      {/* Manifesto quote */}
      <div className={styles.manifesto}>
        <blockquote>
          &ldquo;This is more than a phone case — it&apos;s a reflection of your style.&rdquo;
        </blockquote>
        <cite>— JADELI</cite>
      </div>

      {/* Values as a list */}
      <section className={styles.values}>
        <div className={styles.valuesHeader}>
          <h2>What we stand for</h2>
          <span>03 values</span>
        </div>
        <div className={styles.valueRow}>
          <h3>Premium materials</h3>
          <p>Every case features high-quality textures and finishes that look and feel luxurious in your hand.</p>
        </div>
        <div className={styles.valueRow}>
          <h3>Limited drops</h3>
          <p>We release in small batches to keep each design rare, exclusive, and special for those who own one.</p>
        </div>
        <div className={styles.valueRow}>
          <h3>Detail obsessed</h3>
          <p>From the signature gold logo to the crystal accent, every element is deliberate and considered.</p>
        </div>
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
