import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">Student Portal</div>
    <div className="navbar-links">
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
    </div>
  </nav>
);

export default Navbar;