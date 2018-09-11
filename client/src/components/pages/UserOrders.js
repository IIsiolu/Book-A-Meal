import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { userOrders, logout, editOrder } from '../../actions';
import { Orders, OrderNav } from '../common';

/**
 * @class UserOrders
 */
export class UserOrders extends Component {
  /**
   * React component life cycle called before a
   * component mounts
   * @returns {undefined} undefined
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'user')) {
      this.props.history.push('/');
    }
  }

  /**
   * React life cycle to fetch user Orders
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.userOrders();
  }

  /**
   * handle pagination click event
   * @function handlePageChange
   * @returns {undefined}
   */
  handlePageChange = ({ selected }) => {
    const page = selected + 1;
    localStorage.setItem('currentUserOPage', page);
    const currentPage = localStorage.getItem('currentUserOPage');
    this.props.userOrders(currentPage);
  }

  /**
   * displays pagination buttons
   * @function renderPagination
   * @returns {JSX} jsx
   */
  renderPagination = () => (
    <ReactPaginate
      previousLabel={<i className="fa fa-chevron-left" />}
      nextLabel={<i className="fa fa-chevron-right" />}
      breakLabel={<a href="">...</a>}
      breakClassName="break-me"
      pageCount={this.props.pageCount}
      initialPage={this.props.page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageChange}
      disableInitialCallback
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  );

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div className="user-order">
        <div className="top-content2">
          <div className="topblur">
            <h1 className="top-content-h">Customer Orders</h1>
            <p className="top-content-line">_____________________________</p>
          </div>
        </div>
        <nav>
          <OrderNav logout={this.props.logout} />
        </nav>
        <div className="user-orders-c">
          <Orders {...this.props} />
        </div>
        <ToastContainer autoClose={2000} />
        {this.props.orders.length && this.renderPagination()}
      </div>
    );
  }
}

UserOrders.propTypes = {
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  orders: PropTypes.array.isRequired,
  userOrders: PropTypes.func.isRequired,
  editOrder: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, orderHistory }) => ({
  role: user.user.role,
  orders: orderHistory.orders,
  page: orderHistory.pagination.page,
  pageCount: orderHistory.pagination.pageCount,
  pageSize: orderHistory.pagination.pageSize,
  totalCount: orderHistory.pagination.totalCount,
});

export default connect(mapStateToProps, {
  userOrders,
  logout,
  editOrder,
})(UserOrders);
