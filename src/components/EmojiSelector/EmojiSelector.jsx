import React from 'react';
import styles from './EmojiSelector.module.css';

/**
 * Emoji-based selection component for satisfaction ratings
 * @param {object} props
 * @param {string} props.label - Component label
 * @param {Array} props.options - Array of { value, emoji, label } objects
 * @param {string} props.value - Currently selected value
 * @param {function} props.onChange - Change handler
 */
const EmojiSelector = ({
  label,
  options = [],
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.options}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              title={option.label}
            >
              <span className={styles.emoji}>{option.emoji}</span>
              {option.label && (
                <span className={styles.optionLabel}>{option.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmojiSelector;
