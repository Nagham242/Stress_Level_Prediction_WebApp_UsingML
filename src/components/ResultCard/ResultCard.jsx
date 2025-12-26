import React from 'react';
import styles from './ResultCard.module.css';

/**
 * Result display card showing stress level with circular gauge
 * @param {object} props
 * @param {string} props.level - Stress level ('Low', 'Moderate', 'High')
 * @param {string} props.color - Color for the level indicator
 * @param {string} props.message - Main message
 * @param {string} props.description - Additional description
 */
const ResultCard = ({
  level,
  color,
  message,
  description,
  className = '',
}) => {
  // Map level to percentage for the circular gauge
  const levelPercentages = {
    Low: 25,
    Moderate: 65,
    High: 90,
  };
  const percentage = levelPercentages[level] || 50;
  
  // Calculate stroke dasharray for the circular progress
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.gaugeContainer}>
        <svg className={styles.gauge} viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#F4CCE9"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={styles.progressCircle}
            transform="rotate(-90 100 100)"
          />
          {/* Center accent */}
          <circle
            cx="100"
            cy="10"
            r="6"
            fill="#D17D98"
            className={styles.accentDot}
            style={{
              transform: `rotate(${(percentage / 100) * 360 - 90}deg)`,
              transformOrigin: '100px 100px',
            }}
          />
        </svg>
        
        <div className={styles.gaugeContent}>
          <span className={styles.resultLabel}>RESULT</span>
          <span className={styles.resultLevel} style={{ color }}>
            {level}
          </span>
        </div>
      </div>
      
      <div className={styles.messageContainer}>
        <p className={styles.message}>{message}</p>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
