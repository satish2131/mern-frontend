import React from "react";
import "./ProfileModal.css";

export default function ProfileModal({ show, onClose }) {
  if (!show) return null;

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

        {/* Login Form */}
        <div className="login-form">
          <input type="text" placeholder="User ID" />
          <input type="password" placeholder="Password" />
          <button className="login-btn">Login</button>
        </div>

        {/* Note */}
        <p className="login-note">
          Note: You will receive the login ID and password after enrolling in a course. The credentials will be sent to your registered email.
        </p>
      </div>
    </div>
  );
}
