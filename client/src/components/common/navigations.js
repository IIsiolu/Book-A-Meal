import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *  User order top navigation
 * @function OrderNav
 * @param {logout} logout - logout function
 * @returns {jsx} jsx
 */
export const OrderNav = ({ logout }) => (
  <div className="top-nav stay-top">
    <h2 className="logo capitalize">book-a-meal</h2>
    <div className="right-nav">
      <Link className="nav-text" to="/">Home</Link>
      <Link className="nav-text" to="/home">Menu</Link>
      <h2 onClick={logout} className="nav-text-h"> Log out</h2>
    </div>
  </div>
);

/**
 *  Landing page top navigation
 * @function LandingNav
 * @param {logout} logout - logout function
 * @param {isAuthenticated} isAuthenticated - checks token validation
 * @returns {jsx} jsx
 */
export const LandingNav = ({ isAuthenticated, logout }) => (
  <div className="top-nav landing-nav">
    <h2 className="logo capitalize">book-a-meal</h2>

    {
      isAuthenticated ? (
        <div className="right-nav">
          <Link className="nav-text" to="/home">Menu</Link>
          <h5 className="nav-text-h" onClick={logout}>Log-out</h5>
        </div>
      ) :
      (
        <div className="right-nav">
          <Link className="nav-text" to="/login">Login</Link>
          <Link className="nav-text" to="/signup">signup</Link>
        </div>
      )
    }
  </div>
);

/**
 *  Menu top navigation
 * @function MenuNav
 * @param {logout} logout - logout function
 * @returns {jsx} jsx
 */
export const MenuNav = ({ logout }) => (
  <div className="top-nav">
    <Link className="logo capitalize" to="/">Book-a-meal</Link>
    <div className="right-nav">
      <Link className="nav-text" to="/">Home</Link>
      <Link className="nav-text" to="/orders">Orders</Link>
      <h5 className="nav-text-h" onClick={logout}>Log out</h5>
    </div>
  </div>
);

LandingNav.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

OrderNav.propTypes = {
  logout: PropTypes.func.isRequired,
};

MenuNav.propTypes = {
  logout: PropTypes.func.isRequired,
};
