import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Smart Assessments",
      description: "Create and take comprehensive exams with multiple question types and automated grading."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Secure Platform",
      description: "Bank-grade security with encrypted data and fraud prevention mechanisms."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Student Management",
      description: "Complete student lifecycle management with progress tracking and analytics."
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Instant Results",
      description: "Automated scoring with detailed analytics and downloadable scorecards."
    }
  ];

  const benefits = [
    "Automated payment processing",
    "Real-time exam monitoring",
    "Comprehensive result analytics",
    "Mobile-friendly interface",
    "Bulk student management",
    "Customizable scoring systems"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Generation
              <span className="block text-yellow-400">Assessment Platform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Streamline your examination process with our comprehensive platform. 
              From registration to results, we've got everything covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Get Started as Student
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/admin/login" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all inline-flex items-center justify-center"
              >
                <Shield className="mr-2 h-5 w-5" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to conduct professional assessments at scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose AssessmentPro?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform provides everything you need to conduct secure, efficient, 
                and comprehensive assessments for students of all levels.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Students taking assessment"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Assessment Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators and students who trust AssessmentPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/admin/login" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;