import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import HomePage from './HomePage';
import DashboardPage from './DashboardPage';

const WhosePage = ({ isAuthenticated }) => {
  const check = isAuthenticated ? <DashboardPage /> : <HomePage />;
  return (
    check
  );
};


WhosePage.propTypes = {

};
const mapStateToProps = state => ({
  isAuthenticated: (state.user.user.role === 'admin'),
});

export default connect(mapStateToProps, { logout })(WhosePage);
