import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaUserCircle, FaBell } from "react-icons/fa";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import "./Navbar.css";

export default function Navbar({ user, onLogout, onLogin }) {
  const location = useLocation();
  const onAboutPage = location.pathname === "/about";
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New 3 courses are available." },
    { id: 2, message: "New course available: React Advanced." }
  ]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  const notifRef = useRef();
  const bellRef = useRef();
  const searchRef = useRef();
  const menuRef = useRef(); // 🔥 Ref for search container

  // 🔥 Search
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data.items || []))
      .catch(err => console.log(err));
  }, []);
useEffect(() => {
  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutsideMenu);
  return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
}, []);
  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, courses]);

  const handleSearchSelect = (course) => {
    setSearchTerm("");
    setSuggestions([]);

    navigate("/courses");

    setTimeout(() => {
      // Always dispatch event to trigger enroll modal in Courses.js
      const enrollEvent = new CustomEvent("enrollCourseFromSearch", { detail: course });
      window.dispatchEvent(enrollEvent);
    }, 300);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);


  // Toggle Notification Modal
  const handleNotificationsClick = () => {
    setShowNotifModal(!showNotifModal);
    setNewNotification(false); // reset shake when opened
  };

  // Close notification modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () => document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, []);

  // Example: Add new notification after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => [
        ...prev,
        { id: 3, message: "Register Now ! Hurry🎉" }
      ]);
      setNewNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">LearnX</Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`} ref={menuRef}>
  {onAboutPage ? (
    <>
      <Link to="/">Home</Link>
      <ScrollLink to="skills" smooth duration={500} offset={-70} spy activeClass="active-link">Skills</ScrollLink>
      <ScrollLink to="certifications" smooth duration={500} offset={-70} spy activeClass="active-link">Certifications</ScrollLink>
      <ScrollLink to="education" smooth duration={500} offset={-70} spy activeClass="active-link">Education</ScrollLink>
      <ScrollLink to="contactme" smooth duration={500} offset={-70} spy activeClass="active-link">Contact Me</ScrollLink>
    </>
  ) : (
    <>
      <Link to="/">Home</Link>
  <Link to="/courses">Courses</Link>
  {user && <Link to="/certificates">Certificates</Link>}
  <Link to="/contact">Contact us</Link>
  <Link to="/about">About Us</Link>
    </>
  )}


          {/* 🔥 Search */}
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSuggestions(courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
              ))}
            />
            {suggestions.length > 0 && (
              <ul className="search-suggestions slide-in">
                {suggestions.map(course => (
                  <li key={course._id} onClick={() => handleSearchSelect(course)}>
                    {course.image && <img src={course.image} alt={course.title} />}
                    <span>{course.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Notification Bell */}
          <div className="notification-btn" onClick={handleNotificationsClick} ref={bellRef}>
            <FaBell size={20} className={newNotification ? "shake" : ""} />
            {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
          </div>

          {/* Notification Modal */}
          {showNotifModal && (
            <div ref={notifRef} className="notification-modal slide-in">
              {notifications.length === 0 ? (
                <div className="no-notifications">No updates currently</div>
              ) : (
                <ul>
                  {notifications.map((notif) => (
                    <li key={notif.id}>{notif.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Profile Icon and username as plain text after login */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaUserCircle size={28} style={{ color: "#fff" }} />
              <span style={{ fontWeight: 600, color: "#fff", fontSize: 17 }}>
                Hi, {user.name}
              </span>
              <button
                onClick={onLogout}
                style={{
                  marginLeft: 18,
                  background: "#4fa3ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  padding: "6px 20px",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={e => e.target.style.background = '#3578e5'}
                onMouseOut={e => e.target.style.background = '#4fa3ff'}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="profile-btn" style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setShowProfileModal(true)}>
              <FaUserCircle size={28} style={{ color: "#fff" }} />
            </div>
          )}
        </div>

        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </header>

  <ProfileModal show={showProfileModal} onClose={() => setShowProfileModal(false)} onLogin={onLogin} />
    </>
  );
}