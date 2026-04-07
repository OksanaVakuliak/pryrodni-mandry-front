'use client';
import { useCallback, useRef, useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  return (
    <div ref={overlay} className={css.backdrop} onClick={onClick}>
      <div ref={wrapper} className={css.content}>
        <button
          onClick={onDismiss}
          className={css.closeBtn}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
