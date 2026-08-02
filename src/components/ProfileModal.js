import React, { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaGraduationCap, FaSpinner } from "react-icons/fa";
import api from "../api";
import "./ProfileModal.css";

export default function ProfileModal({ show, onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password;
    const nameTrimmed = form.name.trim();

    if (!emailTrimmed || !passwordTrimmed || (isRegister && !nameTrimmed)) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (passwordTrimmed.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (isRegister && nameTrimmed.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isRegister) {
        await api.post("/api/auth/register", { name: nameTrimmed, email: emailTrimmed, password: passwordTrimmed });
        res = await api.post("/api/auth/login", { email: emailTrimmed, password: passwordTrimmed });
      } else {
        res = await api.post("/api/auth/login", { email: emailTrimmed, password: passwordTrimmed });
      }
      if (onLogin) onLogin(res.data);
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes size={16} />
        </button>

        {/* Modal Header & Tabs */}
        <div className="auth-modal-header">
          <div className="auth-logo-badge">
            <FaGraduationCap size={24} />
          </div>
          <h3>Welcome to Learn<span className="logo-highlight">X</span></h3>
          <p>Sign in to track your course progress and certificates.</p>

          <div className="auth-tab-group">
            <button
              type="button"
              className={`auth-tab ${!isRegister ? "active" : ""}`}
              onClick={() => { setIsRegister(false); setError(""); }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${isRegister ? "active" : ""}`}
              onClick={() => { setIsRegister(true); setError(""); }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </button>
          </div>

          {error && <div className="auth-error-toast">{error}</div>}

          <button className="btn btn-primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"><FaSpinner className="spin" /> Processing...</span>
            ) : isRegister ? (
              "Register & Start Learning"
            ) : (
              "Sign In to Account"
            )}
          </button>
        </form>

        {/* Social Auth Mock */}
        <div className="social-auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="social-auth-buttons">
          <button type="button" className="social-btn google-btn">
            <FaGoogle /> Google
          </button>
          <button type="button" className="social-btn github-btn">
            <FaGithub /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
