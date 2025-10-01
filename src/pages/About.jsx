import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom"; // ⬅️ add this at the top

import {
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
      title: "ISO Trainings & Certification Programs",
      icon: <AcademicCapIcon className="h-10 w-10 text-purple-600" />,
      description:
        "Empowering businesses and professionals with specialized ISO training programs and certifications for excellence in quality and compliance.",
      subServices: [
        {
          name: "ISO Awareness Training",
          description: "Workshops to introduce the fundamentals of ISO standards.",
          icon: <LightBulbIcon className="h-6 w-6 text-yellow-500" />,
        },
        {
          name: "Internal Auditor Training",
          description: "Hands-on training to prepare internal auditors for compliance checks.",
          icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-600" />,
        },

        {
          name: "Customized Corporate Training",
          description: "Tailored training modules to align with your organization's goals.",
          icon: <UserCircleIcon className="h-6 w-6 text-green-600" />,
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
          name: "DMIT (Dermatoglyphics Multiple Intelligence Test)",
          description:
            "A scientific fingerprint-based test that helps uncover innate talents, learning styles, and multiple intelligences for better career and personal growth decisions.",
          icon: <UserCircleIcon className="h-6 w-6 text-purple-500" />,
        },
        {
          name: "Psychometric Testing",
          description:
            "Standardized assessments to evaluate personality, aptitude, and cognitive abilities, providing insights into suitable career paths and development areas.",
          icon: <LightBulbIcon className="h-6 w-6 text-yellow-500" />,
        },

        {
          name: "Career Mapping",
          description:
            "Plan career paths aligned with individual goals and opportunities.",
          icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-600" />,
        },
        {
          name: "Personality Development",
          description:
            "Build confidence and soft skills to excel in academics and career.",
          icon: <HeartIcon className="h-6 w-6 text-pink-500" />,
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
          name: "For Professionals & Entrepreneurs",
          description:
            "Clubs and initiatives that boost innovation, leadership, and entrepreneurial skills to help professionals and business leaders succeed.",
          icon: <RocketLaunchIcon className="h-6 w-6 text-blue-500" />,
        },
        {
          name: "For Adventure & Personal Growth",
          description:
            "Engaging programs and outdoor activities designed to build resilience, confidence, and personal growth through real-world experiences.",
          icon: <FireIcon className="h-6 w-6 text-orange-500" />,
        },
        {
          name: "For Community & Relationships",
          description:
            "Social and cultural platforms that nurture communication skills, teamwork, and meaningful connections within the community.",
          icon: <UsersIcon className="h-6 w-6 text-purple-600" />,
        },
        {
          name: "Sports & Recreation Club",
          description:
            "Fun, fitness, and recreational activities that promote health, teamwork, and an active lifestyle through sports and group events.",
          icon: <TrophyIcon className="h-6 w-6 text-yellow-600" />,
        },
      ]

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
              Excellence in ISO Trainings, Career Counselling, and Club Management –
              empowering businesses and individuals to grow and succeed.
            </p>
          </div>
        </div>
      </div>


      {/* Vision & Mission Section */}
      {/* Vision & Mission Section */}
      <div className="mt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted partner in ISO Training, Consultancy, and Growth
              Solutions, enabling organizations worldwide to achieve operational
              excellence and sustainable success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To deliver high-quality ISO training and professional development
              services that empower businesses, enhance compliance, and drive
              continuous improvement with affordability and efficiency.
            </p>
          </motion.div>
        </div>
      </div>


      {/* Services Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
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
                    <motion.div
                      key={subIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: subIndex * 0.15 }}
                      viewport={{ once: true }}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {sub.icon}
                        <h3 className="text-sm font-semibold text-gray-900">
                          {sub.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600">{sub.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>



        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link to="/contact">
            <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transform hover:scale-105 transition">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
