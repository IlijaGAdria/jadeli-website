import styles from './ProductTile.module.css';

type ProductTileProps = {
  name: string;
  subtitle: string;
  price: string;
  label: string;
};

export function ProductTile({ name, subtitle, price, label }: ProductTileProps) {
  return (
    <article className={styles.tile}>
      <div className={styles.media}>
        <span>{label}</span>
      </div>
      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{subtitle}</p>
        <div className={styles.meta}>
          <strong>{price}</strong>
          <a href="#">Choose size</a>
        </div>
      </div>
    </article>
  );
}
