import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const OrderNav = ({ logout }) => (
  <div className="top-nav stay-top">
    <h2 className="logo">Book-A-Meal</h2>
    <div className="right-nav">
      <Link className="nav-text" to="/">Home</Link>
      <Link className="nav-text" to="/home">Menu</Link>
      <h2 onClick={logout} className="nav-text-h"> Log out</h2>
    </div>
  </div>
);

export const LandingNav = ({ isAuthenticated, logout }) => (
  <div className="top-nav landing-nav">
    <h2 className="logo">Book-A-Meal</h2>

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

export const MenuNav = ({ logout }) => (
  <div className="top-nav">
    <Link className="logo" to="/">Book-A-Meal</Link>
    <div className="right-nav">
      <Link className="nav-text" to="/">Home</Link>
      <Link className="nav-text" to="/orders">Orders</Link>
      <h5 className="nav-text-h" onClick={logout}>Log out</h5>
    </div>
  </div>
);

