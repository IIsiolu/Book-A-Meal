import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { TopNav, MealOptions } from '../common/';
import { AddMeal } from '../forms';
import {
  logout, imageUpload, createMeal, fetchMeals, clearMealImage,
  updateMeal, deleteMeal,
  mealSuccessState, DeleteErrorState,
} from '../../actions';

/**
* Meal Page
* @class MealPage
* @constructor
*/
export class MealPage extends Component {
  /**
   * @constructor
   * @returns {void} void
   */
  constructor() {
    super();
    this.state = {
      isNavOpened: false,
    };
  }

  /**
   * @summary react lifecycle method invoked before render
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'caterer' || role === 'super-admin')) {
      this.props.history.push('/');
    }
  }

  /**
   * @summary a react lifecycle method invoked after render
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.fetchMeals(this.props.role);
  }

  // function to upload Image
  // imageUpload = image => (
  //   this.props.imageUpload(image)
  // )

  // opens side navigation to add meal
  openNavSlider = () => (
    this.setState({
      ...this.state, isNavOpened: !this.state.isNavOpened,
    })
  )

  // meal container
  mealContainer = () => (
    this.props.allMeals.length > 0 ?
      this.props.allMeals.map((meal, key) => (
        <MealOptions {...this.props} key={key} meal={meal} />))
      : this.renderNoMeal()
  )

  /**
   * @summary method to handle pagination click event
   * @function handlePageChange
   * @param {object} selected
   * @returns {void}
   */
  handlePageChange = ({ selected }) => {
    const page = selected + 1;
    localStorage.setItem('currentMealPage', page);
    const currentPage = localStorage.getItem('currentMealPage');
    this.props.fetchMeals(this.props.role, currentPage);
  }

  /**
   * @summary Called if there is no meal in the page
   * @function renderNoMeal
   * @returns {jsx} jsx
   */
  renderNoMeal = () => (
    <div className="no-meal">
      <h1>No meals Yet</h1>
    </div>
  )

  /**
   * render pagination button
   * @function renderPagination
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
      <div className="m-o-Container">
        <TopNav logout={this.props.logout} />
        <div className="m-o-Content space-content" >
          <div className={`create-meal-side-nav ${this.state.isNavOpened ?
             'meals-options-open' : 'meal-options'}`}
          >
            <div className="m-o-header">
              <div className="m-o-meals">
                <h2 className="c-meals-h">Created Meals</h2>
              </div>
              <button
                onClick={this.openNavSlider}
                className={this.state.isNavOpened ?
                'm-o-btn btn-open' : 'm-o-btn btn-default'}
              >
                Add Meal
              </button>
            </div>
            <div className={this.state.isNavOpened ?
              'm-main-bar' : 'm-main-bar'}
            >
              <div className="m-mealoptions">
                { this.mealContainer() }
              </div>

            </div>
          </div>
          {this.props.allMeals.length > 0 && this.renderPagination()}
          <div className={this.state.isNavOpened ?
             'add-meal-c go-left' : 'add-meal-c'}
          >
            <AddMeal
              {...this.props}
              open={this.openNavSlider}
              isNavOpened={this.state.isNavOpened}
            />
          </div>
        </div>
      </div>
    );
  }
}

MealPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  allMeals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  imageUpload: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  createMeal: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  page: PropTypes.number,
};

MealPage.defaultProps = {
  pageCount: 0,
  page: 0,
};

const mapstatetoProps = ({ user, imageUpload, meals }) => ({
  role: user.user.role,
  success: imageUpload.success,
  imageUploadError: imageUpload.error,
  addMealError: meals.error,
  creatingMeal: meals.loading,
  isMealAdded: meals.mealsuccessful,
  isImageSuccess: meals.isImageSuccess,
  mealImageUrl: meals.imageUrl,
  isLoading: imageUpload.loading,
  allMeals: meals.meals,
  page: meals.pagination.page,
  pageCount: meals.pagination.pageCount,
  pageSize: meals.pagination.pageSize,
  totalCount: meals.pagination.totalCount,
});

export default connect(mapstatetoProps, {
  logout,
  imageUpload,
  createMeal,
  fetchMeals,
  updateMeal,
  deleteMeal,
  clearMealImage,
  mealSuccessState,
  DeleteErrorState,
})(MealPage);
