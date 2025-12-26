import React from 'react';
import styles from './SuggestionCard.module.css';

/**
 * Card component for displaying stress relief suggestions
 * @param {object} props
 * @param {string} props.icon - Icon/emoji for the suggestion
 * @param {string} props.title - Suggestion title
 * @param {string} props.description - Suggestion description
 */
const SuggestionCard = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default SuggestionCard;
