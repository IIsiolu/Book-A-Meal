import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
     {...rest}
      render={ props =>
         (isAuthenticated ? <Component {...props} /> : <Redirect to='/' />) }
          />
);
UserRoute.proptypes = {
  component: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: !!(state.user.user.role === 'admin'),
});
export default withRouter(connect(mapStateToProps)(UserRoute));
