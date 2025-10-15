import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; // 🔥 Confetti animation
import "./EnrollmentModal.css";

export default function EnrollmentModal({ show, course, onClose, fromHome = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  if (!show) return null;

  const goHome = () => {
    navigate("/"); 
    onClose();     
  };

  const browseAnother = () => {
    if (fromHome) {
      navigate("/courses"); 
    }
    onClose();
  };

  const handleEnroll = () => {
    if (!email) {
      alert("Please enter your email to enroll!");
      return;
    }

    console.log(`Enroll ${email} for course: ${course.title}`);

    // 🔥 Show confetti animation
    setShowConfetti(true);

    // 🔥 Hide confetti after 2 seconds
    setTimeout(() => {
      setShowConfetti(false);
      alert(`Enrollment link and credentials sent to ${email}`);
      setEmail("");
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
        <span className="close-btn" onClick={onClose}>&times;</span>
        {/* Email Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
          alt="Email Icon"
          className="email-icon"
        />

        {/* Title */}
        <h2>
          Enroll in <span style={{ color: "#ffcc00" }}>{course.title}</span>
        </h2>

        {/* Description */}
        <p className="modal-desc">
          Enter your email to receive course access and login credentials.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input"
        />

        {/* Note */}
        <p className="modal-note">
          Note: You will receive course access details and credentials on this email.
        </p>

        {/* Enroll Now Button */}
        <button className="btn-enroll" onClick={handleEnroll}>
          Enroll Now
        </button>

        {/* Navigation Buttons */}
        <div className="modal-buttons">
          <button onClick={goHome} className="btn-primary">
            Go to Home
          </button>
          <button
            onClick={browseAnother}
            className={`btn-secondary ${fromHome ? "navigate" : ""}`}
          >
            Browse Another Course
          </button>
        </div>
      </div>
    </div>
  );
}
