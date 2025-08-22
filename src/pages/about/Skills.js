import React from "react";

export default function Skills() {
  const skills = [
    { name: "HTML, CSS, JavaScript", level: 90 },
    { name: "Java", level: 80 },
    { name: "Python", level: 85 },
    { name: "C++", level: 75 },
    { name: "AI and Data Skills", level: 70 },
    { name: "Machine Learning with Python", level: 65 },
    { name: "SQL", level: 80 },
    { name: "Data Structures", level: 85 },
  ];

  return (
    <div id="skills" className="container skills-section">
      <h2>These are my Technical Skills</h2>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span>{skill.name}</span>
            <div className="skill-bar">
              <div className="skill-fill" style={{ "--level": `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
