import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// url loader solved issue with semantic
import { UserRoute, AdminRoute } from './components/routes';
import { NotFoundPage, SignupPage, LoginPage, HomePage, DashboardPage, LandingPage, MealPage, MenuPage } from './components/pages';
import Authenticate from './utils/Authenticate';
import Navigate from './utils/Navigate';
/**
 * Documentation
 * stateless component
 */

const App = ({ location }) => (
     <div>
         <Route location={location} path='/' exact component={Navigate(LandingPage)} />
         <Route path='/login' exact component={LoginPage} />
         <Route path='/signup' exact component={SignupPage} />
         <Route path='/dashboard' exact component={Authenticate(DashboardPage)} />
         <Route path='/meal' exact component={Authenticate(MealPage)} />
         <UserRoute path='/user' exact component={DashboardPage} />
         <Route path='/home' exact component={Authenticate(HomePage)} />
         <Route path='/menu' exact component={Authenticate(MenuPage)} />
     </div>
);
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
