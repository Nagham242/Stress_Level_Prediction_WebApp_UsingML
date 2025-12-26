import React from 'react';
import styles from './RangeSlider.module.css';

/**
 * Reusable Range Slider component with custom styling
 * @param {object} props
 * @param {string} props.name - Input name
 * @param {string} props.label - Slider label
 * @param {string} props.sublabel - Optional sublabel
 * @param {number} props.value - Current value
 * @param {function} props.onChange - Change handler
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {boolean} props.showNumbers - Show number scale above slider
 * @param {object} props.labels - Start and end labels
 */
const RangeSlider = ({
  name,
  label,
  sublabel,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showNumbers = false,
  labels = { start: '', end: '' },
  className = '',
}) => {
  // Calculate percentage for gradient and thumb position
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  // Generate number scale for display
  const generateNumberScale = () => {
    const numbers = [];
    for (let i = min; i <= max; i += step) {
      numbers.push(i);
    }
    return numbers;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
      
      {/* Number scale above slider */}
      {showNumbers && (
        <div className={styles.numberScale}>
          {generateNumberScale().map((num) => (
            <span 
              key={num} 
              className={`${styles.scaleNumber} ${value === num ? styles.activeNumber : ''}`}
            >
              {num}
            </span>
          ))}
        </div>
      )}
      
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, #7D1C4A ${percentage}%, #F4CCE9 ${percentage}%)`,
          }}
        />
        
        <div className={styles.track}>
          <div 
            className={styles.trackFill} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      {(labels.start || labels.end) && (
        <div className={styles.rangeLabels}>
          <span className={styles.rangeLabel}>{labels.start}</span>
          <span className={styles.rangeLabel}>{labels.end}</span>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;
