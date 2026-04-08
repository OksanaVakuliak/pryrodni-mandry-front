'use client';

import { forwardRef, useState } from 'react';
import { Input } from '../Input/Input';
import { Icon } from '../Icon/Icon';
import styles from './PasswordInput.module.css';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', style, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const iconId = showPassword ? 'icon-eye' : 'icon-eye-blocked';

    return (
      <div className={`${styles.wrapper} ${className}`} style={style}>
        <Input
          ref={ref}
          label={label}
          error={error}
          type={showPassword ? 'text' : 'password'}
          className={styles.passwordField}
          {...props}
        />

        <button
          type="button"
          className={styles.eyeButton}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
        >
          <Icon
            name={iconId}
            className={styles.eyeIcon}
            width={15}
            height={15}
          />
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
