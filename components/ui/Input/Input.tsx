'use client';
import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconId?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, iconId, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.inputContainer} ${className}`}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            {...props}
          />

          {iconId && (
            <svg className={styles.icon}>
              <use href={`/Icons/sprite.svg#${iconId}`} />
            </svg>
          )}
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
