'use client';

import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import styles from './ErrorWhilesavingModal.module.css';

type Props = {
  isOpen: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onClose?: () => void;
};

export default function ErrorWhileSavingModal({
  isOpen,
  onLogin,
  onRegister,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button onClick={onClose} className={styles.close}>
          X
        </Button>

        <PageTitle className={styles.title} tag="h2">
          Помилка під час збереження
        </PageTitle>

        <p className={styles.subtitle}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>

        <div className={styles.actions}>
          <Button onClick={onLogin} variant="secondary">
            Увійти
          </Button>

          <Button onClick={onRegister} variant="primary">
            Зареєструватись
          </Button>
        </div>
      </div>
    </div>
  );
}
