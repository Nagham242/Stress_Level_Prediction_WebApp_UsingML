import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';

/**
 * Custom Select dropdown component
 * @param {object} props
 * @param {string} props.name - Input name
 * @param {string} props.label - Select label
 * @param {Array} props.options - Array of options
 * @param {string} props.value - Currently selected value
 * @param {function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 */
const Select = ({
  name,
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={selectRef}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.value : styles.placeholder}>
          {value || placeholder}
        </span>
        <span className={styles.arrow}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      
      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.option} ${value === option ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={value === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
