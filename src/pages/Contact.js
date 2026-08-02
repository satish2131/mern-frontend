import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaQuestionCircle, FaCheckCircle, FaComments } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Course Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameTrimmed = form.name.trim();
    const emailTrimmed = form.email.trim();
    const messageTrimmed = form.message.trim();

    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      alert("All fields are required.");
      return;
    }

    if (nameTrimmed.length < 2 || nameTrimmed.length > 100) {
      alert("Name must be between 2 and 100 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (messageTrimmed.length < 10 || messageTrimmed.length > 1000) {
      alert("Message must be between 10 and 1000 characters long.");
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "Course Inquiry", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    { q: "How do I get access after purchasing a course?", a: "Access credentials and receipt are instantly sent to your email after checkout." },
    { q: "Are the certificates verified?", a: "Yes! Every certificate comes with a unique credential ID and verification URL." },
    { q: "Can I request a refund if not satisfied?", a: "We offer a 30-day money-back guarantee with no questions asked." }
  ];

  return (
    <div className="contact-page animate-fade-in">
      <div className="contact-header-bg">
        <div className="contact-header-container">
          <span className="badge badge-primary"><FaComments /> HELP & SUPPORT</span>
          <h1>Get In Touch With LearnX Team</h1>
          <p>Have questions about masterclasses, payment gateways, or certificates? We're here 24/7.</p>
        </div>
      </div>

      <div className="contact-body-container">
        <div className="contact-grid">
          {/* Left Info Column */}
          <div className="contact-info-col">
            <div className="info-card glass-card">
              <div className="info-icon"><FaEnvelope size={20} /></div>
              <div>
                <h4>Email Support</h4>
                <p>support@learnx-platform.com</p>
                <span className="info-sub">Response time: within 2 hours</span>
              </div>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon icon-purple"><FaPhoneAlt size={20} /></div>
              <div>
                <h4>Live Helpdesk</h4>
                <p>+1 (800) 555-LEARN</p>
                <span className="info-sub">Mon - Fri, 9am - 6pm EST</span>
              </div>
            </div>

            <div className="info-card glass-card">
              <div className="info-icon icon-emerald"><FaMapMarkerAlt size={20} /></div>
              <div>
                <h4>Global HQ</h4>
                <p>Tech Hub Plaza, San Francisco, CA</p>
                <span className="info-sub">United States</span>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-box glass-panel">
              <h3><FaQuestionCircle color="var(--accent-primary)" /> Frequently Asked</h3>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <div key={i} className="faq-item">
                    <strong>{faq.q}</strong>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="contact-form-col">
            <form className="contact-glass-form glass-panel" onSubmit={handleSubmit}>
              <h2>Send Us A Message</h2>
              <p className="form-subtitle">Fill out the form below and an advisor will respond promptly.</p>

              {submitted && (
                <div className="contact-success-toast animate-fade-in">
                  <FaCheckCircle size={20} color="#10b981" /> Message received! Our team will reply shortly.
                </div>
              )}

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Inquiry Topic</label>
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option value="Course Inquiry">Course Catalog & Curriculum</option>
                  <option value="Enrollment Issue">Enrollment & Payment</option>
                  <option value="Certificate Verification">Certificate Verification</option>
                  <option value="Enterprise Partnership">Enterprise & Team Licensing</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we assist your learning journey?"
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-submit-contact">
                <FaPaperPlane size={14} /> Send Message Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
