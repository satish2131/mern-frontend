
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";

import Home from "./pages/Home";
import About from "./pages/about/About";
import Courses from "./pages/Courses";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";


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
      <main style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthForm isLogin={true} onAuth={handleAuth} />} />
          <Route path="/register" element={<AuthForm isLogin={false} onAuth={handleAuth} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
