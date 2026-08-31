import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`skeleton ${styles.image}`} />
      <div className={styles.body}>
        <div className={`skeleton ${styles.badge}`} />
        <div className={`skeleton ${styles.titleLine}`} />
        <div className={`skeleton ${styles.titleLineShort}`} />
        <div className={`skeleton ${styles.metaLine}`} />
        <div className={styles.footer}>
          <div className={`skeleton ${styles.price}`} />
          <div className={`skeleton ${styles.button}`} />
        </div>
      </div>
    </div>
  );
}
