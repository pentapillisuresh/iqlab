import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Building, FileText } from 'lucide-react';
import { registerIsoUser } from '../../api';

const clubTypes = [
  'Lions Club',
  'Rotary Club',
  'Sports Club',
  'Business Club',
  'Social Club',
  'Cultural Club'
];

const RegistrationForm = ({ service, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    gst: '',
    clubType: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = service.fields;
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());

    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const data = await registerIsoUser({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        companyName: formData.company,
        gstNumber: formData.gst,
        clubType: formData.clubType
      });

      alert(data.message || 'Registration successful!');
      onSuccess();
      setFormData({ name: '', phone: '', email: '', address: '', company: '', gst: '', clubType: '' });
    } catch (error) {
      console.error(error);
      alert(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-h-screen overflow-hidden">
      <h2 className="text-xl font-bold text-cyan-300 mb-3 text-center">
        {service.title} Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
            required
          />
        </div>

        {/* Address */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Your Address"
            rows="2"
            className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none text-sm"
            required
          />
        </div>

        {/* Company & GST */}
        {(service.fields.includes('company') || service.fields.includes('gst')) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.fields.includes('company') && (
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                  required
                />
              </div>
            )}

            {service.fields.includes('gst') && (
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  placeholder="GST Number"
                  className="w-full pl-9 pr-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                  required
                />
              </div>
            )}
          </div>
        )}

        {/* Club Type */}
        {service.fields.includes('clubType') && (
          <div>
            <select
              name="clubType"
              value={formData.clubType}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 bg-white bg-opacity-10 border border-cyan-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
              required
            >
              <option value="" className="text-gray-900">Select Club Type</option>
              {clubTypes.map((club) => (
                <option key={club} value={club} className="text-gray-900">{club}</option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
