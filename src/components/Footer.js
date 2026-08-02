import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaPaperPlane, FaShieldAlt, FaCcVisa, FaCcMastercard, FaCcApplePay, FaLock, FaGithub, FaLinkedin, FaTwitter, FaCheckCircle } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <div className="logo-icon">
              <FaGraduationCap size={20} />
            </div>
            <span>Learn<span className="logo-highlight">X</span></span>
          </Link>
          <p className="footer-tagline">
            Empowering tech learners worldwide with industry-ready coding courses, interactive projects, and verified digital credentials.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-title">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Explore Catalog</Link></li>
            <li><Link to="/certificates">Verify Certificates</Link></li>
            <li><Link to="/contact">Help & Support</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-col">
          <h4 className="footer-title">Categories</h4>
          <ul className="footer-links">
            <li><Link to="/courses">Full-Stack Web Dev</Link></li>
            <li><Link to="/courses">Python & Machine Learning</Link></li>
            <li><Link to="/courses">AWS Cloud Computing</Link></li>
            <li><Link to="/courses">UI/UX Design Systems</Link></li>
            <li><Link to="/courses">Data Structures & Algo</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Security */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-title">Stay Updated</h4>
          <p className="newsletter-desc">Subscribe to get course updates, discount coupons, and tech learning tips.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              <FaPaperPlane size={14} />
            </button>
          </form>
          {subscribed && (
            <div className="subscribe-success animate-fade-in">
              <FaCheckCircle color="#10b981" /> Subscribed successfully!
            </div>
          )}

          <div className="trust-badges">
            <span className="trust-item"><FaLock size={12} /> SSL Encrypted</span>
            <span className="trust-item"><FaShieldAlt size={12} /> Money-Back Guarantee</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} LearnX Platform Inc. All rights reserved.</p>
          <div className="payment-icons">
            <span className="payment-text">Secured Payment Gateways:</span>
            <FaCcVisa size={26} title="Visa" />
            <FaCcMastercard size={26} title="Mastercard" />
            <FaCcApplePay size={26} title="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
}
