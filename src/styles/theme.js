/**
 * Theme configuration for the Stress Level Prediction App
 * All design tokens are centralized here for consistency
 */

export const theme = {
  colors: {
    // Primary palette
    primary: '#56021F',
    primaryDark: '#7D1C4A',
    primaryMedium: '#D17D98',
    primaryLight: '#F4CCE9',
    
    // Backgrounds
    backgroundLight: '#FDF8FB',
    backgroundCard: '#FFFFFF',
    backgroundGradientStart: '#FDF8FB',
    backgroundGradientEnd: '#F4CCE9',
    
    // Text colors
    textDark: '#56021F',
    textMedium: '#7D1C4A',
    textLight: '#9E6B7D',
    textMuted: '#B8A0A8',
    
    // UI elements
    border: '#F4CCE9',
    borderFocus: '#D17D98',
    shadow: 'rgba(125, 28, 74, 0.1)',
    shadowHover: 'rgba(125, 28, 74, 0.15)',
    
    // Status colors
    success: '#4A7C59',
    warning: '#C4A35A',
    error: '#A94442',
    
    // Stress level colors
    stressLow: '#4A7C59',
    stressMedium: '#C4A35A',
    stressHigh: '#A94442',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '50%',
    pill: '999px',
  },
  
  shadows: {
    sm: '0 2px 8px rgba(125, 28, 74, 0.08)',
    md: '0 4px 16px rgba(125, 28, 74, 0.1)',
    lg: '0 8px 32px rgba(125, 28, 74, 0.12)',
    card: '0 4px 20px rgba(125, 28, 74, 0.08)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '400ms ease',
  },
  
  typography: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px',
      hero: '40px',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export default theme;
