import styles from './ModelPill.module.css';

export function ModelPill({ label }: { label: string }) {
  return <span className={styles.pill}>{label}</span>;
}
