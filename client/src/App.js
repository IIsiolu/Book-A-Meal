import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// url loader solved issue with semantic
import 'semantic-ui-css/semantic.min.css';
import jwt from 'jwt-decode';
import './static/css/style.css';
import { UserRoute, AdminRoute } from './components/routes';
import { NotFoundPage, SignupPage, LoginPage, HomePage, DashboardPage, LandingPage } from './components/pages';

/**
 * Documentation
 * stateless component
 */

const App = ({ location }) => (
     <div>
         <Route location={location} path='/' exact component={LandingPage} />
         <Route path='/login' exact component={LoginPage} />
         <Route path='/signup' exact component={SignupPage} />
         <AdminRoute path='/dashboard' exact component={DashboardPage} />
         <UserRoute path='/user' exact component={DashboardPage} />
     </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default App;
