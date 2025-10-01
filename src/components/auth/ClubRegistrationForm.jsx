import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Layers, ListChecks, Key } from "lucide-react";

const ClubRegistrationForm = ({ onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    categoryId: "",
    subCategoryId: "",
    password: "", // added password
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/clubs/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!formData.categoryId) {
        setSubCategories([]);
        return;
      }
      setLoadingSubs(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/clubs/subcategories?categoryId=${formData.categoryId}`
        );
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      } finally {
        setLoadingSubs(false);
      }
    };

    fetchSubCategories();
  }, [formData.categoryId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/clubs/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || "Club Registration successful!");
      onSuccess?.();

      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        categoryId: "",
        subCategoryId: "",
        password: "", // reset password
      });
      setSubCategories([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <div className="md:col-span-2 text-center">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">
          Club Registration
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

      {/* Category */}
      <div className="relative">
        <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full pl-10 pr-8 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div className="relative">
        <ListChecks className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
        {loadingSubs ? (
          <div className="pl-10 py-3 text-gray-400">Loading subcategories...</div>
        ) : (
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            className={`w-full pl-10 pr-8 py-3 bg-white/10 border border-cyan-400 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none ${
              subCategories.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={subCategories.length === 0}
            required={subCategories.length > 0}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id} className="text-black">
                {sub.name} - ₹{sub.amount}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Subcategory Details */}
      {formData.subCategoryId && (
        <div className="md:col-span-2 border p-4 rounded-lg bg-white/10 border-cyan-400 shadow-inner text-white">
          {subCategories
            .filter((s) => s.id === formData.subCategoryId)
            .map((s) => (
              <div key={s.id} className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-300">{s.name}</h3>
                <p className="text-gray-200">{s.description}</p>
                <p className="font-bold text-cyan-200">₹{s.amount}</p>
                {s.image && (
                  <img
                    src={`http://localhost:5000${s.image}`}
                    alt={s.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
              </div>
            ))}
        </div>
      )}

      {/* Submit */}
      <div className="md:col-span-2">
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Register Club
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ClubRegistrationForm;
