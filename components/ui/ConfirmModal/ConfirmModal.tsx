'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Button } from '@/components/ui/Button/Button';
import toast from 'react-hot-toast';
import { logout } from '@/lib/api/clientApi';

import styles from './ConfirmModal.module.css';

type Props = {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ConfirmModal({ isOpen, onConfirm, onCancel }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success('Ви вийшли');
      onConfirm?.();
    } catch (error: unknown) {
      console.error('Logout error', error);
      toast.error('Не вдалося вийти');
    } finally {
      setIsLoading(false);
    }
  };

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
            disabled={isLoading}
          >
            Відмінити
          </Button>

          <Button
            onClick={handleConfirm}
            className={styles.bottom}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Вихід...' : 'Вийти'}
          </Button>
        </div>
      </div>
    </div>
  );
}
