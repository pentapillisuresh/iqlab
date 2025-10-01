import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Key } from "lucide-react";
import axios from "axios";

const CareerRegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "", // added password
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://iqlabs-server.onrender.com/api/career/register",
        formData
      );

      alert("✅ Career Registration successful!");
      console.log("Response:", res.data);

      onSuccess?.();
      setFormData({ name: "", phone: "", email: "", address: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="md:col-span-2 text-center">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">
          Career Registration
        </h2>
      </div>

      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
      </div>

      {/* Email */}
      <div className="relative md:col-span-2">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
      </div>

      {/* Password */}
      <div className="relative md:col-span-2">
        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
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
          required
          className="w-full pl-10 pr-3 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {loading ? "Submitting..." : "Apply Career"}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CareerRegistrationForm;
