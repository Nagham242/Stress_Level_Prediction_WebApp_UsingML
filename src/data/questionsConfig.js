/**
 * Questions configuration for the stress assessment questionnaire
 * This centralized config makes it easy to modify questions and connect to backend later
 */

export const questionsConfig = {
  // Profile Section
  profile: {
    sectionTitle: 'Profile',
    sectionIcon: '👤',
    questions: {
      ageRange: {
        id: 'ageRange',
        label: 'Age Range',
        type: 'radio',
        options: ['<18', '18-24', '25-35', '36+'],
        defaultValue: null,
      },
      gender: {
        id: 'gender',
        label: 'Gender',
        type: 'radio',
        options: ['Male', 'Female'],
        defaultValue: null,
      },
      currentStatus: {
        id: 'currentStatus',
        label: 'Current Status',
        type: 'radioList',
        options: ['Student', 'Employed', 'Both', 'Neither'],
        defaultValue: null,
      },
    },
  },

  // Routine Section
  routine: {
    sectionTitle: 'Routine',
    sectionIcon: '🌙',
    questions: {
      sleepHours: {
        id: 'sleepHours',
        label: 'Sleep',
        sublabel: 'Hours last night',
        type: 'number',
        min: 0,
        max: 24,
        step: 0.5,
        defaultValue: 7,
      },
      workStudyHours: {
        id: 'workStudyHours',
        label: 'Work/Study',
        sublabel: 'Hours today',
        type: 'number',
        min: 0,
        max: 24,
        step: 0.5,
        defaultValue: 8,
      },
      hobbiesHours: {
        id: 'hobbiesHours',
        label: 'Hobbies',
        sublabel: 'Me-time hours',
        type: 'number',
        min: 0,
        max: 24,
        step: 0.5,
        defaultValue: 1,
      },
      commuteTime: {
        id: 'commuteTime',
        label: 'Commute today (mins)',
        sublabel: 'Select the closest number',
        type: 'radioChip',
        options: ['15', '45', '60', '150'],
        defaultValue: null,
      },
    },
  },

  // Load & Pressure Section
  loadPressure: {
    sectionTitle: 'Load & Pressure',
    sectionIcon: '✅',
    questions: {
      tasksToComplete: {
        id: 'tasksToComplete',
        label: 'Tasks to complete',
        type: 'number',
        min: 0,
        max: 50,
        step: 1,
        integerOnly: true,
        defaultValue: 5,
      },
      taskDifficulty: {
        id: 'taskDifficulty',
        label: 'Overall Task Difficulty',
        type: 'radio',
        options: ['Easy', 'Moderate', 'Hard'],
        defaultValue: null,
      },
      feelingUnderPressure: {
        id: 'feelingUnderPressure',
        label: 'Feeling under pressure?',
        type: 'radio',
        options: ['Not at all', 'Slightly overwhelmed', 'Yes, very overwhelmed'],
        defaultValue: null,
      },
    },
  },

  // Social & Home Section
  socialHome: {
    sectionTitle: 'Social & Home',
    sectionIcon: '👥',
    questions: {
      socialInteractionHours: {
        id: 'socialInteractionHours',
        label: 'Interaction (Hrs)',
        type: 'number',
        min: 0,
        max: 24,
        step: 0.5,
        defaultValue: 2,
      },
      interactionQuality: {
        id: 'interactionQuality',
        label: 'Quality',
        type: 'radio',
        options: [
          { value: 'low', label: 'Low (negative or draining)' },
          { value: 'medium', label: 'Medium (neutral)' },
          { value: 'high', label: 'High (positive, supportive)' },
        ],
        defaultValue: null,
      },
      homeEnvironment: {
        id: 'homeEnvironment',
        label: 'Home Environment Satisfaction',
        sublabel: '(Consider comfort, support, noise, privacy, and general atmosphere)',
        type: 'radio',
        options: ['Dissatisfied', 'Satisfied'],
        defaultValue: null,
      },
    },
  },

  // Mental State Section
  mentalState: {
    sectionTitle: 'Mental State',
    sectionIcon: '🧠',
    questions: {
      stressfulEvents: {
        id: 'stressfulEvents',
        label: 'Did you experience any challenging moments today?',
        type: 'yesNo',
        defaultValue: null,
      },
      stressTriggers: {
        id: 'stressTriggers',
        label: 'Which of these situations apply? (Select all that fit your day)',
        type: 'multiSelect',
        options: [
          'Arguing/conflict with someone',
          'Academic/work failure or poor performance',
          'Transportation problem / car issue',
          'Financial stress',
          'Health-related stress',
          'Bad weather',
        ],
        defaultValue: [],
        dependsOn: { field: 'stressfulEvents', value: true },
      },
      overthinkingFrequency: {
        id: 'overthinkingFrequency',
        label: 'Overthinking frequency',
        type: 'radio',
        options: ['Never', 'Rarely', 'Often', 'Almost always'],
        defaultValue: null,
      },
    },
  },
};

// Initial state factory for questionnaire
export const getInitialAnswers = () => {
  const answers = {};
  
  Object.values(questionsConfig).forEach((section) => {
    Object.values(section.questions).forEach((question) => {
      answers[question.id] = question.defaultValue;
    });
  });
  
  return answers;
};

// Stress level result configuration
export const stressResultConfig = {
  low: {
    level: 'Low',
    color: '#4A7C59',
    message: "You're doing well! Your stress levels appear manageable right now.",
    description: "Keep nurturing your well-being. The balance you've created is something to celebrate.",
    suggestions: [
      {
        icon: '🧘',
        title: 'Maintain Balance',
        description: 'Continue your healthy routines. They\'re clearly working for you.',
      },
      {
        icon: '🌿',
        title: 'Stay Connected',
        description: 'Keep nurturing your relationships and support systems.',
      },
      {
        icon: '✨',
        title: 'Celebrate',
        description: 'Acknowledge your efforts in managing life\'s demands.',
      },
      {
        icon: '📖',
        title: 'Reflect',
        description: 'Journal what\'s working well so you can return to these habits.',
      },
    ],
  },
  medium: {
    level: 'Moderate',
    color: '#C4A35A',
    message: "It makes sense that you feel this way given the weight you are carrying.",
    description: "Remember, this is a gentle signal from your body to slow down, not a failure. You are doing the best you can.",
    suggestions: [
      {
        icon: '🫁',
        title: 'Breathe',
        description: 'Take three deep breaths right now. Inhale for 4s, hold for 4s, exhale for 6s.',
      },
      {
        icon: '📱',
        title: 'Disconnect',
        description: 'Step away from screens for just 5 minutes to let your eyes and mind rest.',
      },
      {
        icon: '💧',
        title: 'Hydrate',
        description: 'Drink a glass of water slowly. Focus on the cool sensation.',
      },
      {
        icon: '🚶',
        title: 'Move Gently',
        description: 'A short 5-minute walk can help clear your mind and reset.',
      },
    ],
  },
  high: {
    level: 'High',
    color: '#A94442',
    message: "We see you. What you're feeling is valid, and you don't have to carry it alone.",
    description: "High stress is your mind's way of asking for support. Please be gentle with yourself today.",
    suggestions: [
      {
        icon: '🤝',
        title: 'Reach Out',
        description: 'Talk to someone you trust. Sharing your burden can lighten it.',
      },
      {
        icon: '🛑',
        title: 'Pause',
        description: 'Give yourself permission to stop. Rest is not a luxury—it\'s necessary.',
      },
      {
        icon: '💭',
        title: 'One Thing',
        description: 'Focus on just one small task. Progress doesn\'t have to be big.',
      },
      {
        icon: '🌙',
        title: 'Rest Tonight',
        description: 'Prioritize sleep today. Your body heals and recovers while you rest.',
      },
    ],
  },
};

export default questionsConfig;
