import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ contact: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll contact you soon.");
    setForm({ contact: "", message: "" });
  };

  return (
    <div className="contact-page">
      <form className="contact-card" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Your Email or Phone Number"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          rows="6"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
