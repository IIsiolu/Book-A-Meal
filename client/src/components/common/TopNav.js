import React, { Component } from 'react';

const TopNav = ({ logout }) => (
  <div className="top-nav">
    <h2 className="logo">Book-A-Meal</h2>
    <div className="right-nav">
      <h2 className="nav-text"> <a href="selectmeal.html">Meals</a></h2>
      <h2 className="nav-text"> <a href="#aboutBook">About-Us</a></h2>
      <h2 className="nav-text"> <a onClick={logout}>Log-out</a></h2>
    </div>
  </div>
);
export default TopNav;
