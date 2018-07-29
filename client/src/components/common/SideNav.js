import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => (
  <div className ="sidebar-info" >
      {/* <h2 className='side-header'>MAIN NAVIGATION</h2>
      <h2 className='s-links'><Link to="/meal"> Meal Options </Link></h2>
      <h2 className='s-links'><Link to="/login"> Orders </Link></h2>
      <h2 className='s-links'><Link to="/login"> Account  </Link></h2>
      <h2 className='s-links'><Link to="/menu"> Set Menu </Link></h2>
      <h2 className='s-links'><Link to="/adminSignup"> Create Admin </Link></h2> */}
      <div className="sidebar-c form-nav">
        <Link className="main-m-nav" to="/">Dashboard</Link>
        <Link className="" to="/menu">Set Menu</Link>
        <Link className="" to="/meal">Meal Options</Link>
        <Link className="" to="/adminSignup">Create Admin</Link>
            
      </div>
    
  </div>
);
export default SideNav;
