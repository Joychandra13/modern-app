'use client';

import { useState, useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

export default function SuccessNotification({ 
  isVisible, 
  onClose, 
  message = "Action completed successfully!",
  autoClose = true,
  duration = 3000 
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiCheckCircle className="text-green-600 text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              Success!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <FiX className="text-gray-400 text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}