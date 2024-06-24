import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AddGoal from './pages/AddGoal';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals token={token} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {token && <Route path="/add-goal" element={<AddGoal token={token} />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
