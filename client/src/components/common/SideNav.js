import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => (
  <div className ="sidebar-c sidebar-info" >
    <div className ="dp">

    </div>
    <div className = "sidebar-links" >
      <h2><Link to="/meal"> Meal Options </Link></h2>
      <h2><Link to="/login"> Orders </Link></h2>
      <h2><Link to="/login"> Account  </Link></h2>
      <h2><Link to="/login"> Meal For Today </Link></h2>
    </div>
  </div>
);
export default SideNav;
