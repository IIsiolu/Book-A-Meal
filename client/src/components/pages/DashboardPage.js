import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNav, TopNav } from '../common/';
import { logout } from '../../actions/';

class DashboardPage extends Component {
  componentWillMount() {
    // const newLocal = this.props.role === 'admin';
    const { role } = this.props;
    if (role !== 'admin') {
      console.log('Going back because phemmy is a stubborn boy');
      this.props.history.push('/login');
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <div className = "main-container">
          <div className = "sidebar">
            <SideNav />
          </div>
          <div className = "main-bar" >
            <h1>Dashboard page</h1>
          </div>
        </div>
        <p>Welcome to admin page </p>
      </div>
    );
  }
}
DashboardPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};
const mapstatetoProps = ({ user }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
});
export default connect(mapstatetoProps, { logout })(DashboardPage);
