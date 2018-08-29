import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @function TopNav
 * @param {logout} logout- logout action
 * @returns {JSX} jsx
 */
const TopNav = ({ logout }) => (
  <div className="top-nav stay-top">
    <h2 className="logo capitalize">book-a-meal</h2>
    <div className="right-nav">
      <Link className="nav-text" to="/">Dashboard</Link>
      <h2 onClick={logout} className="nav-text-h"> Log-out</h2>
    </div>
  </div>
);

TopNav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default TopNav;
