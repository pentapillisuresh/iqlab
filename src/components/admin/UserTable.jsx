import React from 'react';
import { Plus, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';

const UserTable = ({
  serviceType,
  serviceUsers,
  serviceIcons,
  serviceTitles,
  categoryLabels,
  emailStatus,
  onViewUser,
  onEditClub,
  onDeleteClub,
  onSendResult,
  onAddClubModal,
}) => {
  const IconComponent = serviceIcons[serviceType];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            {serviceTitles[serviceType]} Users
          </h1>
        </div>
        {serviceType === 'club' && (
          <button
            onClick={onAddClubModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Club activity
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>

                {/* ✅ Show only for ISO */}
                {serviceType === 'iso' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      GST Number
                    </th>
                  </>
                )}

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Status
                </th>

                {/* ✅ Show only for Career */}
                {serviceType === 'career' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Result Status
                  </th>
                )}

                {/* ✅ Show only for Club */}
                {serviceType === 'club' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category & Subcategory
                  </th>
                )}

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {serviceUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <IconComponent className="h-12 w-12 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">
                        No {serviceTitles[serviceType]} users found
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {serviceType === 'club'
                          ? 'Click "Add Club Member" to get started'
                          : 'Users will appear here once they register'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                serviceUsers.map((user) => (
                  <tr key={user._id || user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>

                    {/* ✅ Render only for ISO */}
                    {serviceType === 'iso' && (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.companyName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.gstNumber}
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                        : 'N/A'}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${user.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {user.paymentStatus || 'pending'}
                      </span>
                    </td>

                    {/* ✅ Career Result */}
                    {serviceType === 'career' && (
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <select
                            value={
                              emailStatus[user._id] ||
                              user.resultStatus ||
                              'pending'
                            }
                            onChange={(e) => {
                              if (e.target.value === 'send') {
                                onSendResult(user._id);
                              }
                            }}
                            className="px-2 py-1 text-xs border border-gray-300 rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="send">Send Result</option>
                            <option value="sent">Sent</option>
                          </select>
                          {emailStatus[user._id] === 'sent' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                    )}

                    {/* ✅ Club Category + Subfield */}
                    {/* ✅ Club Category + Subfield */}
                    {/* ✅ Club Category + Subfield (Stacked) */}
                    {/* ✅ Club Category + Subfield (Clean Stacked Labels) */}
                    {serviceType === 'club' && (
                      <td className="px-6 py-4 text-sm text-gray-500 align-top">
                        <div className="flex flex-col items-start space-y-1">
                          {/* Category */}
                          {user.category?.name && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">
                              {user.category.name}
                            </span>
                          )}

                          {/* Subcategory */}
                          {user.subfield?.name && user.subfield.name !== 'N/A' && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-md">
                              {user.subfield.name}
                            </span>
                          )}
                        </div>
                      </td>
                    )}




                    {/* Actions */}
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {serviceType === 'club' && (
                          <>
                            <button
                              onClick={() => onEditClub(user)}
                              className="text-green-600 hover:text-green-900"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onDeleteClub(user._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
