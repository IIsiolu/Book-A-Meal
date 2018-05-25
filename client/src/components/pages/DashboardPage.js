import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard page</h1>
        <p>I'm sorry, the page you were looking for cannot be found!</p>
      </div>
    );
  }
}
const mapstatetoProps = state => ({
  isAuthenticated: state.user,
});
export default connect(mapstatetoProps)(DashboardPage);
