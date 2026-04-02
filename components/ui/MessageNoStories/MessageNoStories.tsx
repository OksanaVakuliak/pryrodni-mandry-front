import styles from '@/components/ui/MessageNoStories/MessageNoStories.module.css';
import { Button } from '@/components/ui/Button/Button';

type Props = {
  onBack?: () => void;
};

export default function MessageNoStories({ onBack }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Цей користувач ще не публікував історій</p>

      <Button onClick={onBack} className={styles.button}>
        Назад до історій
      </Button>
    </div>
  );
}
