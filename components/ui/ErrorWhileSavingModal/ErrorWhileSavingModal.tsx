'use client';

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
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Помилка під час збереження</h2>

        <p className={styles.subtitle}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>

        <div className={styles.actions}>
          <button onClick={onLogin} className={styles.login}>
            Увійти
          </button>

          <button onClick={onRegister} className={styles.register}>
            Зареєструватись
          </button>
        </div>
      </div>
    </div>
  );
}
