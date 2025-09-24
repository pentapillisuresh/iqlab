import React from "react";

const About = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center lg:text-left">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center justify-center lg:justify-start gap-2">
            <img
              src="/images/tie.webp"
              alt="About Icon"
              className="w-4 h-4"
            />
            ABOUT US
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug max-w-3xl mx-auto lg:mx-0">
            At{" "}
            <span className="font-semibold text-blue-700">
              IQ LABS
            </span>
            , we are committed to empowering individuals and organizations
            through our unique and diverse range of services.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Side - Content */}
          <div className="space-y-10">
            {/* First Point */}
            <div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-lg font-bold shadow-md">
                  01
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    ISO Certification Consultancy
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    We assist companies in obtaining ISO certifications like ISO
                    9001 and ISO 13485. Our services include SOP (Standard
                    Operating Procedure) preparation, Quality Manuals, internal
                    audits, and implementing a robust Quality Management System
                    (QMS). Our team of experts will guide you to improve your
                    business processes and align them with international
                    standards.
                  </p>
                </div>
              </div>
              {/* Divider Line */}
              <div className="border-t border-gray-200 my-8"></div>
            </div>

            {/* Second Point */}
            <div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-lg font-bold shadow-md">
                  02
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    Career Counselling and Guidance
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    We offer personalized career guidance to students and
                    individuals of all ages. Based on your brain capabilities,
                    interests, abilities, and goals, we help you choose the
                    right path to achieve success in your professional life.
                  </p>
                </div>
              </div>
              {/* Divider Line */}
              <div className="border-t border-gray-200 my-8"></div>
            </div>

            {/* Third Point */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-blue-800 text-white rounded-full text-lg font-bold shadow-md">
                03
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Club Management
                </h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  We manage various clubs, including a Cricket Club, a Wildlife
                  Survival club, and a Firefighting club. These clubs provide an
                  opportunity for members to develop new skills, gain unique
                  experiences, and grow both personally and socially.
                  <br />
                  <br />
               
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/conversation-woman-office-happy-professionals_1301-1582.jpg?t=st=1756987122~exp=1756990722~hmac=92206e5a15ab1a2240d1f55490426eaa3934bc3428c95b4f7ca00130e9e89c2b&w=1060"
                alt="IQ Labs Discussion"
                className="rounded-2xl w-full max-w-md lg:max-w-lg h-96 object-cover shadow-lg"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-5 -right-5 w-10 h-10 bg-blue-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-5 -left-5 w-8 h-8 bg-blue-600 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
