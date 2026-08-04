import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaRocket, FaStar, FaUserCheck, FaLaptopCode, FaCertificate, FaArrowRight, FaCode, FaDatabase, FaBrain, FaCloud, FaClock } from "react-icons/fa";
import EnrollmentModal from "../components/EnrollmentModal";
import api from "../api";
import "./Home.css";

const defaultFallbackCourses = [
  {
    _id: "c1",
    title: "Full-Stack React & Node Masterclass",
    description: "Master modern web development with React 19, Express, MongoDB, and TailwindCSS.",
    price: 49.99,
    rating: 4.9,
    reviewsCount: 1420,
    duration: "12 Weeks",
    category: "Web Dev",
    image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
  },
  {
    _id: "c2",
    title: "Python Data Science & AI Bootcamp",
    description: "Build machine learning models, neural networks, and automated data pipelines.",
    price: 59.99,
    rating: 4.85,
    reviewsCount: 980,
    duration: "10 Weeks",
    category: "AI & ML",
    image: "https://img.freepik.com/free-vector/python-programming-concept-illustration_114360-1564.jpg"
  },
  {
    _id: "c3",
    title: "AWS Cloud & DevOps Engineering",
    description: "Deploy scalable cloud architectures using Docker, Kubernetes, CI/CD, and AWS.",
    price: 69.99,
    rating: 4.92,
    reviewsCount: 850,
    duration: "8 Weeks",
    category: "Cloud",
    image: "https://i.postimg.cc/9MYY7cFG/photo-1557562645-4eee56b29bc1.avif"
  },
  {
    _id: "c4",
    title: "PostgreSQL & Database Architecture",
    description: "Design high-performance relational databases with query optimization & indexing.",
    price: 39.99,
    rating: 4.78,
    reviewsCount: 620,
    duration: "6 Weeks",
    category: "Database",
    image: "https://i.postimg.cc/TYmxzPQd/download.jpg"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    api.get("/api/courses")
      .then(res => {
        const items = res.data.items || res.data || [];
        if (items.length > 0) {
          setFeaturedCourses(items.slice(0, 4));
        } else {
          setFeaturedCourses(defaultFallbackCourses);
        }
      })
      .catch(() => setFeaturedCourses(defaultFallbackCourses));
  }, []);

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text-content">
            <div className="hero-badge">
              <FaRocket color="#818cf8" /> NEXT-GEN E-LEARNING PLATFORM
            </div>

            <h1 className="hero-title">
              Level Up Your Tech Career With <span className="gradient-text">World-Class Masterclasses</span>
            </h1>

            <p className="hero-subtitle">
              Gain job-ready skills through hands-on projects, expert mentorship, and industry-recognized certifications. Join 15,000+ engineers building the future.
            </p>

            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary hero-btn">
                Explore All Courses <FaArrowRight size={14} />
              </Link>
              <button className="btn btn-outline hero-btn" onClick={() => navigate("/about")}>
                Platform Features
              </button>
            </div>

            {/* Metrics Counters */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-number">15K+</span>
                <span className="metric-label">Enrolled Learners</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-number">98%</span>
                <span className="metric-label">Completion Rate</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <span className="metric-number">4.9 ★</span>
                <span className="metric-label">Student Rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-card glass-panel">
            <div className="visual-card-header">
              <div className="card-dots"><span /><span /><span /></div>
              <div className="card-badge">LIVE DEMO LAB</div>
            </div>
            <div className="code-snippet-box">
              <pre>
                <code>{`// Enroll in LearnX Masterclass
const student = new Engineer("Alex");
await student.enroll({
  course: "Full-Stack Web Dev",
  certificate: true,
  jobAssistance: true
});
console.log("Status: Career Ready 🚀");`}</code>
              </pre>
            </div>
            <div className="visual-card-footer">
              <div className="user-avatar-group">
                <div className="avatar">A</div>
                <div className="avatar">B</div>
                <div className="avatar">C</div>
                <span>+2.4k joined this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="categories-section">
        <div className="section-container">
          <div className="category-pill-group">
            <div className="category-pill active" onClick={() => navigate("/courses")}>
              <FaCode /> Full-Stack Web
            </div>
            <div className="category-pill" onClick={() => navigate("/courses")}>
              <FaBrain /> AI & Data Science
            </div>
            <div className="category-pill" onClick={() => navigate("/courses")}>
              <FaCloud /> Cloud & DevOps
            </div>
            <div className="category-pill" onClick={() => navigate("/courses")}>
              <FaDatabase /> Databases
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="courses-showcase">
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-subtitle">POPULAR CURRICULUM</span>
              <h2 className="section-title">Trending Masterclasses</h2>
            </div>
            <Link to="/courses" className="view-all-link">
              View Entire Catalog ({featuredCourses.length > 0 ? featuredCourses.length : 12}) <FaArrowRight size={12} />
            </Link>
          </div>

          <div className="course-grid">
            {featuredCourses.map((course, idx) => (
              <div key={course._id || idx} className="course-card glass-card">
                <div className="card-image-wrapper">
                  <img
                    src={course.image || course.imageUrl || "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="180"
                  />
                  <span className="card-price-tag">₹{course.price ? course.price.toLocaleString('en-IN') : "3,999"}</span>
                  <span className="card-badge-pill">-50% OFF</span>
                </div>

                <div className="card-content">
                  <div className="card-meta">
                    <span className="meta-category"><FaCode size={12} /> {course.category || "Development"}</span>
                    <span className="meta-rating"><FaStar color="#fbbf24" size={12} /> {course.rating || 4.9}</span>
                  </div>

                  <h3 className="card-title">{course.title}</h3>
                  <p className="card-desc">{course.description}</p>

                  <div className="card-footer">
                    <span className="card-duration"><FaClock size={12} /> {course.duration || "Self-Paced"}</span>
                    <button className="btn btn-primary card-enroll-btn" onClick={() => handleEnroll(course)}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="features-section">
        <div className="section-container">
          <div className="text-center section-header-center">
            <span className="section-subtitle">WHY CHOOSE LEARNX</span>
            <h2 className="section-title">Engineered For Fast Career Growth</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon icon-emerald">
                <FaUserCheck size={24} />
              </div>
              <h3>Industry Practitioner Instructors</h3>
              <p>Learn directly from senior software engineers and architects working at top tech companies.</p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon icon-cyan">
                <FaLaptopCode size={24} />
              </div>
              <h3>Hands-on Real World Projects</h3>
              <p>Build portfolio-ready applications with production-grade code, databases, and continuous deployment.</p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon icon-purple">
                <FaCertificate size={24} />
              </div>
              <h3>Verified Digital Credentials</h3>
              <p>Receive shareable certificates with unique credential IDs to display on LinkedIn and resumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Review Slider / Cards */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="text-center section-header-center">
            <span className="section-subtitle">SUCCESS STORIES</span>
            <h2 className="section-title">Loved By Engineers Worldwide</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card glass-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} color="#fbbf24" size={14} />)}
              </div>
              <p className="testimonial-quote">
                "LearnX courses completely transformed my coding confidence. The React and Node masterclasses helped me land a Senior Frontend position!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div>
                  <div className="author-name">Sarah Jenkins</div>
                  <div className="author-role">Frontend Engineer @ TechCorp</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} color="#fbbf24" size={14} />)}
              </div>
              <p className="testimonial-quote">
                "The Python Data Science bootcamp is top-notch. Clear explanations, practical Jupyter notebook projects, and instant certificate verification."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar avatar-purple">M</div>
                <div>
                  <div className="author-name">Michael Chang</div>
                  <div className="author-role">Data Analyst @ AnalyticsLab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Promo Banner */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-banner glass-panel">
            <div className="cta-content">
              <h2>Ready to Upgrade Your Developer Skills?</h2>
              <p>Get instant lifetime access to all masterclasses with 50% discount today.</p>
            </div>
            <Link to="/courses" className="btn btn-primary cta-btn">
              Get Started Today <FaGraduationCap size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Enrollment Checkout Modal */}
      <EnrollmentModal
        show={showModal}
        course={selectedCourse || {}}
        onClose={() => setShowModal(false)}
        fromHome={true}
      />
    </div>
  );
}
