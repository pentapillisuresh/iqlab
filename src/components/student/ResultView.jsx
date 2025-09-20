import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Trophy, Clock, BookOpen, Target, TrendingUp, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const ResultView = () => {
  const { attemptId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [attemptId]);

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/student/results/${attemptId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.error('Failed to fetch result:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock result data for demo
  const mockResult = {
    id: 1,
    examTitle: 'Mathematics Foundation Test',
    examCode: 'MATH101',
    studentName: 'John Doe',
    attemptDate: '2025-01-15T14:30:00Z',
    submissionDate: '2025-01-15T16:30:00Z',
    totalQuestions: 50,
    totalMarks: 100,
    obtainedMarks: 78,
    percentage: 78,
    status: 'Pass',
    rank: 12,
    totalParticipants: 156,
    percentile: 85,
    timeTaken: '118 minutes',
    breakdown: {
      correct: 42,
      incorrect: 6,
      unattempted: 2,
      negativeMarks: 1.5
    },
    sectionWise: [
      { section: 'Algebra', total: 25, obtained: 20, percentage: 80 },
      { section: 'Geometry', total: 25, obtained: 18, percentage: 72 },
      { section: 'Calculus', total: 25, obtained: 22, percentage: 88 },
      { section: 'Statistics', total: 25, obtained: 18, percentage: 72 }
    ]
  };

  const downloadScorecard = async () => {
    try {
      const response = await fetch(`/api/student/results/${attemptId}/scorecard`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${mockResult.examCode}_Scorecard.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download scorecard:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isPass = mockResult.status === 'Pass';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/student/dashboard"
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Result Header */}
        <div className={`rounded-xl p-8 mb-8 text-white ${
          isPass ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockResult.examTitle}</h1>
              <p className="text-green-100 mb-4">Code: {mockResult.examCode}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {isPass ? <CheckCircle className="h-6 w-6 mr-2" /> : <XCircle className="h-6 w-6 mr-2" />}
                  <span className="text-xl font-semibold">{mockResult.status}</span>
                </div>
                <div className="text-2xl font-bold">
                  {mockResult.obtainedMarks}/{mockResult.totalMarks}
                </div>
                <div className="text-xl">
                  {mockResult.percentage}%
                </div>
              </div>
            </div>
            
            <button
              onClick={downloadScorecard}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-medium transition-all inline-flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Scorecard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Performance Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">Correct Answers</span>
                </div>
                <span className="text-xl font-bold text-green-600">{mockResult.breakdown.correct}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <XCircle className="h-6 w-6 text-red-600 mr-3" />
                  <span className="font-medium text-gray-900">Incorrect Answers</span>
                </div>
                <span className="text-xl font-bold text-red-600">{mockResult.breakdown.incorrect}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-900">Unattempted</span>
                </div>
                <span className="text-xl font-bold text-gray-600">{mockResult.breakdown.unattempted}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Target className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="font-medium text-gray-900">Negative Marks</span>
                </div>
                <span className="text-xl font-bold text-orange-600">-{mockResult.breakdown.negativeMarks}</span>
              </div>
            </div>
          </div>

          {/* Ranking & Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Ranking</h2>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-1">#{mockResult.rank}</div>
                <p className="text-gray-600">Your Rank</p>
                <p className="text-sm text-gray-500 mt-2">
                  Out of {mockResult.totalParticipants} participants
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-600">{mockResult.percentile}th</div>
                  <p className="text-sm text-gray-600">Percentile</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">{mockResult.timeTaken}</div>
                  <p className="text-sm text-gray-600">Time Taken</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section-wise Performance */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Section-wise Performance</h2>
          
          <div className="space-y-4">
            {mockResult.sectionWise.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{section.section}</h3>
                  <span className="text-lg font-bold text-blue-600">
                    {section.obtained}/{section.total}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      section.percentage >= 80 ? 'bg-green-500' :
                      section.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${section.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Score: {section.percentage}%</span>
                  <span className={`font-medium ${
                    section.percentage >= 80 ? 'text-green-600' :
                    section.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {section.percentage >= 80 ? 'Excellent' :
                     section.percentage >= 60 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Details */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Exam Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Attempt Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Attempt Date:</span>
                  <span className="font-medium">{new Date(mockResult.attemptDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Submission Time:</span>
                  <span className="font-medium">{new Date(mockResult.submissionDate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Duration Used:</span>
                  <span className="font-medium">{mockResult.timeTaken}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Score Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Raw Score:</span>
                  <span className="font-medium">{mockResult.obtainedMarks + mockResult.breakdown.negativeMarks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Negative Marks:</span>
                  <span className="font-medium text-red-600">-{mockResult.breakdown.negativeMarks}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-700 font-medium">Final Score:</span>
                  <span className="font-bold text-lg">{mockResult.obtainedMarks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;