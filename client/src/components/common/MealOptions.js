import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import uploadImage from '../../utils/uploadImage';

let formerState = {}

/**
 * Meal Options Page
 * @class MealOptions
 * @constructor
 */
class MealOptions extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        id: props.meal.id,
        name: props.meal.name,
        image: props.meal.image,
        price: props.meal.price,
        description: props.meal.description,
      },
      id: props.meal.id,
      edit: false,
      errors: {}
    }
  }
  // sweet alert
  alert = () => (
    swal("Meal Updated", "Your meal has been updated successfully!", "success")
  )

  /**
   * @method componentDidUpdate
   * @param {*} prevProps - previous props
   * @param {*} prevState - previous state
   */
  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.state.errors).length ) {
      let error= '';
      for(let err in this.state.errors){
        error+= this.state.errors[err] + ','
      }
      swal("Meal error", error , "error")
      this.state.errors = {};
    }
    if (this.props.mealUpdated === true ) {
      this.alert();
      this.props.changeMealSuccess(false);
    }
    if ( this.props.isUpdateMealError === true) {
      swal("Meal error", 'error updating meal' , "error");
      this.props.changeMealError(false);
    }
    if(this.props.isMealDeleteError === true) {
      swal("Meal error", 'error deleting meal' , "error")
      this.props.DeleteErrorState(false);
    }
    if(this.props.mealDeleted === true) {
      swal("Meal Deleted",
       'Your meal has been deleted successfully' , "success");
      this.props.changeSuccessState(false);
    }
    let newVal = Object.keys(this.props.meal).every((meal) =>
    Object.is(this.props.meal[meal], prevProps.meal[meal]) === true
  )
    !newVal && this.setState({
      data: {...this.state.data, ...this.props.meal}
    })
  }
  
  // validates meal inputs
  validate(data) {
    const errors = {};
    const nameRegex = /^([a-z']+(-| )?)+$/i
    if (!nameRegex.test(data.name) || !data.name) errors.name = 'Invalid name';
    if (!Number.isInteger(data.price)) errors.price = 'invalid number';
    return errors
  }

  // function to update meal
  submit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ 
      errors: errors,
     });
    if(Object.keys(errors).length==0){
      this.setState({ 
        edit: !this.state.edit,
       });
      let stateArr = Object.keys(formerState.data);
      let notUpdated = stateArr.every((key) =>
       Object.is(formerState.data[key], this.state.data[key]) === true)
       return notUpdated ? '' : this.props.updateMeal(this.state.data)
    }
  }

  // function to upload meal to cloudinary
  upload = async (event) => {
    try {
      let response =await uploadImage(event.target.files[0])
      const { data } = response;
      console.log(data)
      const fileURL = data.secure_url;
      console.log(fileURL);
      this.setState({
        data: { ...this.state.data, image: fileURL}
     });
    } catch(err) {
      console.log(err)
      return err
    }
  }

  //  warning alert when meal is to be deleted
  deleteMeal = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this meal!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteMeal(this.state.data.id);
      } else {
        swal("Your meal is safe!");
      }
    });
  }

  // edit meal function
  edit = () => {
    formerState = this.state;
    this.setState({
      ...this.state, edit: !this.state.edit
    })
  }

  // cancel meal edit
  cancel = () => {
    this.setState({
      ...formerState
    })
  }

  // meal input event
  onChange =(e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }
  
  /**
   * @description renders a view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { errors } = this.state;
    const data = this.props.meal;
    return (
      <div className="m-c-container">
        <div className="m-c-imgcontainer">
          <img className="" src={this.state.data.image} alt="my food" />
          <div className={this.state.edit ? "food-E-overlay" : 'hide'}></div>
          <div className={this.state.edit ? "foodies-info" : 'hide'}>
                      <input
                type='file'
                id='file' name='file'
                accept='image/*'
                onChange={this.upload}
                />
                      
            </div>
        </div>
        <div className="meal-input-info">
          <div className="meal-i-p">
            <input className={this.state.edit? 
              'myInputs card-input meal-name-input' :
               'meal-name-input clear-default'} onChange={this.onChange}
                name="name" type="text" value={this.state.data.name}
                 disabled={!this.state.edit} />
            <div className="meal-currency">
              <h5>&#8358;</h5>
              <input className={this.state.edit?
                'myInputs card-input meal-currency-input' :
                 'clear-default meal-currency-input' } 
                 onChange={this.onChange} name='price' type="text" 
                 value={this.state.data.price} disabled={!this.state.edit} />
            </div>
          </div>
          <textarea className={this.state.edit? 'myInputs meal-i-t':
           'meal-i-t clear-default'} onChange={this.onChange} id="advanced"
            name="description"
                  value={this.state.data.description}
                  disabled={!this.state.edit}
                  rows="3" cols="33" maxLength="120"
                  wrap="hard">
        </textarea>
        </div>
        <div className={this.state.edit ? 'hide' : 'down-btn'} >
          <button className='btn-style left-area'
           onClick={this.edit}>Edit</button>
          <button onClick={() => this.deleteMeal()}
           className="btn-style right-area"> Delete</button>
        </div>
        <div className={this.state.edit ? 'down-btn' : 'hide'}>
          <button className='btn-style left-area'
           onClick={this.submit}>Save</button>
          <button className='btn-style right-area'
           onClick={this.cancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

MealOptions.propTypes = {
  meal: PropTypes.object.isRequired,
};

export default MealOptions;
