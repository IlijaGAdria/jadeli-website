import styles from './page.module.css';
import { Button } from '@case-couture/ui';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { SiteHeader } from '../components/SiteHeader';
import { HeroCard } from '../components/HeroCard';
import { ProductTile } from '../components/ProductTile';
import { drops } from '../lib/mock-data';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <AnnouncementBar />
      <SiteHeader />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>JDÉ Croc Case</span>
          <h1>A statement piece designed to elevate your everyday.</h1>
          <p>
            Crafted with a premium crocodile texture and finished with our signature gold logo and crystal detail.
          </p>
          <p>
            <strong>This is more than a phone case — it&apos;s a reflection of your style.</strong>
          </p>
          <p className={styles.limitedDrop}>Limited drop.</p>
          <div className={styles.actions}>
            <Button href="#new-drops">BUY NOW</Button>
          </div>
        </div>

        <div className={styles.heroCards}>
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



      <section id="new-drops" className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>New drops</span>
            <h2>Fresh styles for your newest lineup</h2>
          </div>
          <a href="#" className={styles.inlineLink}>View all</a>
        </div>

        <div className={styles.grid}>
          {drops.map((item) => (
            <ProductTile key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section id="videos" className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>Up close</span>
            <h2>See it in action</h2>
          </div>
        </div>

        <div className={styles.videoGrid}>
          <article className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Close up maske"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <h3>Close up maske</h3>
            <p>Premium crocodile texture and gold detailing up close.</p>
          </article>

          <article className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Wearing"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <h3>Wearing</h3>
            <p>How it feels in your hand, everyday.</p>
          </article>

          <article className={styles.videoCard}>
            <div className={styles.videoWrap}>
              <iframe
                src="https://www.youtube.com/embed/ZZbj-lVO8nw?autoplay=1&mute=1&loop=1&playlist=ZZbj-lVO8nw&controls=0&showinfo=0&modestbranding=1"
                title="Lifestyle"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <h3>Lifestyle</h3>
            <p>Made to complement your look.</p>
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
      </footer>

    </main>
  );
}
