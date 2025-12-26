import React from 'react';
import styles from './ProgressBar.module.css';

/**
 * Progress bar component for showing questionnaire completion
 * @param {object} props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {boolean} props.showLabel - Whether to show percentage label
 */
const ProgressBar = ({
  progress = 0,
  showLabel = true,
  className = '',
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.track}>
        <div 
          className={styles.fill}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(clampedProgress)}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
