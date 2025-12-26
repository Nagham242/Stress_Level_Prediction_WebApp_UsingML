import React, { useState, useEffect, useRef } from 'react';
import { clampValue } from '../../utils/validation';
import styles from './NumberInput.module.css';

/**
 * Reusable Number Input component with increment/decrement buttons
 * @param {object} props
 * @param {string} props.name - Input name
 * @param {string} props.label - Input label
 * @param {string} props.sublabel - Optional sublabel
 * @param {number} props.value - Current value
 * @param {function} props.onChange - Change handler
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {boolean} props.integerOnly - Only allow integer values
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.error - Error message
 */
const NumberInput = ({
  name,
  label,
  sublabel,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  integerOnly = false,
  required = false,
  error,
  className = '',
}) => {
  // Local state for smooth typing experience
  const [localValue, setLocalValue] = useState(value?.toString() ?? '');
  const debounceRef = useRef(null);

  // Sync local value with prop value when it changes externally
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setLocalValue(value.toString());
    }
  }, [value]);

  const handleIncrement = () => {
    const currentVal = parseFloat(localValue) || 0;
    let newValue = clampValue(currentVal + step, min, max);
    if (integerOnly) {
      newValue = Math.round(newValue);
    }
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  const handleDecrement = () => {
    const currentVal = parseFloat(localValue) || 0;
    let newValue = clampValue(currentVal - step, min, max);
    if (integerOnly) {
      newValue = Math.round(newValue);
    }
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow empty input for typing
    if (inputValue === '' || inputValue === '-') {
      setLocalValue(inputValue);
      return;
    }

    // Allow partial decimal input (e.g., "3." while typing "3.5")
    if (!integerOnly && /^-?\d*\.?\d*$/.test(inputValue)) {
      setLocalValue(inputValue);
      
      // Debounce the actual value update for smooth typing
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue)) {
          const clampedValue = clampValue(numValue, min, max);
          onChange(clampedValue);
          if (clampedValue !== numValue) {
            setLocalValue(clampedValue.toString());
          }
        }
      }, 500);
    } else if (integerOnly && /^-?\d*$/.test(inputValue)) {
      setLocalValue(inputValue);
      
      // Debounce the actual value update
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue)) {
          const clampedValue = clampValue(numValue, min, max);
          onChange(clampedValue);
          if (clampedValue !== numValue) {
            setLocalValue(clampedValue.toString());
          }
        }
      }, 500);
    }
  };

  const handleBlur = () => {
    // Clear any pending debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Finalize the value on blur
    if (localValue === '' || localValue === '-') {
      setLocalValue(min.toString());
      onChange(min);
      return;
    }
    
    let numValue = integerOnly ? parseInt(localValue, 10) : parseFloat(localValue);
    if (isNaN(numValue)) {
      numValue = min;
    }
    
    const clampedValue = clampValue(numValue, min, max);
    if (integerOnly) {
      const intValue = Math.round(clampedValue);
      setLocalValue(intValue.toString());
      onChange(intValue);
    } else {
      setLocalValue(clampedValue.toString());
      onChange(clampedValue);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
      
      <div className={styles.inputWrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={handleDecrement}
          disabled={parseFloat(localValue) <= min}
          aria-label="Decrease value"
        >
          <span className={styles.buttonIcon}>−</span>
        </button>
        
        <input
          type="text"
          inputMode={integerOnly ? "numeric" : "decimal"}
          id={name}
          name={name}
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        
        <button
          type="button"
          className={styles.button}
          onClick={handleIncrement}
          disabled={parseFloat(localValue) >= max}
          aria-label="Increase value"
        >
          <span className={styles.buttonIcon}>+</span>
        </button>
      </div>
      
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default NumberInput;
