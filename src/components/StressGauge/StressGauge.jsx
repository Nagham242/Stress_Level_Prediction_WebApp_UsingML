import React from 'react';
import styles from './StressGauge.module.css';

/**
 * Stress Level Gauge SVG component matching app theme colors
 * Displays a semicircular gauge with LOW to HIGH stress indicators
 */
const StressGauge = ({ className = '' }) => {
  // Center point and radius for the gauge
  const cx = 150;
  const cy = 150;
  const outerRadius = 120;
  const arcWidth = 30;
  
  return (
    <div className={`${styles.container} ${className}`}>
      <svg
        viewBox="0 0 300 200"
        className={styles.gauge}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background arc for smooth appearance */}
        <path
          d="M 30 150 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="#F0E0E8"
          strokeWidth="32"
          strokeLinecap="round"
        />
        
        {/* Gauge segments - from LOW (left) to HIGH (right) */}
        {/* Low stress - Soft pink/light (left section) */}
        <path
          d="M 30 150 A 120 120 0 0 1 70 62"
          fill="none"
          stroke="#F4CCE9"
          strokeWidth="30"
          strokeLinecap="round"
        />
        {/* Low-Medium - Medium pink */}
        <path
          d="M 70 62 A 120 120 0 0 1 150 30"
          fill="none"
          stroke="#D17D98"
          strokeWidth="30"
          strokeLinecap="butt"
        />
        {/* Medium-High - Deeper pink */}
        <path
          d="M 150 30 A 120 120 0 0 1 230 62"
          fill="none"
          stroke="#A94464"
          strokeWidth="30"
          strokeLinecap="butt"
        />
        {/* High stress - Dark burgundy (right section) */}
        <path
          d="M 230 62 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="#7D1C4A"
          strokeWidth="30"
          strokeLinecap="round"
        />
        
        {/* Inner white area */}
        <path
          d="M 60 150 A 90 90 0 0 1 240 150"
          fill="none"
          stroke="white"
          strokeWidth="45"
        />
        
        {/* Tick marks - on the white inner area */}
        <g stroke="#56021F" strokeWidth="2" strokeLinecap="round">
          {/* Tick at 180° (left) */}
          <line x1="60" y1="150" x2="80" y2="150" />
          {/* Tick at 150° */}
          <line x1="72" y1="105" x2="90" y2="115" />
          {/* Tick at 120° */}
          <line x1="105" y1="72" x2="118" y2="88" />
          {/* Tick at 90° (top) */}
          <line x1="150" y1="60" x2="150" y2="80" />
          {/* Tick at 60° */}
          <line x1="195" y1="72" x2="182" y2="88" />
          {/* Tick at 30° */}
          <line x1="228" y1="105" x2="210" y2="115" />
          {/* Tick at 0° (right) */}
          <line x1="240" y1="150" x2="220" y2="150" />
        </g>
        
        {/* Center decorative circle */}
        <circle cx="150" cy="150" r="12" fill="#56021F" />
        <circle cx="150" cy="150" r="6" fill="#7D1C4A" />
        
        {/* Needle pointing to middle-low area */}
        <g transform="rotate(-35, 150, 150)">
          <polygon
            points="150,55 145,145 150,150 155,145"
            fill="#56021F"
          />
          <circle cx="150" cy="150" r="8" fill="#56021F" />
        </g>
        
        {/* LOW label - positioned outside the arc on left */}
        <text
          x="15"
          y="175"
          fill="#56021F"
          fontSize="13"
          fontWeight="700"
          fontFamily="Poppins, sans-serif"
          textAnchor="start"
        >
          LOW
        </text>
        
        {/* HIGH label - positioned outside the arc on right */}
        <text
          x="285"
          y="175"
          fill="#56021F"
          fontSize="13"
          fontWeight="700"
          fontFamily="Poppins, sans-serif"
          textAnchor="end"
        >
          HIGH
        </text>
      </svg>
      
      {/* Stress Level text below */}
      <p className={styles.label}>STRESS LEVEL</p>
    </div>
  );
};

export default StressGauge;
