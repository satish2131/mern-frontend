import React, { useRef, useEffect } from "react";
import "./About.css";

import HomeSection from "./HomeSection";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Education from "./Education";
import ContactMe from "./ContactMe";

export default function About() {
  const sectionsRef = useRef([]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Fixed Profile Pic */}
      <div className="profile-pic">
        <img
          src="https://i.postimg.cc/3J7B14NT/IMG-1396.jpg"
          alt="profile"
        />
      </div>

      {/* Scrollable Sections */}
      <div className="sections">
        <section id="home" ref={(el) => (sectionsRef.current[0] = el)} className="fade-section">
          <HomeSection />
        </section>
        <section id="skills" ref={(el) => (sectionsRef.current[1] = el)} className="fade-section">
          <Skills />
        </section>
        <section id="certifications" ref={(el) => (sectionsRef.current[2] = el)} className="fade-section">
          <Certifications />
        </section>
        <section id="education" ref={(el) => (sectionsRef.current[3] = el)} className="fade-section">
          <Education />
        </section>
        <section id="contactme" ref={(el) => (sectionsRef.current[4] = el)} className="fade-section">
          <ContactMe />
        </section>
      </div>
    </div>
  );
}
