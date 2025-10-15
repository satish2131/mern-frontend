import React from "react";
import "./About.css"; // 🔥 custom styles

export default function ContactMe() {
  return (
    <div id="contactme" className="contact-section">
      <h2 className="contact-title">
        Let’s Communicate <i className="fas fa-hand-paper"></i>
      </h2>

      <p className="contact-subtitle">
        Feel free to reach out through email, phone, or social platforms!
      </p>

      <ul className="contact-details">
        <li>
          <i className="fas fa-envelope"></i>
          <a href="mailto:satishcm035@gmail.com"> satishcm035@gmail.com</a>
        </li>
        <li>
          <i className="fas fa-phone"></i>
          <a href="tel:+918309556855"> +91 83095 56855</a>
        </li>
        <li>
          <i className="fas fa-map-marker-alt"></i> Kakinada, Andhra Pradesh, India
        </li>
        <li>
          <i className="fab fa-github"></i>
          <a
            href="https://github.com/satish2131"
            target="_blank"
            rel="noreferrer"
          >
            github.com/satish2131
          </a>
        </li>
        <li>
          <i className="fab fa-linkedin"></i>
          <a
            href="https://linkedin.com/in/sai-satish-875b05371"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/sai-satish-875b05371
          </a>
        </li>
      </ul>
    </div>
  );
}
