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
        <Button className={styles.close} onClick={onCancel}>
          ✕
        </Button>

        <PageTitle className={styles.title} tag="h2">
          Ви точно хочете вийти?
        </PageTitle>

        <p className={styles.subtitle}>Ми будемо сумувати за вами!</p>

        <div className={styles.actions}>
          <Button
            onClick={onCancel}
            className={styles.cancel}
            variant="secondary"
          >
            Відмінити
          </Button>

          <Button
            onClick={onConfirm}
            className={styles.confirm}
            variant="primary"
          >
            Вийти
          </Button>
        </div>
      </div>
    </div>
  );
}
