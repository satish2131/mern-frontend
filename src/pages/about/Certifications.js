import React from "react";
import "./About.css"; // Styling

export default function Certifications() {
  const certificates = [
    {
      title: "Java",
      link: "https://github.com/satish2131/.../Java%20certificate%20.pdf",
      icon: "fab fa-java",
      color: "#f89820",
    },
    {
      title: "Python",
      link: "https://github.com/satish2131/.../Python%20certificate.pdf",
      icon: "fab fa-python",
      color: "#3776AB",
    },
    {
      title: "AI and Data Skills",
      link: "https://github.com/satish2131/.../ai%20and%20dataskills%20certification.pdf",
      icon: "fas fa-brain",
      color: "#ff4444",
    },
    {
      title: "AWS Academy Cloud Foundations",
      link: "https://github.com/satish2131/.../cloud%20foundations%20(aws%20academy).pdf",
      icon: "fab fa-aws",
      color: "#FF9900",
    },
    {
      title: "AWS Academy Cloud Security Foundations",
      link: "https://github.com/satish2131/.../AWS_Academy_Cloud_Security_Foundations.pdf",
      icon: "fas fa-shield-alt",
      color: "#00cc99",
    },
    {
      title: "Machine Learning with Python",
      link: "https://github.com/satish2131/.../ML_with_Python_certificate.pdf",
      icon: "fab fa-python",
      color: "#3776AB",
    },
  ];

  return (
    <div id="certifications" className="certifications-section">
      <h2>
        My Certifications <i className="fas fa-star" style={{ color: "#ffcc00" }}></i>
      </h2>
      <p className="cert-desc">
        Explore my certifications by clicking the cards below 👇
      </p>

      <div className="cert-grid">
        {certificates.map((cert, idx) => (
          <a
            key={idx}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <div className="cert-icon" style={{ color: cert.color }}>
              <i className={cert.icon}></i>
            </div>
            <h3>{cert.title}</h3>
            <p>View Certificate</p>
          </a>
        ))}
      </div>
    </div>
  );
}
