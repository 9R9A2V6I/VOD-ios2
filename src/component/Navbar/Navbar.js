import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { ThemeContext } from '../../store/ThemeContext';

const Navbar = () => {
  const { bgColor, fontColor, toggleTheme } = useContext(ThemeContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      // Update scrolled state for background opacity
      if (currentScrollY > 100) {
        setScrolled(true);
      } else if (currentScrollY === 0) {
        setScrolled(false);
      }

      lastScrollY = currentScrollY;

      // Detect scroll stop
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowNavbar(true); // Make the navbar visible when scrolling stops
      }, 350);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const getActiveLinkStyle = (isActive) => {
    if (isActive) {
      return {
        backgroundColor: bgColor === 'white' ? 'black' : 'white',
        color: fontColor === 'black' ? 'white' : 'black',
      };
    }
    return {};
  };

  const navbarStyles = {
    backgroundColor: bgColor, // Use default bgColor when at top
    color: fontColor,
    transition:
      'background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
  };

  return (
    <nav
      className={`navbarToggle ${showNavbar ? 'visible' : 'hidden'}`}
      style={navbarStyles}
    >
      <NavLink
        to="/"
        className="nav-link"
        style={({ isActive }) => getActiveLinkStyle(isActive)}
      >
        Home
      </NavLink>
      <NavLink
        to="/instructors"
        className="nav-link"
        style={({ isActive }) => getActiveLinkStyle(isActive)}
      >
        Instructor
      </NavLink>
      <div onClick={toggleTheme} className="nav-link theme-toggle">
        Mode
      </div>
      <NavLink
        to="/account"
        className="nav-link"
        style={({ isActive }) => getActiveLinkStyle(isActive)}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;
