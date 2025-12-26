/**
 * Validation utilities for the questionnaire
 * Handles input validation and form state validation
 */

/**
 * Validates a numeric input within a specified range
 * @param {number} value - The value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateNumericInput = (value, min, max) => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'This field is required' };
  }
  
  const numValue = Number(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (numValue < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }
  
  if (numValue > max) {
    return { isValid: false, error: `Value must be at most ${max}` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validates that a required field has been answered
 * @param {any} value - The value to check
 * @returns {boolean} - True if the field has a valid response
 */
export const isFieldAnswered = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

/**
 * Validates the entire questionnaire answers object
 * @param {object} answers - The answers object to validate
 * @param {object} questionsConfig - The questions configuration
 * @returns {object} - { isValid: boolean, errors: object, missingFields: string[] }
 */
export const validateQuestionnaire = (answers, questionsConfig) => {
  const errors = {};
  const missingFields = [];
  
  Object.entries(questionsConfig).forEach(([sectionKey, section]) => {
    Object.entries(section.questions).forEach(([questionKey, question]) => {
      const value = answers[question.id];
      
      // Check if field depends on another field
      if (question.dependsOn) {
        const dependentValue = answers[question.dependsOn.field];
        if (dependentValue !== question.dependsOn.value) {
          // Skip validation if dependency condition is not met
          return;
        }
      }
      
      // Validate based on question type
      if (question.type === 'number' || question.type === 'range') {
        const validation = validateNumericInput(value, question.min, question.max);
        if (!validation.isValid) {
          errors[question.id] = validation.error;
          missingFields.push(question.label);
        }
      } else if (!isFieldAnswered(value)) {
        errors[question.id] = 'This field is required';
        missingFields.push(question.label);
      }
    });
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    missingFields,
  };
};

/**
 * Clamps a numeric value within a range
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - The clamped value
 */
export const clampValue = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Calculates mock stress prediction based on answers
 * This will be replaced with actual ML prediction API call later
 * @param {object} answers - The questionnaire answers
 * @returns {string} - 'low', 'medium', or 'high'
 */
export const calculateMockStressLevel = (answers) => {
  let stressScore = 0;
  
  // Sleep factor (less sleep = more stress)
  if (answers.sleepHours < 5) stressScore += 20;
  else if (answers.sleepHours < 7) stressScore += 10;
  else if (answers.sleepHours > 9) stressScore += 5;
  
  // Work hours factor
  if (answers.workStudyHours > 10) stressScore += 15;
  else if (answers.workStudyHours > 8) stressScore += 8;
  
  // Hobby time (less = more stress)
  if (answers.hobbiesHours < 0.5) stressScore += 10;
  else if (answers.hobbiesHours < 1) stressScore += 5;
  
  // Tasks to complete
  if (answers.tasksToComplete > 10) stressScore += 15;
  else if (answers.tasksToComplete > 7) stressScore += 8;
  
  // Task difficulty
  if (answers.taskDifficulty === 'Hard') stressScore += 12;
  else if (answers.taskDifficulty === 'Medium') stressScore += 6;
  
  // Feeling under pressure
  const pressureScores = {
    'Not stressed': 0,
    'Slightly stressed': 12,
    'Highly stressed': 25,
  };
  stressScore += pressureScores[answers.feelingUnderPressure] || 0;
  
  // Social interaction (less = more stress, but depends on quality)
  if (answers.socialInteractionHours < 1) stressScore += 8;
  
  // Interaction quality
  const qualityScores = {
    'low': 15,
    'medium': 5,
    'high': -5,
  };
  stressScore += qualityScores[answers.interactionQuality] || 0;
  
  // Home environment
  const homeScores = {
    'Dissatisfied': 15,
    'Satisfied': -5,
  };
  stressScore += homeScores[answers.homeEnvironment] || 0;
  
  // Stressful events and triggers
  if (answers.stressfulEvents) {
    stressScore += 10;
    if (answers.stressTriggers && answers.stressTriggers.length > 0) {
      stressScore += answers.stressTriggers.length * 5;
    }
  }
  
  // Overthinking frequency
  const overthinkingScores = {
    'Never': 0,
    'Rarely': 5,
    'Often': 12,
    'Almost always': 20,
  };
  stressScore += overthinkingScores[answers.overthinkingFrequency] || 0;
  
  // Normalize and categorize
  // Max possible score is roughly 120-150
  if (stressScore < 35) return 'low';
  if (stressScore < 65) return 'medium';
  return 'high';
};

export default {
  validateNumericInput,
  isFieldAnswered,
  validateQuestionnaire,
  clampValue,
  calculateMockStressLevel,
};
