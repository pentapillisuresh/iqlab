import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Clock, Trophy, Download, AlertCircle, CheckCircle, XCircle, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    completedExams: 0,
    averageScore: 0,
    pendingResults: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch results
      const resultsResponse = await fetch('/api/student/results', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      // Fetch upcoming exams
      const examsResponse = await fetch('/api/student/exams/available', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (resultsResponse.ok && examsResponse.ok) {
        const resultsData = await resultsResponse.json();
        const examsData = await examsResponse.json();
        
        setResults(resultsData);
        setUpcomingExams(examsData);
        
        // Calculate stats
        const completedResults = resultsData.filter(r => r.status === 'published');
        const averageScore = completedResults.length > 0 
          ? completedResults.reduce((sum, r) => sum + r.score, 0) / completedResults.length 
          : 0;
        
        setStats({
          totalAttempts: resultsData.length,
          completedExams: completedResults.length,
          averageScore: Math.round(averageScore),
          pendingResults: resultsData.filter(r => r.status === 'pending').length
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 mt-2">Track your assessment progress and view results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalAttempts}</p>
                <p className="text-gray-600 text-sm">Total Attempts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.completedExams}</p>
                <p className="text-gray-600 text-sm">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                <p className="text-gray-600 text-sm">Average Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.pendingResults}</p>
                <p className="text-gray-600 text-sm">Pending Results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Results</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {results.length > 0 ? (
                  results.slice(0, 5).map((result) => (
                    <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{result.examTitle}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Code: {result.examCode}</span>
                            <span>Date: {new Date(result.attemptDate).toLocaleDateString()}</span>
                            {result.status === 'published' && (
                              <span className="font-medium text-blue-600">
                                Score: {result.score}/{result.totalMarks}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          {result.status === 'published' && (
                            <Link
                              to={`/student/result/${result.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p>No exam attempts yet</p>
                    <Link 
                      to="/student/exams"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Browse available exams →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Available Exams</h2>
              </div>
              <div className="p-6">
                {upcomingExams.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingExams.slice(0, 3).map((exam) => (
                      <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <h3 className="font-semibold text-gray-900 mb-2">{exam.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Duration: {exam.duration} mins</span>
                          </div>
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>Fee: ₹{exam.fee}</span>
                          </div>
                        </div>
                        <Link
                          to={`/student/payment/${exam.id}`}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                        >
                          Pay & Start
                        </Link>
                      </div>
                    ))}
                    <Link 
                      to="/student/exams"
                      className="block text-center text-blue-600 hover:text-blue-500 font-medium text-sm"
                    >
                      View all exams →
                    </Link>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p>No exams available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;