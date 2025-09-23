import React from 'react';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  Cog6ToothIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  MicrophoneIcon,
  ComputerDesktopIcon,
  FireIcon,
  MapIcon,
  HeartIcon,
  TrophyIcon,
  UserCircleIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';

const Services = () => {
  const services = [
    {
      title: "ISO Certification Consultancy",
      icon: <ShieldCheckIcon className="h-10 w-10 text-blue-600" />,
      description:
        "We assist companies in obtaining ISO certifications like ISO 9001 and ISO 13485 with robust systems and expert guidance.",
      subServices: [
        {
          name: "SOP Preparation",
          description: "Develop Standard Operating Procedures tailored to your business processes.",
          icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-500" />,
        },
        {
          name: "Quality Manuals",
          description: "Prepare comprehensive quality manuals to meet international standards.",
          icon: <DocumentTextIcon className="h-6 w-6 text-green-600" />,
        },
        {
          name: "Internal Audits",
          description: "Conduct systematic audits to identify gaps and ensure compliance.",
          icon: <MagnifyingGlassCircleIcon className="h-6 w-6 text-blue-500" />,
        },
        {
          name: "QMS Implementation",
          description: "Implement a robust Quality Management System to streamline operations.",
          icon: <Cog6ToothIcon className="h-6 w-6 text-orange-500" />,
        },
      ],
    },
    {
      title: "Career Counselling and Guidance",
      icon: <AcademicCapIcon className="h-10 w-10 text-green-600" />,
      description:
        "We provide personalized career guidance to students and professionals, helping them make informed decisions for a successful future.",
      subServices: [
        {
          name: "Aptitude Testing",
          description: "Identify strengths and areas of interest with scientific assessments.",
          icon: <UserCircleIcon className="h-6 w-6 text-purple-500" />,
        },
        {
          name: "Career Mapping",
          description: "Plan career paths aligned with individual goals and opportunities.",
          icon: <PresentationChartLineIcon className="h-6 w-6 text-blue-600" />,
        },
        {
          name: "Personality Development",
          description: "Build confidence and soft skills to excel in academics and career.",
          icon: <LightBulbIcon className="h-6 w-6 text-yellow-500" />,
        },
        {
          name: "Interview Training",
          description: "Prepare for success with mock interviews and communication training.",
          icon: <MicrophoneIcon className="h-6 w-6 text-red-500" />,
        },
      ],
    },
    {
      title: "Club Management",
      icon: <UsersIcon className="h-10 w-10 text-purple-600" />,
      description:
        "We organize and manage diverse clubs where individuals can explore interests, develop skills, and build meaningful connections.",
      subServices: [
        {
          name: "Innovation Club",
          description: "A hub for creative minds to explore new ideas and turn them into reality.",
          icon: <LightBulbIcon className="h-6 w-6 text-yellow-500" />,
        },
        {
          name: "Startup Club",
          description: "Connect with founders, mentors, and investors to accelerate growth.",
          icon: <RocketLaunchIcon className="h-6 w-6 text-blue-500" />,
        },
        {
          name: "Public Speaking Club",
          description: "Master the art of communication, presentations, and leadership.",
          icon: <MicrophoneIcon className="h-6 w-6 text-red-500" />,
        },
        {
          name: "Tech & Innovation Forum",
          description: "Explore AI, blockchain, and emerging technologies with peers.",
          icon: <ComputerDesktopIcon className="h-6 w-6 text-indigo-500" />,
        },
        {
          name: "Survival Course",
          description: "Learn outdoor survival skills including camping, climbing, and more.",
          icon: <FireIcon className="h-6 w-6 text-orange-500" />,
        },
        {
          name: "Weekend Wanderers",
          description: "Discover Vizag’s landscapes through hikes, treks, and adventure trips.",
          icon: <MapIcon className="h-6 w-6 text-green-500" />,
        },
        {
          name: "Foodie’s Club",
          description: "Explore cuisines, cooking techniques, and food culture together.",
          icon: <HeartIcon className="h-6 w-6 text-pink-500" />,
        },
        {
          name: "Sports & Recreation",
          description: "Enjoy sports and fitness activities like cricket, cycling, and volleyball.",
          icon: <TrophyIcon className="h-6 w-6 text-yellow-600" />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1500&q=80"
          alt="Our Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
              Excellence in ISO Consultancy, Career Counselling, and Club Management – 
              empowering businesses and individuals to grow and succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">{service.icon}</div>
                <h2 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Sub-services */}
              {service.subServices && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {service.subServices.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {sub.icon}
                        <h3 className="text-sm font-semibold text-gray-900">
                          {sub.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600">{sub.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transform hover:scale-105 transition">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
