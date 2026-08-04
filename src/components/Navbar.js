import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell, FaSearch, FaTimes, FaGraduationCap, FaSignOutAlt, FaBookOpen, FaAward, FaSignInAlt, FaHistory } from "react-icons/fa";
import api from "../api";
import ProfileModal from "./ProfileModal";
import "./Navbar.css";

export default function Navbar({ user, onLogout, onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Notifications
  const [notifications] = useState([
    { id: 1, title: "Special Offer", message: "50% off on Web Development courses!", time: "2m ago" },
    { id: 2, title: "New Release", message: "Python & Machine Learning Masterclass added.", time: "1h ago" }
  ]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [hasNewNotif, setHasNewNotif] = useState(true);

  const notifRef = useRef();
  const profileDropdownRef = useRef();
  const searchRef = useRef();
  const menuRef = useRef();

  // Search
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    api.get("/api/courses")
      .then(res => setCourses(res.data.items || res.data || []))
      .catch(err => console.log("Failed to load search courses:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifModal(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = courses.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchTerm, courses]);

  const handleSearchSelect = (course) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate("/courses");
    setTimeout(() => {
      const enrollEvent = new CustomEvent("enrollCourseFromSearch", { detail: course });
      window.dispatchEvent(enrollEvent);
    }, 300);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <FaGraduationCap size={22} />
            </div>
            <span className="logo-text">Learn<span className="logo-highlight">X</span></span>
          </Link>

          {/* Navigation Links */}
          <nav className={`nav-links ${menuOpen ? "open" : ""}`} ref={menuRef}>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""} onClick={() => setMenuOpen(false)}>Explore Courses</Link>
            {user && (
              <>
                <Link to="/history" className={location.pathname === "/history" ? "active" : ""} onClick={() => setMenuOpen(false)}>My History</Link>
                <Link to="/certificates" className={location.pathname === "/certificates" ? "active" : ""} onClick={() => setMenuOpen(false)}>Certificates</Link>
              </>
            )}
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          {/* Right Section: Search, Notifs & User Profile */}
          <div className="navbar-actions">
            {/* Search Input */}
            <div className="navbar-search" ref={searchRef}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim() && courses.length) {
                    setSuggestions(courses.filter(c => c.title?.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5));
                  }
                }}
              />
              {searchTerm && (
                <button className="search-clear-btn" onClick={() => setSearchTerm("")}>
                  <FaTimes size={12} />
                </button>
              )}

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="search-dropdown animate-fade-in">
                  <div className="search-dropdown-header">Matching Courses ({suggestions.length})</div>
                  {suggestions.map(course => (
                    <div key={course._id} className="search-item" onClick={() => handleSearchSelect(course)}>
                      <div className="search-item-icon">
                        <FaBookOpen />
                      </div>
                      <div className="search-item-info">
                        <div className="search-item-title">{course.title}</div>
                        <div className="search-item-desc">{course.description?.substring(0, 45)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell (Only shown when logged in) */}
            {user && (
              <div className="notif-wrapper" ref={notifRef}>
                <button
                  className="notif-btn"
                  onClick={() => {
                    setShowNotifModal(!showNotifModal);
                    setHasNewNotif(false);
                  }}
                  aria-label="Notifications"
                >
                  <FaBell size={18} />
                  {hasNewNotif && <span className="notif-dot" />}
                </button>

                {/* Notification Drawer */}
                {showNotifModal && (
                  <div className="notif-dropdown animate-fade-in">
                    <div className="notif-header">
                      <h4>Notifications</h4>
                      <span className="notif-badge">{notifications.length} New</span>
                    </div>
                    <div className="notif-list">
                      {notifications.map((n) => (
                        <div key={n.id} className="notif-card">
                          <div className="notif-title">{n.title}</div>
                          <div className="notif-body">{n.message}</div>
                          <div className="notif-time">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* User Profile / Auth Action */}
            {user ? (
              <div className="user-profile-wrapper" ref={profileDropdownRef}>
                <button
                  className="user-profile-trigger"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle size={22} />}
                  </div>
                  <span className="user-name">Hi, {user.name?.split(" ")[0]}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown animate-fade-in">
                    <div className="profile-dropdown-header">
                      <div className="profile-fullname">{user.name}</div>
                      <div className="profile-email">{user.email}</div>
                    </div>
                    <div className="profile-dropdown-divider" />
                    <Link to="/history" className="profile-dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                      <FaHistory size={14} /> My History
                    </Link>
                    <Link to="/courses" className="profile-dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                      <FaBookOpen size={14} /> My Courses
                    </Link>
                    <Link to="/certificates" className="profile-dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                      <FaAward size={14} /> Certificates
                    </Link>
                    <div className="profile-dropdown-divider" />
                    <button className="profile-dropdown-item logout-item" onClick={() => { setProfileDropdownOpen(false); onLogout(); }}>
                      <FaSignOutAlt size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-primary nav-login-btn" onClick={() => setShowProfileModal(true)}>
                <FaSignInAlt size={14} /> Sign In
              </button>
            )}

            {/* Hamburger Mobile Button */}
            <button className={`hamburger-btn ${menuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle Menu">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>

        {/* Mathematically Smooth Double Sine Wave (Crest Up, Trough Down) */}
        <div className="navbar-wave-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="#4d2d0b" 
              d="M 0,0 L 1440,0 L 1440,60 Q 1080,115 720,60 T 0,60 Z"
            />
          </svg>
        </div>
      </header>

      {/* Auth Modal Trigger */}
      <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} onLogin={onLogin} />
    </>
  );
}