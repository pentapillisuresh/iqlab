import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AssessmentProvider } from './contexts/AssessmentContext';
import { ToastProvider } from './components/ui/Toaster';

// Auth Components
import Login from './components/auth/Login';
import ServiceRegistration from './pages/ServiceRegistration';
import AdminLogin from './components/auth/AdminLogin';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import ExamList from './components/student/ExamList';
import PaymentPage from './components/student/PaymentPage';
import ExamInterface from './components/student/ExamInterface';
import ResultView from './components/student/ResultView';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ISODashboard from './components/admin/ISODashboard';
import ClubDashboard from './components/admin/ClubDashboard';
import CareerDashboard from './components/admin/CareerDashboard';

// Shared Components
import ProtectedRoute from './components/shared/ProtectedRoute';
import Header from './components/shared/Header';
import Home from "./pages/Home";
import Whatsapp from './pages/Whatsapp';
import Call from './pages/Call';
import Footer from './pages/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <Whatsapp />
      <Call />
      <ToastProvider>
        <AuthProvider>
          <AssessmentProvider>
            <Router>
               <ScrollToTop />
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-16">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<ServiceRegistration />} />
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Student Routes */}
                    <Route path="/student/dashboard" element={
                      <ProtectedRoute role="student">
                        <StudentDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/exams" element={
                      <ProtectedRoute role="student">
                        <ExamList />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/payment/:examId" element={
                      <ProtectedRoute role="student">
                        <PaymentPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/student/exam" element={<ExamInterface />} />
                    <Route path="/student/result/:attemptId" element={
                      <ProtectedRoute role="student">
                        <ResultView />
                      </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={
                      <ProtectedRoute role="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/iso" element={
                      <ProtectedRoute role="admin">
                        <ISODashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/club" element={
                      <ProtectedRoute role="admin">
                        <ClubDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/career" element={
                      <ProtectedRoute role="admin">
                        <CareerDashboard />
                      </ProtectedRoute>
                    } />

                    {/* Redirects */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </AssessmentProvider>
        </AuthProvider>
      </ToastProvider>
      <Footer />
    </div>
  );
}

export default App;