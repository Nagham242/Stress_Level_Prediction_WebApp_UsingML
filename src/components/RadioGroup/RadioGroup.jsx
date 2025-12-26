import React from 'react';
import styles from './RadioGroup.module.css';

/**
 * Reusable Radio Group component supporting different display styles
 * @param {object} props
 * @param {string} props.name - Input group name
 * @param {string} props.label - Group label
 * @param {string} props.sublabel - Optional sublabel/note
 * @param {Array} props.options - Array of options (strings or objects with value/label)
 * @param {string} props.value - Currently selected value
 * @param {function} props.onChange - Change handler
 * @param {'chip' | 'list' | 'button'} props.variant - Display variant
 * @param {boolean} props.required - Whether the field is required
 */
const RadioGroup = ({
  name,
  label,
  sublabel,
  options = [],
  value,
  onChange,
  variant = 'chip',
  required = false,
  className = '',
}) => {
  const handleChange = (optionValue) => {
    onChange(optionValue);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <div className={styles.labelContainer}>
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
          {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        </div>
      )}
      <div className={`${styles.options} ${styles[variant]}`}>
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          const isSelected = value === optionValue;

          return (
            <label
              key={optionValue}
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={isSelected}
                onChange={() => handleChange(optionValue)}
                className={styles.input}
              />
              <span className={styles.optionContent}>
                {variant === 'list' && (
                  <span className={styles.radio}>
                    {isSelected && <span className={styles.radioDot} />}
                  </span>
                )}
                <span className={styles.optionLabel}>{optionLabel}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
