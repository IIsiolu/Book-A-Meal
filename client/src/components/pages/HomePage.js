import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout, history }) => (
    <div>
        <h1> Home Page </h1>
        {isAuthenticated ? <button onClick={() => logout(history)} > Logout</button> : loginSign() }
    </div>
);

const loginSign = () => (
  <div>
    <h1> Login or SignUp </h1>
    <Link to="/login">Login</Link>
    <Link to="/signup">SignUp</Link>
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: state.user.user ? !!state.user.user.token : false,
});

export default connect(mapStateToProps, { logout })(HomePage);
