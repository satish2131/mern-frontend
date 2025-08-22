import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./Certificates.css";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get("https://learnx-enroll.onrender.com/api/certificates")
      .then(res => setCertificates(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="certificates-page">
      <h2>Your Certificates</h2>
      <div className="certificate-grid">
        {certificates.length > 0 ? (
          certificates.map(cert => (
            <div key={cert._id} className="certificate-card">
              <h3>{cert.title}</h3>
              <p>{cert.description}</p>
              <a href={cert.fileUrl} target="_blank" rel="noreferrer">
                Download <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          ))
        ) : (
          <p>No certificates available yet.</p>
        )}
      </div>
    </div>
  );
}
