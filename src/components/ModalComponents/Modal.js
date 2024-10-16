// Modal.js
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? 'block' : 'hidden';

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto top-0 my-2 ${modalClasses} `}
    //   onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>
        <div className="z-50 w-auto p-4 bg-white rounded-lg shadow-lg">
          <div className="relative ">
            {/* <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
