import React, { useState } from "react";
import api from "../api";
import "./ProfileModal.css";

export default function ProfileModal({ show, onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
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
    setLoading(true);
    try {
      let res;
      if (isRegister) {
        res = await api.post("/api/auth/register", form);
        // After registration, auto-login
        res = await api.post("/api/auth/login", { email: form.email, password: form.password });
      } else {
        res = await api.post("/api/auth/login", { email: form.email, password: form.password });
      }
      if (onLogin) onLogin(res.data);
      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box">
        {/* Close Button */}
        <span className="close-btn" onClick={onClose}>&times;</span>

        {/* Animated Avatar */}
        <div className="avatar-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="avatar"
          />
        </div>

        {/* Login/Register Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
          </button>
          {error && <div style={{ color: "#ff4d4f", marginTop: 8 }}>{error}</div>}
          <div style={{ marginTop: 18, textAlign: "center" }}>
            {isRegister ? (
              <span style={{ color: "#888", fontSize: 15 }}>
                Already have an account?
                <button type="button" style={{
                  color: "#fff",
                  background: "#4fa3ff",
                  borderRadius: 16,
                  padding: "3px 14px",
                  marginLeft: 8,
                  fontWeight: 500,
                  border: "none",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(79,163,255,0.15)",
                  transition: "background 0.2s",
                  cursor: "pointer"
                }}
                  onClick={() => setIsRegister(false)}
                  onMouseOver={e => e.target.style.background = '#3578e5'}
                  onMouseOut={e => e.target.style.background = '#4fa3ff'}
                >
                  Login
                </button>
              </span>
            ) : (
              <span style={{ color: "#888", fontSize: 15 }}>
                Not registered yet?
                <button type="button" style={{
                  color: "#fff",
                  background: "#4fa3ff",
                  borderRadius: 16,
                  padding: "3px 14px",
                  marginLeft: 8,
                  fontWeight: 500,
                  border: "none",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(79,163,255,0.15)",
                  transition: "background 0.2s",
                  cursor: "pointer"
                }}
                  onClick={() => setIsRegister(true)}
                  onMouseOver={e => e.target.style.background = '#3578e5'}
                  onMouseOut={e => e.target.style.background = '#4fa3ff'}
                >
                  Register now
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
