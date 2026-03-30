import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.textareaWrapper}>
          <textarea
            ref={ref}
            id={textareaId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
            {...props}
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
