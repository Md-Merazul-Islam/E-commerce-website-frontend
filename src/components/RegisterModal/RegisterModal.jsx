import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import api from "../APi/Api";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
const RegisterModal = ({ show, onHide, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
    phone_number: "",
    address: "",
    image: null,
  });

  const [otpModalShow, setOtpModalShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    const registerData = new FormData();
    Object.keys(formData).forEach((key) => {
      registerData.append(key, formData[key]);
    });

    try {
      const response = await api.post("user/register/", registerData);
      if (response.status === 201) {
        setEmail(formData.email);
        setOtpModalShow(true);
        toast.success("Registration successful. Please check your email for OTP.");
        onHide();
      }
    } catch (error) {
      console.error("API error response:", error.response);
      const errorMessage = "Register failed please try again";
      setError(errorMessage);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await api.post("user/verify-email/", {
        email: email,
        otp: otp,
      });

      if (response.status === 200) {
        toast.success("OTP verified! Registration complete.");
        setOtpModalShow(false);
        onSwitchToLogin();
      } else {
        setError("OTP verification failed. Please try again.");
        toast.error("OTP verification failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "OTP verification failed.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {error && <p className="text-danger text-center">{error}</p>}

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formBasicLastName">
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formBasicPhoneNumber">
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    placeholder="Enter phone number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formBasicAddress">
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formBasicPassword1">
                  <Form.Control
                    type="password"
                    name="password1"
                    placeholder="Enter password"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="formBasicPassword2">
                  <Form.Control
                    type="password"
                    name="password2"
                    placeholder="Confirm password"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col sm={6}>
                <Form.Group controlId="formBasicImage">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#F7941D", borderColor: "#F7941D" }}
              className="w-100 mb-3"
            >
              Register
            </Button>

            <div className="text-center">
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary"
                  onClick={onSwitchToLogin}
                  style={{ cursor: "pointer" }}
                >
                  Login here
                </span>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={otpModalShow} onHide={() => setOtpModalShow(false)} centered>
        <Modal.Header closeButton>
          <h6>
            We have sent an OTP to your email. Please check your inbox and enter
            it here.
          </h6>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpSubmit();
            }}
          >
            <Form.Group className="mb-3" controlId="formOtp">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              style={{ backgroundColor: "#F7941D", borderColor: "#F7941D" }}
            >
              Verify OTP
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
