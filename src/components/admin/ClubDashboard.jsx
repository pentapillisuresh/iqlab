import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";
import ClubFormModal from "./ClubFormModal";
import { fetchCategories, fetchSubcategoriesByCategory, addSubfield, fetchClubUsers } from "../../utils/clubApi";

const ClubDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddClubModal, setShowAddClubModal] = useState(false);
  const [showEditClubModal, setShowEditClubModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [emailStatus, setEmailStatus] = useState({});
  const { getToken } = useAuth();

  const [clubUsers, setClubUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // CLUB FORM STATES
  const [clubForm, setClubForm] = useState({
    selectedCategories: new Set(),
    categorySubfields: {}
  });

  const [newSubField, setNewSubField] = useState({
    name: "",
    amount: 0,
    description: "",
    image: null,
    imagePreview: null
  });
  const [activeCategory, setActiveCategory] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        
        // Initialize clubForm with fetched categories
        const initialCategorySubfields = {};
        for (const category of fetchedCategories) {
          const subcategories = await fetchSubcategoriesByCategory(category.id);
          initialCategorySubfields[category.id] = subcategories;
        }
        
        setClubForm(prev => ({
          ...prev,
          categorySubfields: initialCategorySubfields
        }));
      } catch (error) {
        console.error('Failed to load categories:', error);
        alert('Failed to load categories. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fetch club users
  useEffect(() => {
    const loadClubUsers = async () => {
      try {
        const token = getToken();
        const users = await fetchClubUsers(token);
        setClubUsers(users || []);
      } catch (err) {
        console.error("Error fetching Club users:", err.response?.data || err.message);
      }
    };

    loadClubUsers();
  }, [getToken]);

  const serviceIcons = {
    club: Users,
  };

  const serviceTitles = {
    club: "Join the Club",
  };

  // Create category labels from fetched categories
  const categoryLabels = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  // HANDLERS
  const handleImageUpload = (e, categoryId, subfieldIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (subfieldIndex !== null) {
        // Update existing subfield image
        setClubForm(prev => ({
          ...prev,
          categorySubfields: {
            ...prev.categorySubfields,
            [categoryId]: prev.categorySubfields[categoryId].map((subfield, index) =>
              index === subfieldIndex 
                ? { ...subfield, image: file, imagePreview: URL.createObjectURL(file) }
                : subfield
            )
          }
        }));
      } else {
        // New subfield image
        setActiveCategory(categoryId);
        setNewSubField(prev => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file)
        }));
      }
    }
  };

  const resetClubForm = () => {
    setClubForm(prev => ({
      selectedCategories: new Set(),
      categorySubfields: prev.categorySubfields // Keep loaded subcategories
    }));
    setNewSubField({ 
      name: "", 
      amount: 0, 
      description: "", 
      image: null, 
      imagePreview: null 
    });
    setActiveCategory("");
  };

  const handleAddSubField = async (categoryId) => {
    if (!newSubField.name.trim()) {
      alert('Please enter a service name');
      return;
    }

    try {
      setLoading(true);
      const token = getToken();
      
      if (!token) {
        alert('Authentication required. Please login again.');
        return;
      }
      
      const subfieldData = {
        name: newSubField.name.trim(),
        description: newSubField.description.trim(),
        amount: parseInt(newSubField.amount) || 0,
        image: newSubField.image
      };

      console.log('Adding subfield with data:', subfieldData);
      console.log('Category ID:', categoryId);
      console.log('Token:', token ? 'Present' : 'Missing');

      const addedSubfield = await addSubfield(categoryId, subfieldData, token);
      
      console.log('Subfield added successfully:', addedSubfield);
      
      // Update local state with new subfield
      setClubForm(prev => ({
        ...prev,
        categorySubfields: {
          ...prev.categorySubfields,
          [categoryId]: [...(prev.categorySubfields[categoryId] || []), {
            id: addedSubfield.id || addedSubfield._id || Date.now(),
            name: addedSubfield.name || subfieldData.name,
            amount: addedSubfield.amount || subfieldData.amount,
            description: addedSubfield.description || subfieldData.description,
            image: addedSubfield.imageUrl || subfieldData.image
          }]
        }
      }));

      // Reset new subfield form
      setNewSubField({ 
        name: "", 
        amount: 0, 
        description: "", 
        image: null, 
        imagePreview: null 
      });
      setActiveCategory("");
      
      alert("Subfield added successfully!");
    } catch (error) {
      console.error('Failed to add subfield:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add subfield';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubField = (categoryId, index) => {
    setClubForm(prev => ({
      ...prev,
      categorySubfields: {
        ...prev.categorySubfields,
        [categoryId]: prev.categorySubfields[categoryId].filter((_, i) => i !== index)
      }
    }));
  };

  const handleUpdateSubField = (categoryId, index, field, value) => {
    setClubForm(prev => ({
      ...prev,
      categorySubfields: {
        ...prev.categorySubfields,
        [categoryId]: prev.categorySubfields[categoryId].map((subField, i) =>
          i === index
            ? { ...subField, [field]: field === "amount" ? parseInt(value) || 0 : value }
            : subField
        )
      }
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setClubForm(prev => {
      const newSelectedCategories = new Set(prev.selectedCategories);
      if (newSelectedCategories.has(categoryId)) {
        newSelectedCategories.delete(categoryId);
      } else {
        newSelectedCategories.add(categoryId);
      }
      return {
        ...prev,
        selectedCategories: newSelectedCategories
      };
    });
  };

  const handleNewSubFieldChange = (field, value) => {
    setNewSubField(prev => ({ 
      ...prev, 
      [field]: field === 'amount' ? parseInt(value) || 0 : value 
    }));
  };

  const handleAddClub = (e) => {
    e.preventDefault();
    // This would be replaced with actual API call to register club user
    const newClub = {
      id: Date.now(),
      name: "New Club Member",
      phone: "0000000000",
      email: "member@example.com",
      address: "Address not provided",
      registeredAt: new Date().toISOString().split("T")[0],
      paymentStatus: "pending",
      amount: 0,
      selectedCategories: Array.from(clubForm.selectedCategories),
      categorySubfields: clubForm.categorySubfields
    };

    setClubUsers(prev => [...prev, newClub]);
    resetClubForm();
    setShowAddClubModal(false);
    alert("Club member added successfully!");
  };

  const handleEditClub = (club) => {
    setEditingClub(club);
    setClubForm({
      selectedCategories: new Set(club.selectedCategories || []),
      categorySubfields: club.categorySubfields || clubForm.categorySubfields
    });
    setShowEditClubModal(true);
  };

  const handleUpdateClub = (e) => {
    e.preventDefault();
    setClubUsers(prev =>
      prev.map(club =>
        club.id === editingClub.id
          ? {
              ...club,
              selectedCategories: Array.from(clubForm.selectedCategories),
              categorySubfields: clubForm.categorySubfields
            }
          : club
      )
    );

    setEditingClub(null);
    resetClubForm();
    setShowEditClubModal(false);
    alert("Club member updated successfully!");
  };

  const handleDeleteClub = (clubId) => {
    if (window.confirm("Are you sure you want to delete this club member?")) {
      setClubUsers(prev => prev.filter(club => club.id !== clubId));
      alert("Club member deleted successfully!");
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSendResult = (userId) => {
    setEmailStatus(prev => ({ ...prev, [userId]: "sent" }));
    setTimeout(() => {
      alert("Email sent successfully! User will receive a notification.");
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleCloseAddClubModal = () => {
    setShowAddClubModal(false);
    resetClubForm();
  };

  const handleCloseEditClubModal = () => {
    setShowEditClubModal(false);
    setEditingClub(null);
    resetClubForm();
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          activeTab="club"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab="club"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-y-auto">
        <UserTable
          serviceType="club"
          serviceUsers={clubUsers}
          serviceIcons={serviceIcons}
          serviceTitles={serviceTitles}
          categoryLabels={categoryLabels}
          emailStatus={emailStatus}
          onViewUser={handleViewUser}
          onEditClub={handleEditClub}
          onDeleteClub={handleDeleteClub}
          onSendResult={handleSendResult}
          onAddClubModal={() => setShowAddClubModal(true)}
        />
      </div>

      <UserDetailsModal
        selectedUser={selectedUser}
        showModal={showModal}
        onClose={handleCloseModal}
        categoryLabels={categoryLabels}
        emailStatus={emailStatus}
        onSendResult={handleSendResult}
      />

      <ClubFormModal
        show={showAddClubModal}
        isEdit={false}
        onClose={handleCloseAddClubModal}
        onSubmit={handleAddClub}
        clubForm={clubForm}
        categories={categories}
        categoryLabels={categoryLabels}
        newSubField={newSubField}
        activeCategory={activeCategory}
        loading={loading}
        onCategoryToggle={handleCategoryToggle}
        onAddSubField={handleAddSubField}
        onRemoveSubField={handleRemoveSubField}
        onUpdateSubField={handleUpdateSubField}
        onNewSubFieldChange={handleNewSubFieldChange}
        onImageUpload={handleImageUpload}
        setActiveCategory={setActiveCategory}
      />

      <ClubFormModal
        show={showEditClubModal}
        isEdit={true}
        onClose={handleCloseEditClubModal}
        onSubmit={handleUpdateClub}
        clubForm={clubForm}
        categories={categories}
        categoryLabels={categoryLabels}
        newSubField={newSubField}
        activeCategory={activeCategory}
        loading={loading}
        onCategoryToggle={handleCategoryToggle}
        onAddSubField={handleAddSubField}
        onRemoveSubField={handleRemoveSubField}
        onUpdateSubField={handleUpdateSubField}
        onNewSubFieldChange={handleNewSubFieldChange}
        onImageUpload={handleImageUpload}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default ClubDashboard;