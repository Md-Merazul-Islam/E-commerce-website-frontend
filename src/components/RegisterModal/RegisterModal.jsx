import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RegisterModal = ({ show, onHide, onSwitchToLogin }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: '#F7941D', borderColor: '#F7941D' }}
            className="w-100 mb-3"
          >
            Register
          </Button>

          <div className="text-center">
            <p>
              Already have an account? <span className="text-primary" onClick={onSwitchToLogin} style={{ cursor: 'pointer' }}>Login here</span>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    

    
  );
};

export default RegisterModal;
