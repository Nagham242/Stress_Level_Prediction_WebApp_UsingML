import React from 'react';
import styles from './StressorSelector.module.css';

/**
 * Multi-select component for stress triggers
 * @param {object} props
 * @param {string} props.label - Component label
 * @param {Array} props.options - Available options
 * @param {Array} props.selectedValues - Currently selected values
 * @param {function} props.onChange - Change handler
 */
const StressorSelector = ({
  label,
  options = [],
  selectedValues = [],
  onChange,
  className = '',
}) => {
  const handleToggle = (option) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.options}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleToggle(option)}
              aria-pressed={isSelected}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StressorSelector;
