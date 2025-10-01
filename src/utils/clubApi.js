import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/clubs';

// ✅ Get all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// ✅ Get subcategories by category ID
export const fetchSubcategoriesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subcategories?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

// ✅ Add new subfield to a category
export const addSubfield = async (categoryId, subfieldData, token) => {
  try {
    const formData = new FormData();
    formData.append('name', subfieldData.name);
    formData.append('description', subfieldData.description);
    formData.append('amount', subfieldData.amount.toString());

    if (subfieldData.image && typeof subfieldData.image !== 'string') {
      formData.append('image', subfieldData.image);
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const response = await axios.post(
      `${API_BASE_URL}/subfields/${categoryId}`,
      formData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding subfield:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update subfield
export const updateSubfield = async (subfieldId, subfieldData, token) => {
  try {
    const formData = new FormData();
    if (subfieldData.name) formData.append('name', subfieldData.name);
    if (subfieldData.description) formData.append('description', subfieldData.description);
    if (subfieldData.amount !== undefined) formData.append('amount', subfieldData.amount.toString());

    if (subfieldData.image && typeof subfieldData.image !== 'string') {
      formData.append('image', subfieldData.image);
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const response = await axios.put(
      `${API_BASE_URL}/subfields/${subfieldId}`,
      formData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating subfield:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete subfield
export const deleteSubfield = async (subfieldId, token) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const response = await axios.delete(`${API_BASE_URL}/subfields/${subfieldId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting subfield:', error);
    throw error;
  }
};

// ✅ Get all club users
export const fetchClubUsers = async (token) => {
  try {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const response = await axios.get(`${API_BASE_URL}/users`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching club users:', error);
    throw error;
  }
};

// ✅ Register new club user
export const registerClubUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering club user:', error);
    throw error;
  }
};
