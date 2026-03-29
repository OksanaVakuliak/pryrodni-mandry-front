'use client';

import styles from './ConfirmModal.module.css';

type Props = {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ConfirmModal({ isOpen, onConfirm, onCancel }: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onCancel}>
          ✕
        </button>

        <h2 className={styles.title}>Ви точно хочете вийти?</h2>

        <p className={styles.subtitle}>Ми будемо сумувати за вами!</p>

        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>
            Відмінити
          </button>

          <button onClick={onConfirm} className={styles.confirm}>
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
