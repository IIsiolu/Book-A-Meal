import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userOrders, logout } from '../../actions';
import { Orders, OrderNav } from '../common';

class UserOrders extends Component {
  componentDidMount() {
    this.props.userOrders();
  }
  render() {
    return (
      <div className="user-order">
        <OrderNav logout={this.props.logout} />
        <Orders {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ user, userOrders }) => ({
  role: user.isAuthenticated,
  orders: userOrders.orders,
});

export default connect(mapStateToProps, { userOrders, logout })(UserOrders);
