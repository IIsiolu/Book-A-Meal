import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SideNav, TopNav, Orders } from '../common/';
import { logout, orderHistory } from '../../actions/';

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
  componentDidMount() {
    this.props.orderHistory();
  }

  render() {
    return (
      <div className='admin-form-container'>
        <TopNav logout={this.props.logout} />
        <div className = "form-con-bg">
          <SideNav />
          <div className = "order-bar" >
            <Orders {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
DashboardPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  orderHistory: PropTypes.func.isRequired,
};
const mapstatetoProps = ({ user, orderHistories }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  orders: orderHistories.orderHistory,
});
export default connect(mapstatetoProps, { logout, orderHistory })(DashboardPage);
