'use client';
import { forwardRef, TextareaHTMLAttributes, useId, useRef } from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', id, value, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;

    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.textareaWrapper}>
          <textarea
            {...props}
            value={value}
            id={textareaId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
          />
        </div>
        {error && (
          <span id={errorId} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
