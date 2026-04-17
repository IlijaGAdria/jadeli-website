import styles from './HeroCard.module.css';

type HeroCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'default' | 'tall';
  image?: string;
};

export function HeroCard({
  eyebrow,
  title,
  description,
  align = 'default',
  image,
}: HeroCardProps) {
  return (
    <article
      className={`${styles.card} ${align === 'tall' ? styles.tall : ''}`}
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <span style={image ? { color: 'rgba(31,23,34,0.65)', zIndex: 1, position: 'relative' } : undefined}>{eyebrow}</span>
      {!image && <div className={styles.gradient} />}
      <div className={styles.copy}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
