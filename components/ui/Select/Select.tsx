'use client';

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './Select.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      error,
      placeholder = 'Оберіть зі списку...',
      className = '',
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
      if (options.length > 0) setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue: string | number) => {
      onChange(optionValue);
      setIsOpen(false);
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
      <div className={`${styles.container} ${className}`} ref={containerRef}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.selectWrapper}>
          <button
            type="button"
            className={`${styles.selectButton} ${error ? styles.selectError : ''} ${isOpen ? styles.selectButtonOpen : ''}`}
            onClick={toggleDropdown}
          >
            <span
              className={
                selectedOption ? styles.selectedValue : styles.placeholder
              }
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg className={styles.arrowIcon}>
              <use
                href={`/Icons/sprite.svg#${isOpen ? 'icon-arrow_up' : 'icon-arrow_down'}`}
              />
            </svg>
          </button>

          {isOpen && (
            <ul className={styles.dropdownList} role="listbox">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`${styles.dropdownItem} ${option.value === value ? styles.dropdownItemActive : ''}`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
