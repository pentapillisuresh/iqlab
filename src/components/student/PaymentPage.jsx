import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';   // ✅ Import navigation hook
import { CreditCard, Lock, CheckCircle, ArrowLeft, DollarSign, Clock, BookOpen, Trophy } from 'lucide-react';

const PaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();  // ✅ Initialize navigation

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Mock exam data
  const mockExam = {
    id: 1,
    title: 'Mathematics Foundation Test',
    code: 'MATH101',
    description: 'Comprehensive assessment covering algebra, geometry, and basic calculus concepts.',
    fee: 500,
    duration: 120,
    totalQuestions: 50,
    totalMarks: 100,
    instructions: [
      'Read all questions carefully before answering',
      'Each question carries equal marks unless specified',
      'Negative marking: -0.25 for wrong answers',
      'No use of external calculators or resources',
      'Submit before time expires to avoid auto-submission'
    ]
  };

  const handlePayment = async () => {
    setPaymentLoading(true);

    // Simulate payment process
    setTimeout(() => {
      setPaymentLoading(false);
      // ✅ Redirect to exam interface after payment success
      navigate("/student/exam", { state: { exam: mockExam } });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/student/exams')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exams
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Exam Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">{mockExam.title}</h1>
                <p className="text-blue-100">Code: {mockExam.code}</p>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">{mockExam.description}</p>

                {/* Exam Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{mockExam.duration} mins</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Questions</p>
                    <p className="font-semibold">{mockExam.totalQuestions}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Marks</p>
                    <p className="font-semibold">{mockExam.totalMarks}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Fee</p>
                    <p className="font-semibold">₹{mockExam.fee}</p>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Instructions</h3>
                  <ul className="space-y-2">
                    {mockExam.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Panel */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
                <p className="text-gray-600 text-sm mt-1">Secure checkout to start your exam</p>
              </div>

              <div className="p-6">
                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Exam Fee</span>
                    <span className="font-semibold">₹{mockExam.fee}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Processing Fee</span>
                    <span className="font-semibold">₹0</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">₹{mockExam.fee}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <CreditCard className="h-5 w-5 text-gray-500 ml-3 mr-3" />
                      <span className="text-gray-700">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <DollarSign className="h-5 w-5 text-gray-500 ml-3 mr-3" />
                      <span className="text-gray-700">UPI</span>
                    </label>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Pay ₹{mockExam.fee} & Start Exam
                    </div>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
