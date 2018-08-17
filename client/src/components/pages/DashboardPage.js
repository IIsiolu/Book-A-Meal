import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { SideNav, TopNav, Orders } from '../common/';
import { logout, orderHistory } from '../../actions/';

/**
 * Caterer dashboard page
 * @class DashboardPage
 * @returns {jsx}
 * @extends Component
 */
class DashboardPage extends Component {
  /**
   * @method componentDidMount
   * @param {void} 
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.orderHistory();
  }
  /**
   * handle pagination click events
   * @method handlePageChange
   * @param {selected} true or false
   * @returns {undefined}
   */
  handlePageChange = ({selected}) => {
    const page = selected + 1;
    localStorage.setItem('currentOrderPage', page);
    const currentPage = localStorage.getItem('currentOrderPage');
    this.props.orderHistory(currentPage);
  }
  /**
   * renders pagination button
   * @method renderPagination
   * @returns {jsx}
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
  )

  render() {
    return (
      <div className='admin-form-container'>
        <TopNav logout={this.props.logout} />
        <div className = "form-con-bg">
          <SideNav role={this.props.role} />
          <div className = "order-bar" >
            <Orders {...this.props} />
            {this.props.orders.length && this.renderPagination()}
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
  role: user.user.role,
  orders: orderHistories.orderHistory,
  page: orderHistories.pagination.page,
  pageCount: orderHistories.pagination.pageCount,
  pageSize: orderHistories.pagination.pageSize,
  totalCount: orderHistories.pagination.totalCount,
});
export default connect(mapstatetoProps,
   { logout, orderHistory })(DashboardPage);
