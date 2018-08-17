import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserRoute } from './components/routes';
import {
  NotFoundPage, SignupPage, LoginPage,
  DashboardPage, LandingPage, MealPage,
  TodayMenuPage, AdminSignUp, MenuPage,
  UserOrders,
} from './components/pages';
import Authenticate from './utils/Authenticate';
import Navigate from './utils/Navigate';
/**
 * Documentation
 * stateless component
 * @param{string} location - The path been called
 */

const App = ({ location }) => (
  <Switch>
    <Route
      location={location}
      path="/"
      exact
      component={Navigate(LandingPage)}
    />
    <Route path="/index" exact component={LandingPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignupPage} />
    <Route path="/dashboard" exact component={Authenticate(DashboardPage)} />
    <Route path="/meal" exact component={Authenticate(MealPage)} />
    <UserRoute path="/user" exact component={Authenticate(DashboardPage)} />
    <Route path="/home" exact component={Authenticate(TodayMenuPage)} />
    <Route path="/menu" exact component={Authenticate(MenuPage)} />
    <Route path="/adminSignup" exact component={Authenticate(AdminSignUp)} />
    <Route path="/orders" exact component={Authenticate(UserOrders)} />
    <Route exact path="*" component={NotFoundPage} />
  </Switch>
);
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
