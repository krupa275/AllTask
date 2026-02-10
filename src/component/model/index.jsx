import React from 'react';
import './Modal.css'; // Create this file for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Prevent clicks inside the modal content from closing the modal (event bubbling)
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* This is an 'X' character */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
