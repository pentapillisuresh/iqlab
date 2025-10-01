import React from 'react';
import { X, Plus, Trash2, Upload, Loader, Save } from 'lucide-react';

const ClubFormModal = ({
  show,
  isEdit,
  onClose,
  onSubmit,
  clubForm,
  categories,
  categoryLabels,
  newSubField,
  activeCategory,
  loading,
  onCategoryToggle,
  onAddSubField,
  onRemoveSubField,
  onUpdateSubField,
  onNewSubFieldChange,
  onImageUpload,
  setActiveCategory
}) => {
  if (!show) return null;

  const handleImageChange = (e, categoryId, subfieldIndex = null) => {
    e.preventDefault();
    onImageUpload(e, categoryId, subfieldIndex);
  };

  const handleAddSubFieldClick = (e, categoryId) => {
    e.preventDefault();
    console.log("Adding subfield to category:", categoryId);
    onAddSubField(categoryId);
  };

  const handleSubFieldUpdate = (categoryId, index, field, value) => {
    // Call the parent's update handler which will handle both local state and API call
    onUpdateSubField(categoryId, index, field, value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {isEdit ? "Edit Club activity" : "Add Club activity"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">
                Select Categories and Manage Subfields:
              </h4>

              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={clubForm.selectedCategories.has(category.id)}
                        onChange={() => onCategoryToggle(category.id)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-2 font-medium text-gray-700">
                        {category.name}
                      </span>
                    </label>
                  </div>

                  {clubForm.selectedCategories.has(category.id) && (
                    <div className="mt-4 space-y-3">
                      {/* Existing SubFields */}
                      {(clubForm.categorySubfields[category.id] || []).map(
                        (subField, index) => (
                          <div
                            key={subField.id || index}
                            className="bg-gray-50 p-3 rounded border"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Service Name"
                                  value={subField.name || ""}
                                  onChange={(e) =>
                                    handleSubFieldUpdate(
                                      category.id,
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    // Save on blur for better UX
                                    console.log(`Saving name change for subfield ${subField.id}`);
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  placeholder="Amount"
                                  value={subField.amount || 0}
                                  onChange={(e) =>
                                    handleSubFieldUpdate(
                                      category.id,
                                      index,
                                      "amount",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    // Save on blur for better UX
                                    console.log(`Saving amount change for subfield ${subField.id}`);
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Description"
                                  value={subField.description || ""}
                                  onChange={(e) =>
                                    handleSubFieldUpdate(
                                      category.id,
                                      index,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    // Save on blur for better UX
                                    console.log(`Saving description change for subfield ${subField.id}`);
                                  }}
                                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="relative">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageChange(e, category.id, index)
                                    }
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <button
                                    type="button"
                                    className="px-3 py-2 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 flex items-center"
                                  >
                                    <Upload className="h-3 w-3 mr-1" />
                                    Image
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onRemoveSubField(category.id, index)
                                  }
                                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                                  title="Delete subfield"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Show current/preview image */}
                            {(subField.image || subField.imagePreview) && (
                              <div className="mt-2">
                                <img
                                  src={
                                    subField.imagePreview ||
                                    (typeof subField.image === "string"
                                      ? `http://localhost:5000${subField.image}`
                                      : URL.createObjectURL(subField.image))
                                  }
                                  alt={subField.name}
                                  className="w-16 h-16 object-cover rounded border"
                                />
                              </div>
                            )}
                            
                            {/* Visual indicator for existing subfields */}
                            {subField.id && (
                              <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <Save className="h-3 w-3 mr-1" />
                                Changes auto-save
                              </div>
                            )}
                          </div>
                        )
                      )}

                      {/* Add New SubField */}
                      <div className="bg-blue-50 p-3 rounded border-2 border-dashed border-blue-300">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <input
                            type="text"
                            placeholder="Service Name"
                            value={
                              activeCategory === category.id
                                ? newSubField.name
                                : ""
                            }
                            onChange={(e) => {
                              setActiveCategory(category.id);
                              onNewSubFieldChange("name", e.target.value);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            placeholder="Amount"
                            value={
                              activeCategory === category.id
                                ? newSubField.amount
                                : 0
                            }
                            onChange={(e) => {
                              setActiveCategory(category.id);
                              onNewSubFieldChange("amount", e.target.value);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={
                              activeCategory === category.id
                                ? newSubField.description
                                : ""
                            }
                            onChange={(e) => {
                              setActiveCategory(category.id);
                              onNewSubFieldChange("description", e.target.value);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  setActiveCategory(category.id);
                                  handleImageChange(e, category.id);
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <button
                                type="button"
                                className="px-3 py-2 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 flex items-center"
                              >
                                <Upload className="h-3 w-3 mr-1" />
                                Image
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={(e) =>
                                handleAddSubFieldClick(e, category.id)
                              }
                              disabled={loading || !newSubField.name?.trim()}
                              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                              title="Add new subfield"
                            >
                              {loading ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        {activeCategory === category.id &&
                          newSubField.imagePreview && (
                            <div className="mt-2">
                              <img
                                src={newSubField.imagePreview}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded border"
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `${isEdit ? "Update" : "Add"} Activity`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClubFormModal;