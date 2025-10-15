import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import EnrollmentModal from "../components/EnrollmentModal"; // 🔥 import modal

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const coursesPreview = [
    {
      title: "Web Development",
      description: "Learn HTML, CSS, JavaScript & React from scratch.",
      imageUrl:
        "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
    },
    {
      title: "Python Programming",
      description: "Master Python and build real-world projects.",
      imageUrl:
        "https://img.freepik.com/free-vector/python-programming-concept-illustration_114360-1564.jpg",
    },
    {
      title: "Machine Learning",
      description: "Dive into AI & ML algorithms with Python.",
      imageUrl:
        "https://i.postimg.cc/9MYY7cFG/photo-1557562645-4eee56b29bc1.avif",
    },
    {
      title: "SQL",
      description: "Dive into Database and Manupulation.",
      imageUrl:
        "https://i.postimg.cc/TYmxzPQd/download.jpg",
    },
  ];

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Learn. Build. Grow.</h1>
          <p>
            Explore high-quality courses, gain new skills, and earn certificates
            to showcase your achievements.
          </p>
          <Link to="/courses" className="btn">
            Browse Courses
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/online-courses-concept_23-2148533386.jpg"
            alt="Learn online"
          />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Popular Courses</h2>
        <div className="course-cards">
          {coursesPreview.map((course, idx) => (
            <div key={idx} className="course-card">
              <img src={course.imageUrl} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn" onClick={() => handleEnroll(course)}>
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <h2>Why Learn With Us?</h2>
        <div className="benefits">
          <div className="benefit">
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="benefit">
            <h3>Flexible Learning</h3>
            <p>Access courses anytime, anywhere, at your own pace.</p>
          </div>
          <div className="benefit">
            <h3>Certifications</h3>
            <p>
              Earn verified certificates to showcase your skills to employers.
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 Enrollment Modal */}
      <EnrollmentModal
        show={showModal}
        course={selectedCourse || {}}
        onClose={() => setShowModal(false)}
        fromHome={true}
      />
    </div>
  );
}
