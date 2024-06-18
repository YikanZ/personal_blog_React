import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ token, setToken }) => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/');
  };

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
          <Link to="/goals" className={activeLink === '/goals' ? 'active' : ''}>Goals</Link>
        </li>
        <li className="navbar-item">
          <Link to="/projects" className={activeLink === '/projects' ? 'active' : ''}>Projects</Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className={activeLink === '/contact' ? 'active' : ''}>Contact</Link>
        </li>
        {token ? (
          <li className="navbar-item login-tab">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        ) : (
          <li className="navbar-item login-tab">
            <Link to="/login">Login (Only For Yikan)</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
