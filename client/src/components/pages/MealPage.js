import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
import { TopNav, MealOptions } from '../common/';
import {AddMeal}  from '../forms';
import { logout, imageUpload, createMeal, fetchMeals, clearMealImage,
   updateMeal, deleteMeal, changeMealSuccess, changeMealError,
    changeSuccessState,
     mealSuccessState, DeleteErrorState } from '../../actions';

/**
* Meal Page
* @class MealPage
* @constructor
*/
class MealPage extends Component {

  constructor() {
    super();
    this.state = {
      isNavOpened: false
    }
  }

  /**
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'admin' || role === 'super-admin')) {
      this.props.history.push('/');
    }
  }
  
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.fetchMeals()
  }

  // function to upload Image
  imageUpload = (image) => (
    this.props.imageUpload(image)
   )

  //  function to create a new meal
  submit = (meals) => (
    this.props.createMeal(meals)
  )

  /**
   * Called if there is no meal in the page
   * @function renderNoMeal
   * @returns jsx
   */
  renderNoMeal = () => (
    <div className="no-meal">
      <h1>No meals Yet</h1> 
    </div>
  )

  // opens side navigation to add meal
  openNavSlider = () => (
    this.setState({
      ...this.state, isNavOpened: !this.state.isNavOpened
    })
  )

  // sweet alert
  alert = () => (
    swal("Meal Updated",
     "Your meal has been updated successfully!", "success")
  )

  // meal container
  mealContainer = () => (
     this.props.allMeals.length ? 
      this.props.allMeals.map((meal, i) =>
       <MealOptions {...this.props} key={i}
        meal={meal} />) : this.renderNoMeal() 
    )

  //  check if meal exist in the page
  isMeal = () => (
    this.props.allMeals.length? true : false
  )

  // handles pagination click event
  handlePageChange = ({selected}) => {
    const page = selected + 1;
    localStorage.setItem('currentMealPage', page);
    const currentPage = localStorage.getItem('currentMealPage');
    this.props.fetchMeals(currentPage);
  }

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

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div className="m-o-Container">
        <TopNav logout={this.props.logout} />
        <div className = "m-o-Content space-content" >
          <div className={this.state.isNavOpened ?
             'meals-options-open' : 'meal-options'}>
            <div className="m-o-header">
                <div className="m-o-meals">
                  <h2 className="c-meals-h">Created Meals</h2>
                </div>
                <button onClick={this.openNavSlider} 
                className={this.state.isNavOpened? 
                'm-o-btn btn-open' : 'm-o-btn btn-default'}>
                Add Meal</button>
            </div>
            <div className = {this.state.isNavOpened ? 
              'm-main-bar': 'm-main-bar'} >
              <div className="m-mealoptions">
                { this.mealContainer() }
              </div>

            </div>
          </div>
          {this.props.allMeals.length && this.renderPagination()}
          <div className = {this.state.isNavOpened?
             'add-meal-c go-left': 'add-meal-c'}>
            <AddMeal {...this.props} open={this.openNavSlider}
             isNavOpened={this.state.isNavOpened}  />
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
  logout: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
  imageUpload: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  createMeal: PropTypes.func.isRequired,
  changeMealSuccess: PropTypes.func.isRequired,
  changeMealError: PropTypes.func.isRequired,
};

const mapstatetoProps = ({ user, imageUpload, createMeal,
   fetchMeals, updateMeals, deleteMeal }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  success: imageUpload.success,
  imageUploadError: imageUpload.error,
  addMealError: createMeal.error,
  mealCreated: createMeal.success,
  creatingMeal: createMeal.loading,
  isMealAdded: createMeal.mealsuccessful,
  isImageSuccess: createMeal.isImageSuccess,
  mealImageUrl: createMeal.imageUrl,
  imageId: imageUpload.id,
  isLoading: imageUpload.loading,
  allMeals: fetchMeals.meals,
  fetchedMeals: fetchMeals.success,
  updatingMeal: updateMeals.loading,
  mealUpdated: updateMeals.success,
  mealUpdatedId: updateMeal.meal,
  isUpdateMealError: updateMeal.isError,
  updateMealError: updateMeals.error,
  mealDeleted: deleteMeal.success,
  deletingMeal: deleteMeal.loading,
  isMealDeleteError: deleteMeal.isMealDeleteError,
  deleteMealError: deleteMeal.error,
  page: fetchMeals.pagination.page,
  pageCount: fetchMeals.pagination.pageCount,
  pageSize: fetchMeals.pagination.pageSize,
  totalCount: fetchMeals.pagination.totalCount,
});

export default connect(mapstatetoProps, { logout, imageUpload, createMeal,
   fetchMeals, updateMeal, deleteMeal, clearMealImage,
    changeMealSuccess, changeMealError, changeSuccessState,
     mealSuccessState, DeleteErrorState })(MealPage);
