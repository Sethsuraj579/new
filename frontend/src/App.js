import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ThreeBackground from './components/ThreeBackground';
import HomePage from './components/HomePage';
//import AdminEnquiries from './components/AdminEnquiries';
import Login from './components/Login';
import Logout from './components/Logout';
import './styles.css';
import CustomAdmin from './components/CustomAdmin';
import Courses from './components/Courses';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <>
      <ThreeBackground />
      <div className="app">
        <header className="header">
          <div className="logo">
            <img src="/logo.png" alt="Innovate Sphere Academy" />
            <h1>Innovate Sphere Academy</h1>
          </div>
          <div className="contact-info">
            <a href="https://wa.me/6586466617" target="_blank" rel="noopener noreferrer">
              WhatsApp: +65 86466617
            </a>
            <span> | </span>
            <a href="mailto:innovatesphereacademy@gmail.com">
              innovatesphereacademy@gmail.com
            </a>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">Admin</Link>
                <Link to="/logout">Logout</Link>
              </>
            ) : (
              <Link to="/dashboard">Admin Login</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <CustomAdmin />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer>
          <p>© 2026 Innovate Sphere Academy. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;