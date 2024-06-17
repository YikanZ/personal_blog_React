import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.pageYOffset;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
          const currentId = section.getAttribute('id');
          setActiveLink(`/${currentId}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className={activeLink === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className={activeLink === '/about' ? 'active' : ''}>About</Link>
        </li>
        <li className="navbar-item">
          <Link to="/projects" className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
