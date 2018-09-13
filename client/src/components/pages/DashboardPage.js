import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { SideNav, TopNav, Orders } from '../common/';
import { logout, orderHistory, editOrder } from '../../actions/';
import socket from '../../utils/socket';

/**
 * @description Caterer dashboard page
 * @class DashboardPage
 * @returns {jsx} jsx
 * @extends Component
 */
export class DashboardPage extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.socketClient = socket(this);
  }

  /**
   * @summary react stateless component
   * called before a component mounts
   * @returns {void} void
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'caterer' || role === 'super-admin')) {
      this.props.history.push('/');
    }
  }

  /**
   * @method componentDidMount
   * @param {void} void
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.orderHistory();
  }

  /**
   * @function showToast
   * @returns {function} toast
   */
  showToast = () => toast.success('you have a new order');

  /**
   * handle pagination click events
   * @method handlePageChange
   * @param {selected} true or false
   * @returns {undefined}
   */
  handlePageChange = ({ selected }) => {
    const page = selected + 1;
    localStorage.setItem('currentOrderPage', page);
    const currentPage = localStorage.getItem('currentOrderPage');
    this.props.orderHistory(currentPage);
  }

  /**
   * renders pagination button
   * @method renderPagination
   * @returns {jsx} jsx
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
  )

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div className="admin-form-container">
        <TopNav logout={this.props.logout} />
        <div className="form-con-bg">
          <SideNav role={this.props.role} />
          <div className="order-bar" >
            <Orders {...this.props} />
            {this.props.orders.length > 0 && this.renderPagination()}
          </div>
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  orderHistory: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

const mapstatetoProps = ({ user, orderHistory }) => ({
  role: user.user.role,
  orders: orderHistory.orderHistory,
  page: orderHistory.pagination.page,
  pageCount: orderHistory.pagination.pageCount,
  pageSize: orderHistory.pagination.pageSize,
  totalCount: orderHistory.pagination.totalCount,
});

export default connect(
  mapstatetoProps,
  {
    logout, orderHistory, editOrder,
  },
)(DashboardPage);
