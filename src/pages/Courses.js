
  import React, { useState, useEffect, useCallback } from "react";
  import { getCourses } from "../api";
  import "./Courses.css";
  import EnrollmentModal from "../components/EnrollmentModal";



export default function Courses() {
  // Listen for enrollCourseFromSearch event to open modal for searched course
  useEffect(() => {
    const handleEnrollEvent = (e) => {
      const course = e.detail;
      if (course) {
        setSelectedCourse(course);
        setShowModal(true);
        // Optionally scroll to the course card
        const cardEl = document.getElementById(course._id);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          cardEl.classList.add("highlight");
          setTimeout(() => cardEl.classList.remove("highlight"), 1500);
        }
      }
    };
    window.addEventListener("enrollCourseFromSearch", handleEnrollEvent);
    return () => window.removeEventListener("enrollCourseFromSearch", handleEnrollEvent);
  }, []);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 12;

  const fetchPage = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await getCourses(p, limit);
      setCourses(prev => (p === 1 ? data.items : [...prev, ...data.items]));
      setHasMore(p < (data.totalPages || 1));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  const enrollCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    // highlight and pulse logic can be added here if needed
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.length === 0 && !loading ? (
          <div className="no-courses">No courses available.</div>
        ) : (
          courses.map((course) => (
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
              <span className="duration-badge">{course.duration}</span>
              <p>{course.description}</p>
              <button className="enroll-btn" onClick={() => enrollCourse(course)}>
                Enroll Now
              </button>
            </div>
          ))
        )}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {!loading && hasMore && (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
      {!loading && !hasMore && courses.length > 0 && (
        <div className="end-list">You have reached the end.</div>
      )}
      <EnrollmentModal
        show={showModal}
        course={selectedCourse}
        onClose={() => setShowModal(false)}
        fromHome={false}
      />
    </div>
  );
}
