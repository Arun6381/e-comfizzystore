/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
// Navbar.js
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css"; // Import the CSS file

const Navbar = ({ user, handleLogout }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>Fizzy Store</h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <span className="hamburger-icon">☰</span>
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <span>Welcome, {user.username}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
