import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import StressGauge from '../components/StressGauge';
import styles from './Home.module.css';

/**
 * Home page - Welcome screen for the stress assessment app
 * Features a calming design with gradient background and call-to-action
 */
const Home = () => {
  const navigate = useNavigate();

  const handleStartCheckIn = () => {
    navigate('/questionnaire');
  };

  return (
    <div className={styles.container}>
      {/* Main centered content */}
      <div className={styles.content}>
        {/* Decorative leaf icon */}
        <div className={styles.leafIcon}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4C16 4 10 8 10 16C10 24 16 28 16 28C16 28 22 24 22 16C22 8 16 4 16 4Z"
              fill="#7D1C4A"
            />
            <path
              d="M16 8C16 8 12 12 12 16C12 20 16 24 16 24"
              stroke="#D17D98"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Stress Gauge Image */}
        <div className={styles.gaugeWrapper}>
          <StressGauge />
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          How are you feeling today?
        </h1>
        
        {/* Description */}
        <p className={styles.description}>
          Take a moment to pause. This short check-in is designed to help you 
          understand your current stress levels and find gentle ways to cope.
        </p>
        
        <p className={styles.supportText}>
          No judgment, just support. 💜
        </p>

        {/* Call to action button */}
        <div className={styles.ctaSection}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStartCheckIn}
            icon="→"
          >
            Start Check-in
          </Button>
          
          <p className={styles.readyText}>
            Press when you're ready 🌿
          </p>
        </div>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          This is for self-reflection and is not a clinical diagnosis.
        </p>
      </div>
    </div>
  );
};

export default Home;
