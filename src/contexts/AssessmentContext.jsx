import React, { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext();

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider = ({ children }) => {
  const [currentAttempt, setCurrentAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  const startAttempt = (attempt) => {
    setCurrentAttempt(attempt);
    setAnswers({});
    setTimeRemaining(attempt.exam.duration * 60); // Convert minutes to seconds
  };

  const saveAnswer = async (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Auto-save to backend
    try {
      await fetch(`/api/attempts/${currentAttempt.id}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ questionId, answer })
      });
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const submitAttempt = async () => {
    try {
      const response = await fetch(`/api/attempts/${currentAttempt.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ answers })
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentAttempt(null);
        setAnswers({});
        return { success: true, result };
      } else {
        return { success: false, error: 'Submission failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const value = {
    currentAttempt,
    answers,
    timeRemaining,
    setTimeRemaining,
    startAttempt,
    saveAnswer,
    submitAttempt
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};