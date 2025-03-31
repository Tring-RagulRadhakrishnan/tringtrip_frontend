import React from "react";
import "./ConfirmPopup.css";

const ConfirmPopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="confirm-btn">Yes</button>
          <button onClick={onClose} className="cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
