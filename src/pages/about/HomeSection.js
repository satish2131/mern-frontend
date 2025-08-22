import React from "react";

export default function HomeSection() {
  return (
    <div id="home" className="container">
      <div className="home-content">
        <h1>Welcome to My Portfolio</h1>
        <i>
          Hi, I'm <b>D.Sai Satish</b>, a passionate web developer with a strong
          background in front-end and back-end technologies.
        </i>
        <p>
          Feel free to explore my work, check out my certifications, or connect
          with me for collaborations and opportunities.
        </p>
        <a
          href="https://github.com/satish2131/Portfolio_files/blob/main/resume.pdf"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download My Resume
        </a>
      </div>
    </div>
  );
}
