import React, { useEffect, useState } from "react";
import { FaAward, FaDownload, FaExternalLinkAlt, FaCheckCircle, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import api from "../api";
import "./Certificates.css";

const fallbackCertificates = [
  {
    _id: "cert-101",
    title: "Full-Stack Web Development Masterclass",
    courseTitle: "Full-Stack Web Development",
    description: "Demonstrated mastery in React 19, Node.js, Express, and MongoDB.",
    issueDate: "July 28, 2026",
    credentialId: "LX-8942-FSWD",
    fileUrl: "#"
  },
  {
    _id: "cert-102",
    title: "Python Data Science & AI Foundations",
    courseTitle: "Python & Machine Learning",
    description: "Completed 40 hours of practical data analysis and neural networks.",
    issueDate: "June 14, 2026",
    credentialId: "LX-5521-PYAI",
    fileUrl: "#"
  }
];

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    api.get("/api/certificates")
      .then(res => {
        const items = res.data || [];
        if (items.length > 0) {
          setCertificates(items);
        } else {
          setCertificates(fallbackCertificates);
        }
        setLoading(false);
      })
      .catch(() => {
        setCertificates(fallbackCertificates);
        setLoading(false);
      });
  }, []);

  return (
    <div className="certificates-page animate-fade-in">
      <div className="cert-header-bg">
        <div className="cert-header-container">
          <span className="badge badge-gold"><FaAward /> VERIFIED CREDENTIALS</span>
          <h1>Your Digital Certifications</h1>
          <p>Shareable digital diplomas with blockchain-style credential verification.</p>
        </div>
      </div>

      <div className="cert-body-container">
        {loading ? (
          <div className="cert-loading">Loading credentials...</div>
        ) : (
          <div className="certificate-grid">
            {certificates.map(cert => (
              <div key={cert._id} className="certificate-card glass-card">
                <div className="cert-card-header">
                  <div className="cert-badge-icon">
                    <FaGraduationCap size={24} />
                  </div>
                  <span className="verified-pill"><FaCheckCircle /> Verified</span>
                </div>

                <div className="cert-card-body">
                  <h3>{cert.title || cert.courseTitle}</h3>
                  <p>{cert.description}</p>
                  
                  <div className="credential-meta">
                    <div>
                      <span className="meta-lbl">Credential ID:</span>
                      <strong className="meta-val">{cert.credentialId || "LX-9901-LEARNX"}</strong>
                    </div>
                    <div>
                      <span className="meta-lbl">Issue Date:</span>
                      <strong className="meta-val">{cert.issueDate || "Recent"}</strong>
                    </div>
                  </div>
                </div>

                <div className="cert-card-footer">
                  <button className="btn btn-outline cert-btn" onClick={() => setPreviewCert(cert)}>
                    <FaExternalLinkAlt size={12} /> Preview Diploma
                  </button>
                  <a href={cert.fileUrl || "#"} className="btn btn-primary cert-btn" target="_blank" rel="noreferrer">
                    <FaDownload size={12} /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diploma Preview Modal */}
      {previewCert && (
        <div className="cert-modal-overlay" onClick={() => setPreviewCert(null)}>
          <div className="diploma-frame glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="diploma-border">
              <div className="diploma-header">
                <FaGraduationCap size={36} color="var(--accent-primary)" />
                <h2>Certificate of Completion</h2>
                <p>This certifies that</p>
                <div className="diploma-student-name">Learner</div>
                <p>has successfully completed the masterclass</p>
                <h3 className="diploma-course-name">{previewCert.title || previewCert.courseTitle}</h3>
              </div>

              <div className="diploma-footer">
                <div>
                  <FaShieldAlt color="#10b981" /> <strong>Verified by LearnX Platform</strong>
                  <div className="meta-val">ID: {previewCert.credentialId || "LX-8942-FSWD"}</div>
                </div>
                <button className="btn btn-primary" onClick={() => setPreviewCert(null)}>
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
