'use client';
import { useCallback, useRef, useEffect } from 'react';
import css from './Modal.module.css';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';

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
        return;
      }

      if (e.key === 'Tab' && wrapper.current) {
        const focusable = wrapper.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const focusable = wrapper.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

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
      <div
        ref={wrapper}
        className={css.content}
        role="dialog"
        aria-modal="true"
        aria-label="Модальне вікно"
      >
        <Button
          variant="secondary"
          onClick={onDismiss}
          className={css.closeBtn}
          aria-label="Закрити модальне вікно"
        >
          <Icon
            name="icon-close"
            width={24}
            height={24}
            className={css.closeIcon}
          />
        </Button>
        {children}
      </div>
    </div>
  );
}
