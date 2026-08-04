import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaClock, FaUserGraduate, FaCheckCircle, FaPlayCircle, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import api from "../api";
import EnrollmentModal from "../components/EnrollmentModal";
import "./CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("curriculum");

  useEffect(() => {
    // Fetch course details by ID
    api.get(`/api/courses/${id}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback default course object if test ID is opened
        setCourse({
          _id: id || "c1",
          title: "Full-Stack React 19 & Node Masterclass",
          description: "Comprehensive end-to-end masterclass covering modern React, Express REST APIs, MongoDB Database Architecture, Authentication, and Production Deployment.",
          price: 49.99,
          rating: 4.9,
          reviewsCount: 1240,
          studentsCount: 8520,
          duration: "12 Weeks (45 Hours Content)",
          category: "Full-Stack Web",
          instructor: "Alex Rivera, Lead Engineer @ TechCorp",
          image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading-state">
        <div className="loading-spinner" style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
          Loading course details...
        </div>
      </div>
    );
  }

  const modules = [
    { title: "Module 1: Modern JavaScript & Async Fundamentals", lessons: 8, duration: "3h 45m" },
    { title: "Module 2: React 19 Architecture & State Management", lessons: 12, duration: "6h 20m" },
    { title: "Module 3: Node.js & Express RESTful API Development", lessons: 10, duration: "5h 15m" },
    { title: "Module 4: MongoDB Schemas, Mongoose & Indexing", lessons: 9, duration: "4h 30m" },
    { title: "Module 5: JWT Auth, Security & Production Deployment", lessons: 7, duration: "4h 10m" }
  ];

  return (
    <div className="course-details-page animate-fade-in">
      <div className="details-header-bg">
        <div className="details-header-container">
          <button className="back-link-btn" onClick={() => navigate("/courses")}>
            <FaArrowLeft /> Back to Catalog
          </button>

          <div className="details-header-grid">
            <div className="details-header-info">
              <span className="badge badge-primary">{course.category}</span>
              <h1>{course.title}</h1>
              <p className="details-subtitle">{course.description}</p>

              <div className="details-meta-row">
                <span><FaStar color="#fbbf24" /> {course.rating} ({course.reviewsCount || 1240} reviews)</span>
                <span><FaUserGraduate /> {course.studentsCount || "8,500+"} enrolled</span>
                <span><FaClock /> {course.duration}</span>
              </div>

              <div className="instructor-badge">
                <div className="instructor-avatar">A</div>
                <div>
                  <div className="instructor-label">Instructor</div>
                  <div className="instructor-name">{course.instructor || "Alex Rivera, Lead Engineer"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-body-container">
        <div className="details-main-content">
          {/* Tabs */}
          <div className="details-tabs-bar glass-panel">
            <button className={`details-tab ${activeTab === "curriculum" ? "active" : ""}`} onClick={() => setActiveTab("curriculum")}>
              Curriculum Modules
            </button>
            <button className={`details-tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
              Overview & Outcomes
            </button>
          </div>

          {activeTab === "curriculum" ? (
            <div className="curriculum-section glass-panel">
              <h3>Course Syllabus & Lessons</h3>
              <p className="section-intro">5 comprehensive modules covering end-to-end full-stack development.</p>

              <div className="accordion-list">
                {modules.map((m, idx) => {
                  const mId = `m${idx + 1}`;
                  const isCompleted = localStorage.getItem(`completed_module_${id || "c1"}_${mId}`) === "true";

                  return (
                    <div
                      key={idx}
                      className={`accordion-item glass-card clickable-module ${isCompleted ? "module-completed" : ""}`}
                      onClick={() => navigate(`/course/${id || "c1"}/module/${mId}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="accordion-header">
                        <div className="module-title-box">
                          {isCompleted ? (
                            <FaCheckCircle color="#10b981" size={20} />
                          ) : (
                            <FaPlayCircle color="var(--accent-primary)" size={20} />
                          )}
                          <strong>{m.title}</strong>
                        </div>
                        <div className="module-meta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span>{m.lessons} lessons</span> • <span>{m.duration}</span>
                          {isCompleted ? (
                            <span className="badge badge-success" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                              Completed
                            </span>
                          ) : (
                            <span className="btn btn-primary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>
                              Start Theory & Quiz
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="overview-section glass-panel">
              <h3>What You Will Learn</h3>
              <div className="outcomes-grid">
                <div className="outcome-item"><FaCheckCircle color="#10b981" /> Build scalable single page applications with React 19.</div>
                <div className="outcome-item"><FaCheckCircle color="#10b981" /> Develop secure REST APIs with Node.js and Express.</div>
                <div className="outcome-item"><FaCheckCircle color="#10b981" /> Design normalized MongoDB databases with Mongoose.</div>
                <div className="outcome-item"><FaCheckCircle color="#10b981" /> Deploy full-stack apps to Render, Vercel & Netlify.</div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Purchase Card Sidebar */}
        <div className="details-sidebar">
          <div className="purchase-card glass-panel">
            <div className="preview-media-box">
              <img src={course.image || "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"} alt={course.title} />
              <div className="play-overlay">
                <FaPlayCircle size={48} />
              </div>
            </div>

            <div className="purchase-price-box">
              <div className="price-main">₹{Number(course.price || 3999).toLocaleString('en-IN')}</div>
              <div className="price-old">₹{(Number(course.price || 3999) * 2).toLocaleString('en-IN')}</div>
              <span className="badge badge-success">50% Discount</span>
            </div>

            <button className="btn btn-primary btn-purchase" onClick={() => setShowModal(true)}>
              Enroll Now & Get Access
            </button>

            <ul className="purchase-features-list">
              <li><FaCheckCircle color="#10b981" /> Full Lifetime Access</li>
              <li><FaCheckCircle color="#10b981" /> Verified Digital Certificate</li>
              <li><FaCheckCircle color="#10b981" /> Access on Mobile & Desktop</li>
              <li><FaCheckCircle color="#10b981" /> Direct Instructor Mentorship</li>
            </ul>

            <div className="guarantee-note">
              <FaShieldAlt color="#10b981" /> 30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>

      <EnrollmentModal
        show={showModal}
        course={course}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
