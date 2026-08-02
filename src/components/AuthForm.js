import React, { useState } from "react";
import api from "../api";

const AuthForm = ({ onAuth, isLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailTrimmed = form.email.trim();
    const passwordTrimmed = form.password;
    const nameTrimmed = form.name.trim();

    if (!emailTrimmed || !passwordTrimmed || (!isLogin && !nameTrimmed)) {
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

    if (!isLogin && nameTrimmed.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin 
        ? { email: emailTrimmed, password: passwordTrimmed } 
        : { name: nameTrimmed, email: emailTrimmed, password: passwordTrimmed };
      const res = await api.post(endpoint, body);
      onAuth(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "2rem auto" }}>
      {!isLogin && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />
      <button type="submit" style={{ width: "100%" }}>
        {isLogin ? "Login" : "Register"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default AuthForm;
