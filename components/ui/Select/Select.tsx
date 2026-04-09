'use client';

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useId,
} from 'react';
import styles from './Select.module.css';
import { Icon } from '../Icon/Icon';

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
    const listRef = useRef<HTMLUListElement>(null);
    const generatedId = useId();
    const labelId = `${generatedId}-label`;
    const buttonContentId = `${generatedId}-button-content`;
    const listboxId = `${generatedId}-listbox`;
    const errorId = `${generatedId}-error`;

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

    useEffect(() => {
      if (isOpen && listRef.current) {
        const activeItem = listRef.current.querySelector(
          `.${styles.dropdownItemActive}`,
        ) as HTMLElement;
        if (activeItem) {
          activeItem.focus();
        } else {
          (listRef.current.firstChild as HTMLElement)?.focus();
        }
      }
    }, [isOpen]);

    const toggleDropdown = () => {
      if (options.length > 0) setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (optionValue: string | number) => {
      onChange(optionValue);
      setIsOpen(false);
    };

    const handleKeyDown = (
      e: React.KeyboardEvent,
      optionValue: string | number,
    ) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOptionClick(optionValue);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const selectedOption = options.find((option) => option.value === value);
    return (
      <div className={`${styles.container} ${className}`} ref={containerRef}>
        {label && (
          <label id={labelId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.selectWrapper}>
          <button
            type="button"
            className={`${styles.selectButton} ${error ? styles.selectError : ''} ${isOpen ? styles.selectButtonOpen : ''}`}
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={
              label ? `${labelId} ${buttonContentId}` : undefined
            }
            aria-describedby={error ? errorId : undefined}
          >
            <span
              id={buttonContentId}
              className={
                selectedOption ? styles.selectedValue : styles.placeholder
              }
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <Icon
              name={isOpen ? 'icon-arrow_up' : 'icon-arrow_down'}
              className={styles.arrowIcon}
              width={16}
              height={16}
            />
          </button>

          {isOpen && (
            <ul
              ref={listRef}
              id={listboxId}
              className={styles.dropdownList}
              role="listbox"
              aria-labelledby={labelId}
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className={`${styles.dropdownItem} ${isSelected ? styles.dropdownItemActive : ''}`}
                    onClick={() => handleOptionClick(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, option.value)}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
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

Select.displayName = 'Select';
