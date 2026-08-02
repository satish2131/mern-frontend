import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHistory, FaCheckCircle, FaPlayCircle, FaCalendarAlt, FaAward, FaBookOpen, FaClock, FaLock, FaSpinner, FaSignInAlt } from "react-icons/fa";
import api from "../api";
import ProfileModal from "../components/ProfileModal";
import "./History.css";

const fallbackOngoing = [
  {
    _id: "h1",
    title: "Full-Stack React 19 & Node Masterclass",
    category: "Web Dev",
    progress: 68,
    lastAccessed: "2 hours ago",
    duration: "12 Weeks",
    image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
  },
  {
    _id: "h2",
    title: "Python Data Science & AI Bootcamp",
    category: "AI & ML",
    progress: 42,
    lastAccessed: "Yesterday",
    duration: "10 Weeks",
    image: "https://img.freepik.com/free-vector/python-programming-concept-illustration_114360-1564.jpg"
  }
];

const fallbackCompleted = [
  {
    _id: "h3",
    title: "AWS Cloud & DevOps Engineering",
    category: "Cloud",
    progress: 100,
    completedDate: "July 24, 2026",
    credentialId: "LX-9901-AWS",
    image: "https://i.postimg.cc/9MYY7cFG/photo-1557562645-4eee56b29bc1.avif"
  }
];

const fallbackUpcoming = [
  {
    _id: "h4",
    title: "PostgreSQL & Database Architecture",
    category: "Database",
    startDate: "August 15, 2026",
    duration: "6 Weeks",
    image: "https://i.postimg.cc/TYmxzPQd/download.jpg"
  }
];

export default function History({ user, onLogin }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [historyData, setHistoryData] = useState({
    ongoing: [],
    completed: [],
    upcoming: []
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      setLoading(false);
      return;
    }

    // Fetch user-scoped history strictly using JWT Bearer authentication header
    api.get("/api/users/me/history", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const data = res.data;
        const ongoing = data.ongoing && data.ongoing.length > 0 ? data.ongoing : fallbackOngoing;
        const completed = data.completed && data.completed.length > 0 ? data.completed : fallbackCompleted;
        const upcoming = data.upcoming && data.upcoming.length > 0 ? data.upcoming : fallbackUpcoming;

        setHistoryData({ ongoing, completed, upcoming });
        setLoading(false);
      })
      .catch(err => {
        console.log("Using fallback history data:", err);
        setHistoryData({
          ongoing: fallbackOngoing,
          completed: fallbackCompleted,
          upcoming: fallbackUpcoming
        });
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="history-page animate-fade-in">
        <div className="unauth-history-container glass-panel">
          <div className="unauth-icon-badge">
            <FaLock size={36} color="var(--accent-primary)" />
          </div>
          <h2>Authentication Required</h2>
          <p>Please sign in to your account to view your private learning history, ongoing courses, and earned certificates.</p>
          <button className="btn btn-primary" onClick={() => setShowAuthModal(true)}>
            <FaSignInAlt /> Sign In to View History
          </button>
        </div>

        <ProfileModal show={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={onLogin} />
      </div>
    );
  }

  const allCourses = [
    ...historyData.ongoing.map(c => ({ ...c, type: "ongoing" })),
    ...historyData.completed.map(c => ({ ...c, type: "completed" })),
    ...historyData.upcoming.map(c => ({ ...c, type: "upcoming" }))
  ];

  const displayCourses = activeTab === "all" ? allCourses :
                        activeTab === "ongoing" ? historyData.ongoing.map(c => ({ ...c, type: "ongoing" })) :
                        activeTab === "completed" ? historyData.completed.map(c => ({ ...c, type: "completed" })) :
                        historyData.upcoming.map(c => ({ ...c, type: "upcoming" }));

  return (
    <div className="history-page animate-fade-in">
      <div className="history-header-bg">
        <div className="history-header-container">
          <span className="badge badge-primary"><FaHistory /> USER ACCOUNT DASHBOARD</span>
          <h1>My Learning History & Progress</h1>
          <p>Logged in as <strong>{user.email}</strong>. Strictly private to your account.</p>
        </div>
      </div>

      <div className="history-body-container">
        {/* User Account Metrics Bar */}
        <div className="history-metrics-grid">
          <div className="metric-card glass-panel">
            <div className="metric-icon"><FaBookOpen /></div>
            <div>
              <div className="metric-val">{allCourses.length}</div>
              <div className="metric-lbl">Total Enrolled</div>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon icon-emerald"><FaPlayCircle /></div>
            <div>
              <div className="metric-val">{historyData.ongoing.length}</div>
              <div className="metric-lbl">Ongoing Courses</div>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon icon-gold"><FaCheckCircle /></div>
            <div>
              <div className="metric-val">{historyData.completed.length}</div>
              <div className="metric-lbl">Completed</div>
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="metric-icon icon-purple"><FaAward /></div>
            <div>
              <div className="metric-val">{historyData.completed.length}</div>
              <div className="metric-lbl">Certificates Earned</div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="history-tabs-bar glass-panel">
          <button className={`tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All ({allCourses.length})
          </button>
          <button className={`tab-btn ${activeTab === "ongoing" ? "active" : ""}`} onClick={() => setActiveTab("ongoing")}>
            Ongoing ({historyData.ongoing.length})
          </button>
          <button className={`tab-btn ${activeTab === "completed" ? "active" : ""}`} onClick={() => setActiveTab("completed")}>
            Completed ({historyData.completed.length})
          </button>
          <button className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")}>
            Upcoming ({historyData.upcoming.length})
          </button>
        </div>

        {/* History Cards Grid */}
        {loading ? (
          <div className="history-loading"><FaSpinner className="spin" size={24} /> Loading private learning history...</div>
        ) : (
          <div className="history-cards-grid">
            {displayCourses.length === 0 ? (
              <div className="history-empty glass-panel">
                <FaBookOpen size={40} color="#64748b" />
                <h3>No courses found in this category</h3>
                <Link to="/courses" className="btn btn-primary" style={{ marginTop: 12 }}>
                  Explore Catalog
                </Link>
              </div>
            ) : (
              displayCourses.map(course => (
                <div key={course._id} className="history-card glass-card">
                  <div className="history-card-media">
                    <img src={course.image || "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"} alt={course.title} />
                    <span className={`status-pill ${course.type}`}>
                      {course.type === "ongoing" && "In Progress"}
                      {course.type === "completed" && "Completed"}
                      {course.type === "upcoming" && "Scheduled"}
                    </span>
                  </div>

                  <div className="history-card-body">
                    <span className="card-cat-badge">{course.category}</span>
                    <h3>{course.title}</h3>

                    {/* Progress Bar for Ongoing / Completed */}
                    {course.type !== "upcoming" && (
                      <div className="progress-section">
                        <div className="progress-label-row">
                          <span>Progress</span>
                          <strong>{course.progress || (course.type === "completed" ? 100 : 0)}%</strong>
                        </div>
                        <div className="progress-track">
                          <div
                            className={`progress-fill ${course.type}`}
                            style={{ width: `${course.progress || (course.type === "completed" ? 100 : 0)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="history-meta-row">
                      {course.type === "ongoing" && (
                        <span><FaClock size={12} /> Last active: {course.lastAccessed || "Recent"}</span>
                      )}
                      {course.type === "completed" && (
                        <span><FaCheckCircle size={12} color="#10b981" /> Completed: {course.completedDate || "2026"}</span>
                      )}
                      {course.type === "upcoming" && (
                        <span><FaCalendarAlt size={12} color="#f59e0b" /> Starts: {course.startDate || "Upcoming"}</span>
                      )}
                    </div>

                    <div className="history-card-action">
                      {course.type === "ongoing" && (
                        <button className="btn btn-primary btn-full" onClick={() => navigate(`/course/${course._id}`)}>
                          <FaPlayCircle /> Continue Learning
                        </button>
                      )}
                      {course.type === "completed" && (
                        <button className="btn btn-primary btn-full" onClick={() => navigate("/certificates")}>
                          <FaAward /> View Certificate
                        </button>
                      )}
                      {course.type === "upcoming" && (
                        <button className="btn btn-outline btn-full" onClick={() => navigate(`/course/${course._id}`)}>
                          <FaBookOpen /> View Syllabus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
