import React from "react";

const About = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <img
              src="/images/tie.webp" // keep same icon or replace if needed
              alt="About Icon"
              className="w-4 h-4"
            />
            ABOUT US
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Navigating Dreams with Direction
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* First Point */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-xl font-bold mr-6">
                01
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Guiding Young Minds
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  At <span className="font-semibold text-blue-700">IQ LABS</span>, 
                  we believe every student carries a unique story waiting to unfold —
                  a journey of discovery, growth, and purpose.
                </p>
              </div>
            </div>

            {/* Horizontal line after first point */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Second Point */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-xl font-bold mr-6">
                02
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Unlocking True Potential
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We help students uncover their strengths and aspirations,
                  guiding them toward meaningful careers with clarity and confidence.
                </p>
              </div>
            </div>

            {/* Horizontal line after second point */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Third Point */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-xl font-bold mr-6">
                03
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Purpose-Driven Guidance
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Blending science, compassion, and expertise, we provide 
                  personalized guidance to illuminate the path for every student’s 
                  academic and career journey.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/conversation-woman-office-happy-professionals_1301-1582.jpg?t=st=1756987122~exp=1756990722~hmac=92206e5a15ab1a2240d1f55490426eaa3934bc3428c95b4f7ca00130e9e89c2b&w=1060"
                alt="Lakshya Arthi Logo"
                className="rounded-2xl w-full max-w-md lg:max-w-lg object-contain h-96"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-600 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
