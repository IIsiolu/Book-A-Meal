import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { userOrders, logout, editOrder } from '../../actions';
import { Orders, OrderNav } from '../common';

/**
 * @class UserOrders
 */
class UserOrders extends Component {

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
  handlePageChange = ({selected}) => {
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
      breakClassName={'break-me'}
      pageCount={this.props.pageCount}
      initialPage={this.props.page - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={this.handlePageChange}
      disableInitialCallback
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
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
        <ToastContainer autoClose={2000}/>
        {this.props.orders.length && this.renderPagination()}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orderHistories }) => ({
  role: user.user.role,
  orders: orderHistories.orders,
  page: orderHistories.pagination.page,
  pageCount: orderHistories.pagination.pageCount,
  pageSize: orderHistories.pagination.pageSize,
  totalCount: orderHistories.pagination.totalCount,
});

export default connect(mapStateToProps, { userOrders, logout, editOrder })(UserOrders);
