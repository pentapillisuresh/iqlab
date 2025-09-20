import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const UserDetailsModal = ({ 
  selectedUser, 
  showModal, 
  onClose, 
  categoryLabels, 
  emailStatus, 
  onSendResult 
}) => {
  if (!showModal || !selectedUser) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg sm:max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">User Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-lg font-semibold text-blue-600">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{selectedUser.name}</h4>
                <p className="text-sm text-gray-600">User ID: {selectedUser.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">{selectedUser.email}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">{selectedUser.phone}</span>
              </div>
              
              {selectedUser.address && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-gray-600">{selectedUser.address}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-gray-600">Registered: {selectedUser.registeredAt}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedUser.paymentStatus === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Payment: {selectedUser.paymentStatus}
                </span>
              </div>
            </div>
            
            {selectedUser.categories && (
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Selected Categories:</h5>
                <div className="space-y-2">
                  {Object.entries(selectedUser.categories)
                    .filter(([_, data]) => data.selected)
                    .map(([key, data]) => (
                      <div key={key} className="border rounded-lg p-3 bg-gray-50">
                        <h6 className="font-medium text-gray-700 mb-1">
                          {categoryLabels[key]}
                        </h6>
                        {data.subFields && data.subFields.length > 0 && (
                          <div className="space-y-1">
                            {data.subFields.map((subField, index) => (
                              <div key={index} className="text-sm text-gray-600 flex justify-between">
                                <span>{subField.name}</span>
                                {subField.amount > 0 && (
                                  <span className="font-medium">₹{subField.amount}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {selectedUser.serviceType === 'career' && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Send Result:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onSendResult(selectedUser.id)}
                    disabled={emailStatus[selectedUser.id] === 'sent'}
                    className={`px-3 py-1 text-sm rounded ${
                      emailStatus[selectedUser.id] === 'sent'
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {emailStatus[selectedUser.id] === 'sent' ? 'Sent' : 'Send Email'}
                  </button>
                  {emailStatus[selectedUser.id] === 'sent' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;