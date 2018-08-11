import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { ToastContainer } from "react-toastr";
import { TopNav, MealOptions } from '../common/';
import {AddMeal, UpdateMeal}  from '../forms';
import { logout, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeal, deleteMeal, changeMealSuccess, changeMealError, changeSuccessState, mealSuccessState, DeleteErrorState } from '../../actions';

class MealPage extends Component {

  constructor(){
    super();
    this.state = {
      isNavOpened: false
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // {this.props.mealUpdated && this.alert()}
    
    // if (prevProps.mealUpdated === this.props.mealCreated && this.props.mealUpdated === true ) {
    //   this.alert();
    // }
    // if (this.state.mealUpdated === )
  }
  
  componentDidMount(){
    this.props.fetchMeals()
  }
  componentWillMount() {
    const { role } = this.props;
    if (!(role === 'admin' || role === 'super-admin')) {
      this.props.history.push('/login');
    }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  imageUpload = (data) => (
    this.props.imageUpload(data)
   )
  submit = (data) => (
    this.props.createMeal(data)
  )
  edit = (bool) => (
    this.props.isModalOpened(bool)
  )
  noMeal = () => (
    <div>
      <h1>No meals Yet</h1> 
    </div>
  )
  openNav = () => (
    this.setState({
      ...this.state, isNavOpened: !this.state.isNavOpened
    })
  )
  alert = () => (
    swal("Meal Updated", "Your meal has been updated successfully!", "success")
  )
  myMeals = () => (
     this.props.fetchedMeals ? (this.props.allMeals.length ? 
      this.props.allMeals.map((meal, i) => <MealOptions {...this.props} key={i} meal={meal} />) : this.noMeal() ) : this.noMeal()
  )

  render() {
    return (
      <div className="m-o-Container">
        <TopNav logout={this.props.logout} />
        <div className = "m-o-Content space-content" >
          <div className={this.state.isNavOpened? 'meals-options-open' : 'meal-options'}>
            <div className="m-o-header">
                <div className="m-o-meals">
                  <h2 className="c-meals-h">Created Meals</h2>
                </div>
                <button onClick={this.openNav} className={this.state.isNavOpened? 'm-o-btn btn-open' : 'm-o-btn btn-default'}>Add Meal</button>
            </div>
            <div className = {this.state.isNavOpened? 'm-main-bar': 'm-main-bar'} >
              <div className="m-mealoptions">
                { this.myMeals() }
              </div>

            </div>
          </div>
          
          <div className = {this.state.isNavOpened? 'add-meal-c go-left': 'add-meal-c'}>
            {this.props.openModal ? <UpdateMeal {...this.props}  /> : ''} 
            <AddMeal {...this.props} open={this.openNav} isNavOpened={this.state.isNavOpened}  />
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
  openModal: PropTypes.bool.isRequired,
  isModalOpened: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  createMeal: PropTypes.func.isRequired,
  changeMealSuccess: PropTypes.func.isRequired,
  changeMealError: PropTypes.func.isRequired,
  
};
const mapstatetoProps = ({ user, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeals, deleteMeal }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  success: imageUpload.success,
  imageUploadError: imageUpload.error,
  addMealError: createMeal.error,
  mealCreated: createMeal.success,
  creatingMeal: createMeal.loading,
  isMealAdded: createMeal.mealsuccessful,
  imageUrl: imageUpload.imageUrl,
  imageId: imageUpload.id,
  isLoading: imageUpload.loading,
  allMeals: fetchMeals.meals,
  fetchedMeals: fetchMeals.success,
  openModal: isModalOpened.open,
  modalId: isModalOpened.id,
  updatingMeal: updateMeals.loading,
  mealUpdated: updateMeals.success,
  mealUpdatedId: updateMeal.meal,
  isUpdateMealError: updateMeal.isError,
  updateMealError: updateMeals.error,
  mealDeleted: deleteMeal.success,
  deletingMeal: deleteMeal.loading,
  isMealDeleteError: deleteMeal.isMealDeleteError,
  deleteMealError: deleteMeal.error
});
export default connect(mapstatetoProps, { logout, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeal, deleteMeal, changeMealSuccess, changeMealError, changeSuccessState, mealSuccessState, DeleteErrorState })(MealPage);
