import React from 'react'
import '../assets/stylesheets/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="Navbar c-white bg-secondary">
      <Link to="/">
        <h1 className="c-white">React Weather</h1>
      </Link>
    </nav>
  );
};

export default Navbar;