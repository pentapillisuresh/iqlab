import React, { useState, useEffect } from "react";

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
  });

  // ✅ Fetch categories from backend (no more hardcoding)
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

  // ✅ Fetch subcategories when category changes
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
      });
      setSubCategories([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Club Registration
        </h2>

        {/* Inputs */}
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />

        {/* Category Dropdown */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategories Dropdown */}
        {loadingSubs ? (
          <p className="text-gray-500">Loading subcategories...</p>
        ) : (
          subCategories.length > 0 && (
            <select
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} - ₹{sub.amount}
                </option>
              ))}
            </select>
          )
        )}

        {/* Subcategory Details */}
        {formData.subCategoryId && (
          <div className="border p-4 rounded-lg bg-gray-50 shadow-inner">
            {subCategories
              .filter((s) => s.id === formData.subCategoryId)
              .map((s) => (
                <div key={s.id} className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">{s.name}</h3>
                  <p className="text-gray-600">{s.description}</p>
                  <p className="font-bold text-indigo-600">₹{s.amount}</p>
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
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Register Club
        </button>
      </form>
    </div>
  );
};

export default ClubRegistrationForm;
