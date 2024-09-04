// Navbar1.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './rm.png';

const Nabar1 = ({ isLoggedIn, handleLogout, setShowLoginModal }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light neumorphic-navbar">
      <div className="container-fluid">
        {/* Add the logo image here */}
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" style={{ width: 'auto', height: '30px' }} />
          Car Rental
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {isLoggedIn ? (
                <button className="btn neumorphic-btn mx-2 my-2" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button
                  className="btn neumorphic-btn mx-2 my-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  Admin Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nabar1;
