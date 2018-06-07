import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TopNav } from '../common/';
import AddMeal  from '../forms/AddMeal';
import { logout, imageUpload, createMeal } from '../../actions';

class MealPage extends Component {
  componentWillMount() {
    const { role } = this.props;
    if (role !== 'admin') {
      console.log('Going back because phemmy is a smart boy');
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

  render() {
    return (
      <div>
        <TopNav logout={this.props.logout} />
        <div className = "main-container" >
          <div className = "sidebar">
            <AddMeal {...this.props} />
          </div>
          <div className = "main-bar" >
            <h1>Add Meal Page</h1>
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
  imageUpload: PropTypes.func.isRequired
};
const mapstatetoProps = ({ user, imageUpload, createMeal }) => ({
  isAuthenticated: user.isAuthenticated,
  role: user.user.role,
  success: imageUpload.success,
  imageUploadError: imageUpload.error,
  addMealError: createMeal.error,
  imageUrl: imageUpload.imageUrl,
  isLoading: imageUpload.loading,
});
export default connect(mapstatetoProps, { logout, imageUpload, createMeal })(MealPage);
