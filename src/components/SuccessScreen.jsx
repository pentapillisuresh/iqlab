import React from 'react';
import { Check } from 'lucide-react';

const SuccessScreen = ({ service, onReset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-12 shadow-2xl text-center max-w-md w-full mx-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for registering for {service.title}. <b>IQ LABS</b> will contact you soon with further details.
        </p>
        <button
          onClick={onReset}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register Another Service
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;