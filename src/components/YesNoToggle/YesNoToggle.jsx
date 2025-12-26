import React from 'react';
import styles from './YesNoToggle.module.css';

/**
 * Yes/No toggle button component
 * @param {object} props
 * @param {string} props.label - Component label
 * @param {boolean|null} props.value - Current value (true = Yes, false = No, null = unselected)
 * @param {function} props.onChange - Change handler
 */
const YesNoToggle = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.yes} ${value === true ? styles.selected : ''}`}
          onClick={() => onChange(true)}
          aria-pressed={value === true}
        >
          <span className={styles.icon}>✓</span>
          <span>Yes</span>
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.no} ${value === false ? styles.selected : ''}`}
          onClick={() => onChange(false)}
          aria-pressed={value === false}
        >
          <span className={styles.icon}>✕</span>
          <span>No</span>
        </button>
      </div>
    </div>
  );
};

export default YesNoToggle;
