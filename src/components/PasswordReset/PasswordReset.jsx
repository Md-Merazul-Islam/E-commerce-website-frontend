import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import api from "../APi/Api";
import "./PasswordReset.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/user/send-otp/", { email });
      console.log(response);
      if (response.status === 200 && response.statusText === "OK") {
        setStep(2);
        toast.success("OTP sent successfully! Please check your email.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error occurred while sending OTP.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/user/reset-password/", {
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      console.log(response);

      if (response.status === 200 && response.statusText === "OK") {
        toast.success("Password reset successfully!");
        navigate("/login")
      } else {
        toast.error(
          response.data?.message ||
            "Failed to reset password. Please check the OTP."
        );
      }
    } catch (error) {
      toast.error("Error occurred while resetting password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-content">
        <h2 className="mb-5 text-center">Password Reset</h2>

        {step === 1 ? (
          // Step 1: Email input to send OTP
          <Form onSubmit={handleSendOtp}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
              style={{ backgroundColor: "#F7941D", borderColor: "#F7941D" }}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Send OTP"
              )}
              {loading && " OTP Sending..."}
            </Button>
          </Form>
        ) : (
          // Step 2: OTP, New password, and Confirm password input
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3" controlId="formOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
              style={{ backgroundColor: "#F7941D", borderColor: "#F7941D" }}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Reset Password"
              )}
              {loading && " Password Reset..."}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
