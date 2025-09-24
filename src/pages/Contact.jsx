import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Phone",
      details: ["+91 9949999381", "+91 9949999481"],
      action: "Call us anytime"
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: "Email",
      details: ["hello@iqlabs.com", "support@iqlabs.com"],
      action: "Drop us a line"
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Location",
      details: ["Vizag, Andhra Pradesh", "India"],
      action: "Visit our community hub"
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Hours",
      details: ["Mon - Fri: 9AM - 8PM", "Sat - Sun: 10AM - 6PM"],
      action: "We're here to help"
    }
  ];

  const interests = [
    "Innovation Club",
    "Startup Club", 
    "Public Speaking Club",
    "Tech Forum",
    "Survival Course",
    "Weekend Wanderers",
    "Foodie's Club",
    "Couples' Club",
    "Singles' Social Club",
    "Sports & Recreation",
    "General Inquiry"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <img
          src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1500&q=80"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg opacity-90">
              Have questions? Ready to join our community? Let’s connect and help you find your perfect club.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    Area of Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a club or topic</option>
                    {interests.map((interest, index) => (
                      <option key={index} value={interest}>{interest}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tell us about yourself and what you're looking for..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center mb-3">
                <UserGroupIcon className="h-8 w-8 text-teal-500 mr-3" />
                <h2 className="text-lg font-bold text-gray-900">Contact Info</h2>
              </div>
              
              <div className="space-y-2">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <div className="flex-shrink-0 p-1 bg-blue-100 rounded-lg">
                      <div className="text-blue-600">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-xs mb-1">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 text-xs">{detail}</p>
                      ))}
                      <p className="text-xs text-blue-600">{info.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats - moved below */}
        <div className="mt-10">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">Join Our Growing Community</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Active Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm opacity-90">Active Clubs</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Events Monthly</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2+</div>
                <div className="text-sm opacity-90">Years Strong</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
