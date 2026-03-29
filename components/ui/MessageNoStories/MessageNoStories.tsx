import styles from './MessageNoStories.module.css';

type Props = {
  onBack?: () => void;
};

export default function MessageNoStories({ onBack }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Цей користувач ще не публікував історій</p>

      <button onClick={onBack} className={styles.button}>
        Назад до історій
      </button>
    </div>
  );
}
