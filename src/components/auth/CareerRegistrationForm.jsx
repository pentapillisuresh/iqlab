import React, { useState } from "react";
import { User, Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";

const CareerRegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/career/register", // ✅ direct backend call
        formData
      );

      alert("✅ Career Registration successful!");
      console.log("Response:", res.data);

      onSuccess?.();
      setFormData({ name: "", phone: "", email: "", address: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mx-auto"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
        Career Registration
      </h2>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Address full width */}
      <div className="relative mt-4">
        <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Your Address"
          required
          className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Apply Career"}
      </button>
    </form>
  );
};

export default CareerRegistrationForm;
