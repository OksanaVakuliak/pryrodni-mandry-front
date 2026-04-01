'use client';

import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Button } from '@/components/ui/Button/Button';
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

        <PageTitle className={styles.title} tag="h2">
          Ви точно хочете вийти?
        </PageTitle>

        <p className={styles.subtitle}>Ми будемо сумувати за вами!</p>

        <div className={styles.actions}>
          <Button
            onClick={onCancel}
            className={styles.bottom}
            variant="secondary"
          >
            Відмінити
          </Button>

          <Button
            onClick={onConfirm}
            className={styles.bottom}
            variant="primary"
          >
            Вийти
          </Button>
        </div>
      </div>
    </div>
  );
}
