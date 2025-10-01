import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Building, FileText, Key } from "lucide-react";
import { registerIsoUser } from "../../api";

const IsoRegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    companyName: "",
    gstNumber: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerIsoUser(formData); // send entire formData

      alert(data.message || "ISO Registration successful!");
      onSuccess?.();

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        companyName: "",
        gstNumber: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="md:col-span-2 text-center">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">
          ISO Registration
        </h2>
      </div>

      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* Address */}
      <div className="relative md:col-span-2">
        <MapPin className="absolute left-3 top-4 h-4 w-4 text-cyan-300" />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Your Address"
          rows="2"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
          required
        />
      </div>

      {/* Company */}
      <div className="relative">
        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* GST */}
      <div className="relative">
        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          type="text"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          placeholder="GST Number"
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Register ISO
        </motion.button>
      </div>
    </motion.form>
  );
};

export default IsoRegistrationForm;
