import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import "./Courses.css";
import EnrollmentModal from "../components/EnrollmentModal"; // 🔥 reuse same modal

// 🔥 Replace this with a valid user _id from your MongoDB
const USER_ID = "68a31104ebb14bddbb2175af"; 

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses`)

      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
  api.get("/api/certificates")
    .then(res => setCourses(res.data))
    .catch(err => console.log(err));
}, []);

  useEffect(() => {
    const handleEnrollEvent = (e) => {
      enrollCourse(e.detail); // open modal for the selected course
    };

    window.addEventListener("enrollCourseFromSearch", handleEnrollEvent);

    return () => {
      window.removeEventListener("enrollCourseFromSearch", handleEnrollEvent);
    };
  }, [courses]);

  const enrollCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);

    const cardEl = document.getElementById(course._id);
    const btnEl = cardEl.querySelector(".enroll-btn");

    if (cardEl) {
      cardEl.classList.add("highlight");
      setTimeout(() => cardEl.classList.remove("highlight"), 1500);
    }

    if (btnEl) {
      btnEl.classList.add("pulse");
      setTimeout(() => btnEl.classList.remove("pulse"), 1500);
    }

    axios
      .post(`http://localhost:5000/api/users/enroll/${USER_ID}`, {
        courseId: course._id,
      })
      .then(() => console.log(`${course.title} enrollment successful`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <div
            key={course._id}
            id={course._id}
            className="course-card"
          >
            <img
              src={course.image || "https://via.placeholder.com/300x180"}
              alt={course.title}
            />
            <h3>{course.title}</h3>
            <span className="duration-badge">{course.duration}</span> {/* 🔥 New badge */}
            <p>{course.description}</p>
            <button className="enroll-btn" onClick={() => enrollCourse(course)}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      <EnrollmentModal
        show={showModal}
        course={selectedCourse}
        onClose={() => setShowModal(false)}
        fromHome={false}
      />
    </div>
  );
}
