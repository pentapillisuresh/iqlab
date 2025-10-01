import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Flag, ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';

const ExamInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(5400); // 1.5 hours in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // 90 Psychometric Questions in English and Hindi
const mockQuestions = [
  { id: 1, question: "Do you often feel nervous or anxious in social situations?" },
  { id: 2, question: "Do you prefer working alone rather than in a team?" },
  { id: 3, question: "Do you find it easy to make decisions quickly?" },
  { id: 4, question: "Do you often worry about things that might go wrong?" },
  { id: 5, question: "Do you enjoy taking on new challenges?" },
  { id: 6, question: "Do you find it difficult to express your emotions?" },
  { id: 7, question: "Do you prefer routine and predictable activities?" },
  { id: 8, question: "Do you often feel overwhelmed by your responsibilities?" },
  { id: 9, question: "Do you enjoy meeting new people?" },
  { id: 10, question: "Do you tend to procrastinate on important tasks?" },
  { id: 11, question: "Do you feel confident in your ability to handle stress?" },
  { id: 12, question: "Do you prefer to plan ahead rather than be spontaneous?" },
  { id: 13, question: "Do you find it easy to concentrate for long periods?" },
  { id: 14, question: "Do you often compare yourself to others?" },
  { id: 15, question: "Do you feel comfortable speaking in front of groups?" },
  { id: 16, question: "Do you tend to be optimistic about the future?" },
  { id: 17, question: "Do you find it difficult to say no to requests?" },
  { id: 18, question: "Do you enjoy competitive activities?" },
  { id: 19, question: "Do you often feel misunderstood by others?" },
  { id: 20, question: "Do you believe that hard work always pays off?" },
  { id: 21, question: "Do you get easily frustrated when things don't go as planned?" },
  { id: 22, question: "Do you prefer working with details rather than big picture ideas?" },
  { id: 23, question: "Do you often take initiative in group projects?" },
  { id: 24, question: "Do you find it easy to forgive others when they make mistakes?" },
  { id: 25, question: "Do you enjoy solving complex problems?" },
  { id: 26, question: "Do you feel comfortable with uncertainty and ambiguity?" },
  { id: 27, question: "Do you often act on your first instinct?" },
  { id: 28, question: "Do you prefer structure and clear guidelines in your work?" },
  { id: 29, question: "Do you find it easy to adapt to new environments?" },
  { id: 30, question: "Do you often feel energized after social interactions?" },
  { id: 31, question: "Do you tend to be critical of your own performance?" },
  { id: 32, question: "Do you enjoy helping others solve their problems?" },
  { id: 33, question: "Do you prefer to finish tasks completely before starting new ones?" },
  { id: 34, question: "Do you find it easy to stay motivated even when facing setbacks?" },
  { id: 35, question: "Do you enjoy brainstorming and generating new ideas?" },
  { id: 36, question: "Do you prefer to avoid conflict whenever possible?" },
  { id: 37, question: "Do you often question established procedures and methods?" },
  { id: 38, question: "Do you find it easy to maintain long-term friendships?" },
  { id: 39, question: "Do you prefer to work at your own pace?" },
  { id: 40, question: "Do you often seek feedback from others about your work?" },
  { id: 41, question: "Do you feel comfortable taking calculated risks?" },
  { id: 42, question: "Do you prefer clear deadlines and time constraints?" },
  { id: 43, question: "Do you often analyze situations from multiple perspectives?" },
  { id: 44, question: "Do you enjoy receiving recognition for your achievements?" },
  { id: 45, question: "Do you find it easy to stay calm under pressure?" },
  { id: 46, question: "Do you prefer learning through hands-on experience?" },
  { id: 47, question: "Do you often set high standards for yourself?" },
  { id: 48, question: "Do you find it easy to communicate your ideas to others?" },
  { id: 49, question: "Do you enjoy exploring different solutions to problems?" },
  { id: 50, question: "Do you prefer to have control over your work environment?" },
  { id: 51, question: "Do you often reflect on your past experiences to learn from them?" },
  { id: 52, question: "Do you find it easy to trust others with important responsibilities?" },
  { id: 53, question: "Do you prefer practical solutions over creative approaches?" },
  { id: 54, question: "Do you often feel the need to prove yourself to others?" },
  { id: 55, question: "Do you enjoy working on projects with tight deadlines?" },
  { id: 56, question: "Do you find it easy to empathize with others' feelings?" },
  { id: 57, question: "Do you prefer working with facts and data over intuition?" },
  { id: 58, question: "Do you often seek approval from authority figures?" },
  { id: 59, question: "Do you enjoy taking leadership roles in projects?" },
  { id: 60, question: "Do you find it difficult to relax and unwind?" },
  { id: 61, question: "Do you prefer learning new skills through observation?" },
  { id: 62, question: "Do you often worry about making the wrong decision?" },
  { id: 63, question: "Do you enjoy participating in team-building activities?" },
  { id: 64, question: "Do you prefer to complete tasks methodically and systematically?" },
  { id: 65, question: "Do you often find yourself daydreaming about future possibilities?" },
  { id: 66, question: "Do you find it easy to maintain work-life balance?" },
  { id: 67, question: "Do you prefer to work independently without supervision?" },
  { id: 68, question: "Do you often feel responsible for others' emotions and well-being?" },
  { id: 69, question: "Do you enjoy experimenting with new approaches and methods?" },
  { id: 70, question: "Do you find it easy to bounce back from disappointments?" },
  { id: 71, question: "Do you prefer to have multiple options before making decisions?" },
  { id: 72, question: "Do you often feel the urge to improve existing processes?" },
  { id: 73, question: "Do you find it easy to maintain focus in noisy environments?" },
  { id: 74, question: "Do you prefer receiving detailed instructions for new tasks?" },
  { id: 75, question: "Do you often feel motivated by competition with others?" },
  { id: 76, question: "Do you find it easy to express disagreement diplomatically?" },
  { id: 77, question: "Do you prefer to research thoroughly before making commitments?" },
  { id: 78, question: "Do you often feel drained after attending large social events?" },
  { id: 79, question: "Do you enjoy mentoring and coaching others?" },
  { id: 80, question: "Do you prefer to complete one task at a time rather than multitask?" },
  { id: 81, question: "Do you often feel the need to control outcomes in situations?" },
  { id: 82, question: "Do you enjoy attending networking events and conferences?" },
  { id: 83, question: "Do you find it easy to prioritize tasks based on importance?" },
  { id: 84, question: "Do you often seek new experiences and adventures?" },
  { id: 85, question: "Do you prefer to work in quiet, distraction-free environments?" },
  { id: 86, question: "Do you often consider the long-term consequences of your actions?" },
  { id: 87, question: "Do you find it easy to delegate responsibilities to others?" },
  { id: 88, question: "Do you prefer to follow established guidelines rather than create new ones?" },
  { id: 89, question: "Do you often feel inspired by other people's success stories?" },
  { id: 90, question: "Do you believe that persistence is more important than talent?" }
];


  useEffect(() => {
    setQuestions(mockQuestions);
    startTimer();
  }, []);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    // Simulate submission
    alert('Exam submitted successfully!');
    console.log('Submitted answers:', answers);
    setShowSubmitConfirm(false);
    // In a real app, you would navigate to results page
  };

  const handleAutoSubmit = async () => {
    alert('Time expired! Auto-submitting exam...');
    await handleSubmit();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const getAnsweredQuestionsCount = () => {
    return Object.keys(answers).filter(key => answers[key] !== '' && answers[key] !== undefined).length;
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionAnswer = answers[currentQuestion.id] || '';

    return (
      <div className="space-y-6">
        {/* English Question */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">English</h3>
          <p className="text-gray-800">{currentQuestion.question}</p>
        </div>

        {/* Hindi Question */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">हिंदी</h3>
          <p className="text-gray-800 text-lg">{currentQuestion.questionHindi}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-700 mb-3">Select your answer:</h4>
          {[
            { value: 'Yes', label: 'Yes / हाँ' },
            { value: 'No', label: 'No / नहीं' }
          ].map((option) => (
            <label key={option.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name={`question_${currentQuestion.id}`}
                value={option.value}
                checked={questionAnswer === option.value}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Psychometric Assessment</h1>
                <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-sm text-gray-600">Answered</div>
                <div className="text-lg font-bold text-green-600">{getAnsweredQuestionsCount()}/{questions.length}</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-600">Time Remaining</div>
                <div className={`text-lg font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-blue-600'}`}>
                  <Clock className="h-4 w-4 inline mr-1" />
                  {formatTime(timeRemaining)}
                </div>
              </div>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center shadow-sm"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {currentQuestion && (
                <>
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Question {currentQuestionIndex + 1}
                        </span>
                        <span className="text-sm text-gray-600">
                          {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
                        </span>
                        {flaggedQuestions.has(currentQuestion.id) && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Flagged
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        flaggedQuestions.has(currentQuestion.id)
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                      }`}
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="mb-8">
                    {renderQuestion()}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={isFirstQuestion}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-3">
                      <Save className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Auto-saved</span>
                    </div>

                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                      disabled={isLastQuestion}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-6 gap-2 mb-6 max-h-96 overflow-y-auto">
                {questions.map((q, index) => {
                  const isAnswered = answers[q.id] && answers[q.id] !== '';
                  const isFlagged = flaggedQuestions.has(q.id);
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg text-xs font-medium transition-all relative ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md'
                          : isAnswered
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <Flag className="h-2.5 w-2.5 text-yellow-500 absolute -top-0.5 -right-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-600">Flagged</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Answered:</span>
                  <span className="font-medium text-green-600">{getAnsweredQuestionsCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-gray-600">{questions.length - getAnsweredQuestionsCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Flagged:</span>
                  <span className="font-medium text-yellow-600">{flaggedQuestions.size}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(getAnsweredQuestionsCount() / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {Math.round((getAnsweredQuestionsCount() / questions.length) * 100)}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowSubmitConfirm(false)}></div>
            
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Assessment?</h3>
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">
                  You have answered {getAnsweredQuestionsCount()} out of {questions.length} questions.
                </p>
                <p className="text-gray-600">
                  Unanswered questions: <span className="font-medium text-red-600">{questions.length - getAnsweredQuestionsCount()}</span>
                </p>
                <p className="text-gray-600">
                  Flagged questions: <span className="font-medium text-yellow-600">{flaggedQuestions.size}</span>
                </p>
                <p className="text-sm text-red-600 font-medium">
                  Once submitted, you cannot make any changes.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit Final Answers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;