import React from 'react';
import styles from './QuestionCard.module.css';

/**
 * Reusable card component for wrapping question sections
 * @param {object} props
 * @param {string} props.title - Section title
 * @param {string} props.icon - Section icon/emoji
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
const QuestionCard = ({
  title,
  icon,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || icon) && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default QuestionCard;
