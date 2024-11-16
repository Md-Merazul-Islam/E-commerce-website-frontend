
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, onHide, message }) => {
  useEffect(() => {
    if (show) {
      
      const timer = setTimeout(() => {
        onHide(); 
      }, 2000);

      
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
        bottom: "20px", 
        left: "20px", 
        width: "300px",
        borderRadius: "8px",
        zIndex: 1050, 
      }}
    >
      <Modal.Body>
        <p className="text-center">{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
