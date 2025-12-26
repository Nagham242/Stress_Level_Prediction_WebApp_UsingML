import React from 'react';
import styles from './Button.module.css';

/**
 * Reusable Button component with multiple variants
 * @param {object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg'} props.size - Button size
 * @param {boolean} props.fullWidth - Whether button takes full width
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.icon - Optional icon to display
 * @param {function} props.onClick - Click handler
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <>
          <span className={styles.content}>{children}</span>
          {icon && <span className={styles.icon}>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
