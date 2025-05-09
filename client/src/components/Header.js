import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Expense Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"><FaHome className="me-1" /> Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add"><FaPlus className="me-1" /> Add Expense</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header; 