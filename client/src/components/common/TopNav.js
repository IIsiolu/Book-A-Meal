import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const TopNav = ({ logout }) => (
  <div className="top-nav stay-top">
    <h2 className="logo">Book-A-Meal</h2>
    <div className="right-nav">
      <Link className="nav-text" to="/">Dashboard</Link>
      <h2 onClick={logout} className="nav-text-h"> Log-out</h2>
    </div>
  </div>
);
export default TopNav;
