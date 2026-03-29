import Image from 'next/image';
import styles from './StoryCard.module.css';

type Props = {
  title: string;
  img: string;
  author: string;
  createdAt: string;
  onOpen?: () => void;
  onSave?: () => void;
};

export default function StoryCard({
  title,
  img,
  author,
  createdAt,
  onOpen,
  onSave,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={title} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {author} • {createdAt}
        </p>

        <h3 className={styles.title}>{title}</h3>

        <div className={styles.actions}>
          <button onClick={onOpen} className={styles.button}>
            Переглянути статтю
          </button>

          <button onClick={onSave} className={styles.iconBtn}>
            📑
          </button>
        </div>
      </div>
    </div>
  );
}
