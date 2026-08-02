import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";

// Route-based Code Splitting with React.lazy
const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const ModuleView = lazy(() => import("./pages/ModuleView"));
const Certificates = lazy(() => import("./pages/Certificates"));
const History = lazy(() => import("./pages/History"));
const Contact = lazy(() => import("./pages/Contact"));

const PageFallback = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "0.95rem",
    fontWeight: "500"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid #10b981",
        borderTopColor: "transparent",
        animation: "spin 0.8s linear infinite"
      }} />
      Loading page...
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleAuth = (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} onLogin={handleAuth} />
      <main style={{ paddingTop: "74px", minHeight: "80vh" }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/course/:courseId/module/:moduleId" element={<ModuleView />} />
            <Route path="/history" element={<History user={user} onLogin={handleAuth} />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthForm isLogin={true} onAuth={handleAuth} />} />
            <Route path="/register" element={<AuthForm isLogin={false} onAuth={handleAuth} />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
