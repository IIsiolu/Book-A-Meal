import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// url loader solved issue with semantic
import 'semantic-ui-css/semantic.min.css';
import  HomePage  from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import './static/css/style.css';
/**
 * Documentation
 * stateless component
 */

const App = () => (
     <div>
         <Route path='/' exact component={LoginPage} />
         <Route path='/login' exact component={LoginPage} />
     </div>
);

export default App;
