import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ResultCard, SuggestionCard } from '../components';
import { stressResultConfig } from '../data/questionsConfig';
import styles from './Result.module.css';

/**
 * Result page - Displays stress level assessment results
 * Shows the ML-predicted stress level with probabilities, suggestions and a comforting message
 */
const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get stress level and probabilities from navigation state
  const stressLevel = location.state?.stressLevel || 'medium';
  const probabilities = location.state?.probabilities || null;
  const resultData = stressResultConfig[stressLevel];

  // Redirect to home if no state (direct URL access)
  useEffect(() => {
    if (!location.state) {
      // Allow viewing with default data for demo purposes
      console.log('No assessment data found, showing demo result');
    }
  }, [location.state]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetakeAssessment = () => {
    navigate('/questionnaire');
  };

  // Find the highest probability class
  const getHighestProbClass = () => {
    if (!probabilities) return null;
    const entries = Object.entries(probabilities);
    return entries.reduce((max, curr) => curr[1] > max[1] ? curr : max)[0];
  };

  const highestClass = getHighestProbClass();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleRetakeAssessment}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button 
          className={styles.menuButton}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <h1 className={styles.title}>Your Stress Level Today</h1>

        {/* Result Card */}
        <ResultCard
          level={resultData.level}
          color={resultData.color}
          message={resultData.message}
          description={resultData.description}
        />

        {/* Probability Section */}
        {probabilities && (
          <section className={styles.probabilitySection}>
            <h2 className={styles.probabilityTitle}>Prediction Confidence</h2>
            <div className={styles.probabilityBars}>
              {/* Low */}
              <div className={`${styles.probabilityItem} ${highestClass === 'low' ? styles.highlighted : ''}`}>
                <div className={styles.probabilityLabel}>
                  <span className={styles.probabilityEmoji}>🟢</span>
                  <span>Low</span>
                  <span className={styles.probabilityValue}>{probabilities.low}%</span>
                </div>
                <div className={styles.probabilityBarContainer}>
                  <div 
                    className={styles.probabilityBar} 
                    style={{ 
                      width: `${probabilities.low}%`,
                      backgroundColor: '#4A7C59'
                    }} 
                  />
                </div>
              </div>
              
              {/* Medium */}
              <div className={`${styles.probabilityItem} ${highestClass === 'medium' ? styles.highlighted : ''}`}>
                <div className={styles.probabilityLabel}>
                  <span className={styles.probabilityEmoji}>🟡</span>
                  <span>Medium</span>
                  <span className={styles.probabilityValue}>{probabilities.medium}%</span>
                </div>
                <div className={styles.probabilityBarContainer}>
                  <div 
                    className={styles.probabilityBar} 
                    style={{ 
                      width: `${probabilities.medium}%`,
                      backgroundColor: '#C4A35A'
                    }} 
                  />
                </div>
              </div>
              
              {/* High */}
              <div className={`${styles.probabilityItem} ${highestClass === 'high' ? styles.highlighted : ''}`}>
                <div className={styles.probabilityLabel}>
                  <span className={styles.probabilityEmoji}>🔴</span>
                  <span>High</span>
                  <span className={styles.probabilityValue}>{probabilities.high}%</span>
                </div>
                <div className={styles.probabilityBarContainer}>
                  <div 
                    className={styles.probabilityBar} 
                    style={{ 
                      width: `${probabilities.high}%`,
                      backgroundColor: '#A94442'
                    }} 
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Suggestions Section */}
        <section className={styles.suggestionsSection}>
          <h2 className={styles.suggestionsTitle}>Gentle Suggestions</h2>
          <div className={styles.suggestionsList}>
            {resultData.suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                icon={suggestion.icon}
                title={suggestion.title}
                description={suggestion.description}
              />
            ))}
          </div>
        </section>

        {/* Action buttons */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleGoHome}
          >
            Go Back to Homepage
          </Button>
          
          <button 
            className={styles.retakeLink}
            onClick={handleRetakeAssessment}
          >
            Take assessment again
          </button>
        </div>
      </main>
    </div>
  );
};

export default Result;
