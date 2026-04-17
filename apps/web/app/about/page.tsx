import styles from './page.module.css';
import { AnnouncementBar } from '../../components/AnnouncementBar';
import { SiteHeader } from '../../components/SiteHeader';

export const metadata = {
  title: 'About — JADELI',
  description: 'The story behind JADELI luxury phone cases.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <AnnouncementBar />
      <SiteHeader />

      <section className={styles.hero}>
        <span className={styles.eyebrow}>Our story</span>
        <h1>Luxury in the details</h1>
        <p>
          JADELI was born from a simple idea — your phone case should be as refined as you are.
          We craft premium accessories with real texture, signature finishes, and designs that
          stand apart from the ordinary.
        </p>
      </section>

      <div className={styles.content}>
        <article className={styles.card}>
          <h2>What we do</h2>
          <p>
            We design and produce luxury phone cases featuring signature crocodile textures,
            gold logo detailing, and crystal accents. Every piece is a limited drop, made to
            elevate your everyday carry.
          </p>
        </article>

        <article className={styles.card}>
          <h2>Why we&apos;re different</h2>
          <p>
            No mass production. No generic designs. Each JADELI case is part of a curated
            collection, crafted with intention and released in limited quantities so your
            style stays exclusive.
          </p>
        </article>
      </div>

      <section className={styles.values}>
        <h2>What we stand for</h2>
        <div className={styles.valuesGrid}>
          <article className={styles.valueCard}>
            <h3>Premium materials</h3>
            <p>Every case features high-quality textures and finishes that look and feel luxurious.</p>
          </article>
          <article className={styles.valueCard}>
            <h3>Limited drops</h3>
            <p>We release in small batches to keep each design rare and special.</p>
          </article>
          <article className={styles.valueCard}>
            <h3>Detail obsessed</h3>
            <p>From the gold logo to the crystal accent, every detail is considered.</p>
          </article>
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
