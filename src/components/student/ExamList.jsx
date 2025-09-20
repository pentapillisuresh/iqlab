import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, DollarSign, BookOpen, Calendar, Trophy, ArrowRight } from 'lucide-react';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('/api/student/exams/available', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExams(data);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockExams = [
    {
      id: 1,
      title: 'Mathematics Foundation Test',
      code: 'MATH101',
      description: 'Comprehensive assessment covering algebra, geometry, and basic calculus concepts.',
      fee: 500,
      duration: 120,
      totalQuestions: 50,
      totalMarks: 100,
      difficulty: 'Medium',
      category: 'Mathematics',
      startDate: '2025-01-15T10:00:00Z',
      endDate: '2025-01-20T18:00:00Z',
      participants: 156,
      passPercentage: 75
    },
    {
      id: 2,
      title: 'Science Aptitude Exam',
      code: 'SCI202',
      description: 'Physics, Chemistry, and Biology assessment for competitive exam preparation.',
      fee: 750,
      duration: 180,
      totalQuestions: 75,
      totalMarks: 150,
      difficulty: 'Hard',
      category: 'Science',
      startDate: '2025-01-18T09:00:00Z',
      endDate: '2025-01-25T17:00:00Z',
      participants: 89,
      passPercentage: 65
    },
    {
      id: 3,
      title: 'English Proficiency Test',
      code: 'ENG103',
      description: 'Grammar, vocabulary, reading comprehension, and writing skills assessment.',
      fee: 300,
      duration: 90,
      totalQuestions: 40,
      totalMarks: 80,
      difficulty: 'Easy',
      category: 'Language',
      startDate: '2025-01-12T11:00:00Z',
      endDate: '2025-01-19T16:00:00Z',
      participants: 234,
      passPercentage: 82
    }
  ];

  const filteredExams = filter === 'all' ? mockExams : mockExams.filter(exam => exam.category.toLowerCase() === filter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Examinations</h1>
          <p className="text-gray-600 mt-2">Choose from our comprehensive assessment catalog</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'mathematics', 'science', 'language'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{exam.title}</h3>
                    <p className="text-blue-100 text-sm">Code: {exam.code}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">{exam.description}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{exam.duration} mins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{exam.totalQuestions} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{exam.totalMarks} marks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{exam.participants} enrolled</span>
                  </div>
                </div>

                {/* Fee */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">₹{exam.fee}</span>
                    </div>
                    <span className="text-sm text-gray-600">Exam Fee</span>
                  </div>
                </div>

                {/* Exam Window */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Exam Window
                  </h4>
                  <div className="text-sm text-gray-600">
                    <p>Start: {new Date(exam.startDate).toLocaleString()}</p>
                    <p>End: {new Date(exam.endDate).toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/student/payment/${exam.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 inline-flex items-center justify-center group-hover:shadow-md"
                >
                  Pay & Start Exam
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new exams.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;