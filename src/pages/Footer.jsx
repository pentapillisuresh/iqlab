import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Clock, ExternalLink } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home Page', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Mission', path: '/mission' },
    { name: 'Courses', path: '/courses' },
    { name: 'Results', path: '/results' },
  ];

  const contactInfo = [
    { icon: MapPin, text: '10-01-1,nad vizag', href: '#' },
    { icon: Phone, text: '987654321', href: 'tel:9313723204' },
    { icon: Mail, text: 'iqlabs@yahoo.co.in', href: 'mailto:dhamanisumit@yahoo.co.in' },
    { icon: ExternalLink, text: 'Iqlabs.com', href: 'https://lakshyaarthi.com' },
  ];

  const openingHours = [
    { day: 'Monday - Thursday', time: '06:30 AM - 08:30 AM' },
    { day: 'Friday', time: '06:30 AM - 08:30 AM' },
    { day: 'Saturday', time: '06:30 AM - 08:30 AM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105 transition-transform duration-700 hover:scale-110"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/5685817/pexels-photo-5685817.jpeg')"
        }}
      ></div>

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      {/* Animated Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-indigo-400/40 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-blue-300/30 rounded-full animate-pulse delay-700"></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {/* Contact Info Section */}
          <div className="group">
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <img
                  src="/images/logo.png"
                  alt="Lakshya Arthi Logo"
                  className="w-16 h-16 mr-4 shadow-lg hover:border-blue-300 transition-colors duration-300"
                />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    IQ LABS
                  </h3>
                  <p className="text-blue-200 text-sm">The science of success</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-8 leading-relaxed opacity-90">
                Empowering students to achieve their dreams through quality education and personalized guidance.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 text-gray-300 hover:text-white transition-all duration-300 group/item cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover/item:bg-blue-500/40 transition-all duration-300">
                        <IconComponent className="w-4 h-4 text-blue-300 group-hover/item:text-blue-200 transition-colors duration-300" />
                      </div>
                      <a 
                        href={contact.href} 
                        className="text-sm hover:underline flex-1 leading-relaxed group-hover/item:translate-x-1 transition-transform duration-300"
                      >
                        {contact.text}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <h4 className="text-xl font-bold mb-8 flex items-center text-white">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
              Quick Navigation
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="transform transition-all duration-300 hover:translate-x-2">
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-all duration-300 inline-flex items-center group relative overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 absolute bottom-0 left-0 group-hover:w-full transition-all duration-500"></span>
                    <div className="w-2 h-2 bg-blue-400/60 rounded-full mr-4 group-hover:bg-blue-300 group-hover:scale-125 transition-all duration-300"></div>
                    <span className="relative">
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 inline" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours Section */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <h4 className="text-xl font-bold mb-8 flex items-center text-white">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <Clock className="w-4 h-4" />
              </div>
              Class Timings
            </h4>
            <div className="space-y-4">
              {openingHours.map((slot, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                      {slot.day}
                    </span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                      slot.time === 'Closed' 
                        ? 'bg-red-500/20 text-red-200 group-hover:bg-red-500/30' 
                        : 'bg-green-500/20 text-green-200 group-hover:bg-green-500/30'
                    }`}>
                      {slot.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        {/* <div className="mt-16 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-500 group">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful students who have achieved their academic goals with our expert guidance and proven teaching methods.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group-hover:animate-pulse">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
            <p className="text-gray-400 text-sm mb-2 md:mb-0 md:mr-6">
              © 2025 IQ LABS. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Developed by</span>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>Esoteric projects</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm items-center">
            {['FAQ', 'Help Desk', 'Support', 'Privacy Policy'].map((item, index) => (
              <a
                key={item}
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300 hover:underline relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-indigo-400/5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-purple-400/5 rounded-full animate-ping delay-500"></div>
      </div>
    </footer>
  );
};

export default Footer;