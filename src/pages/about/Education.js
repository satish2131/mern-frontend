import React from "react";
import "./Education.css"; // 🔥 add custom styles

export default function Education() {
  const educationData = [
    {
      degree: "B.Tech in Computer Science",
      college: "PYDAH College of Engineering, Kakinada",
      years: "2023 – 2026 (Pursuing)",
      details: "Core: DS, AI & ML, DBMS, Python, Java",
      icon: "fas fa-graduation-cap",
    },
    {
      degree: "Diploma",
      college: "KIET College, Korangi",
      years: "2020 – 2023",
      details: "Percentage: 71%",
      icon: "fas fa-university",
    },
    {
      degree: "SSC",
      college: "AMG English Medium High School",
      years: "2018 – 2020",
      details: "GPA: 8.1",
      icon: "fas fa-school",
    },
  ];

  return (
    <div id="education" className="education-section">
      <h2 className="section-title">
        <i className="fas fa-book-reader"></i> My Education
      </h2>

      <div className="timeline">
        {educationData.map((edu, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">
              <i className={edu.icon}></i>
            </div>
            <div className="timeline-content">
              <h3>{edu.degree}</h3>
              <h4>{edu.college}</h4>
              <span className="edu-years">{edu.years}</span>
              <p>{edu.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
