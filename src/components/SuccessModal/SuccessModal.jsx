// SuccessModal.js
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, onHide, message }) => {
  useEffect(() => {
    if (show) {
      // Automatically close the modal after 2 seconds
      const timer = setTimeout(() => {
        onHide(); // Trigger the onHide function after 2 seconds
      }, 2000);

      // Clean up the timer if the component is unmounted or modal is hidden
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      animation={true}
      style={{
        position: "fixed",
        bottom: "20px", // Position the modal at the bottom
        left: "20px", // Position the modal at the right
        width: "300px",
        borderRadius: "8px",
        zIndex: 1050, // Ensure modal appears above other content
      }}
    >
      <Modal.Body>
        <p className="text-center">{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
