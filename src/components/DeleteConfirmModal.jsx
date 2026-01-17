'use client';

import { useState, useEffect } from 'react';
import { FiTrash2, FiX, FiAlertTriangle } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';

export default function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName, 
  itemType = "item",
  isDeleting = false 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isDeleting) {
      onConfirm();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="text-red-600 text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Delete {itemType}
            </h3>
          </div>
          {!isDeleting && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <FiTrash2 className="text-red-600 text-2xl" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">
                Are you sure you want to delete this {itemType}?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-red-400">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  "{itemName}"
                </p>
              </div>
              <p className="text-sm text-gray-500">
                This action cannot be undone. The {itemType} will be permanently removed.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <LoadingSpinner size="sm" />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 className="text-sm" />
                Delete {itemType}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}