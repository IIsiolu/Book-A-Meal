import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Side navigation
 * @description react stateless component
 * @function SideNav
 * @returns {JSX} jsx
 */
const SideNav = ({ role }) => (
  <div className="sidebar-info" >
    <div className="sidebar-c form-nav">
      <Link className="main-m-nav" to="/">Dashboard</Link>
      <Link className="" to="/menu">Set Menu</Link>
      <Link className="" to="/meal">Meal Options</Link>
      {role === 'super-admin' &&
        <Link className="" to="/adminSignup">Create Admin</Link>}
    </div>
  </div>
);

export default SideNav;
