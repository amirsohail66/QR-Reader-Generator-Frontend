import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

const Navbar = () => {
  const handleLogout = async () => {
    try {
      console.log('Logging out...');
  
      // 1. Parse the user ID from the token stored in local storage
      const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
  
      // 2. Remove the user ID from local storage
      localStorage.removeItem('token'); // Remove the token
      localStorage.removeItem('userId'); // Remove the user ID (if stored separately)

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  


  return (
    <nav className="navbar">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link to="/my-images" className="nav-link">
            My Images
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/gallery" className="nav-link">
            All Images
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/upload" className="nav-link">
            Upload Images
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* Call the handleLogout function when the "Logout" link is clicked */}
          <Link to='/' className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
