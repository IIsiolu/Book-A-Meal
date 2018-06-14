import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TopNav, MealOptions } from '../common/';
import {AddMeal, UpdateMeal}  from '../forms';
import { logout, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeal, deleteMeal } from '../../actions';

class MealPage extends Component {
  
  componentDidMount(){
    this.props.fetchMeals()
  }
  componentWillMount() {
    const { role } = this.props;
    if (role !== 'admin') {
      console.log('Going back because phemmy is a smart boy');
      this.props.history.push('/login');
    }
    // this.props.fetchMeals;
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

  render() {
    const myMeals = this.props.fetchedMeals ? (this.props.allMeals.length ? 
      this.props.allMeals.map((meal, i) => <MealOptions {...this.props} key={i} meal={meal} />) : this.noMeal() ) : this.noMeal()
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <div className = "main-container" >
          <div className = "sidebar">
            {this.props.openModal ? <UpdateMeal {...this.props}  /> : ''}
            
            <AddMeal {...this.props} />
          </div>
          <div className = "main-bar" >
            <h1>Add Meal Page</h1>
            <div>
              { myMeals }
              
            </div>
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

  
};
const mapstatetoProps = ({ user, imageUpload, createMeal, fetchMeals, isModalOpened }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  success: imageUpload.success,
  imageUploadError: imageUpload.error,
  addMealError: createMeal.error,
  mealCreated: createMeal.success,
  imageUrl: imageUpload.imageUrl,
  isLoading: imageUpload.loading,
  allMeals: fetchMeals.meals,
  fetchedMeals: fetchMeals.success,
  openModal: isModalOpened.open,
  modalId: isModalOpened.id
});
export default connect(mapstatetoProps, { logout, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeal, deleteMeal })(MealPage);
