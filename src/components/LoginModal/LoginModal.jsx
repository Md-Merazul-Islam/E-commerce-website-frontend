import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { toast } from "react-toastify"; // Correct import
import api from "../APi/Api";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = ({ show, onHide, onSwitchToRegister }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    try {
      const response = await api.post("/user/login/", {
        username_or_email: usernameOrEmail,
        password: password,
      });

      const data = response.data;

      if (data.access && data.refresh) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("is_staff", data.is_staff);
        localStorage.setItem("is_superuser", data.is_superuser);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        toast.success("Login Successful");

        onHide();
        navigate("/");
      } else {
        setError("Invalid username or password");
        toast.error("Invalid username or password");
      }
    } catch (error) {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
      console.log("login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#F7941D", borderColor: "#F7941D" }}
            className="w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <span
                className="text-primary"
                onClick={onSwitchToRegister}
                style={{ cursor: "pointer" }}
              >
                Register here
              </span>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
