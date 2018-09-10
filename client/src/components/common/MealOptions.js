import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import uploadImage from '../../utils/uploadImage';

let formerState = {};

/**
 * Meal Options Page
 * @class MealOptions
 * @constructor
 */
class MealOptions extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mealInfo: {
        id: props.meal.id,
        name: props.meal.name,
        image: props.meal.image,
        price: props.meal.price,
        description: props.meal.description,
      },
      edit: false,
      errors: {},
    };
  }

  /**
   * @method componentDidUpdate
   * @param {object} prevProps - previous props
   * @param {object} prevState - previous state
   * @returns {void} void
   */
  componentDidUpdate(prevProps) {
    if (Object.keys(this.state.errors).length) {
      let error = '';
      for (const err in this.state.errors) {
        error += `${this.state.errors[err]},`;
      }
      swal('Meal error', error, 'error');
      this.state.errors = {};
    }
    const isMealUpdated = Object.keys(this.props.meal).every(meal =>
      Object.is(this.props.meal[meal], prevProps.meal[meal]) === true);
    !isMealUpdated && this.setState({
      mealInfo: { ...this.state.mealInfo, ...this.props.meal },
    });
  }

  // meal input event
  onChange = (e) => {
    this.setState({
      mealInfo: { ...this.state.mealInfo, [e.target.name]: e.target.value },
    });
  }

  //  warning alert when meal is to be deleted
  deleteMeal = () => swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this meal!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        this.props.deleteMeal(this.state.mealInfo.id);
      } else {
        swal('Your meal is safe!');
      }
      return willDelete;
    })

  // edit meal function
  edit = () => {
    formerState = this.state;
    this.setState({
      ...this.state, edit: !this.state.edit,
    });
  }

  // cancel meal edit
  cancel = () => {
    this.setState({
      ...formerState,
    });
  }

  /**
   * @summary validates meal input
   * @param {object} meal
   * @returns {object} meal
   */
  validate = (meal) => {
    const errors = {};
    const nameRegex = /^([a-z']+(-| )?)+$/i;
    if (!nameRegex.test(meal.name) || !meal.name) errors.name = 'Invalid name';
    if (isNaN(meal.price)) errors.price = 'invalid number';
    return errors;
  }

  /**
   * @summary updates a meal with valid meal inputs
   * @returns {Function} updateMeal
   */
  updateMeal = () => {
    const errors = this.validate(this.state.mealInfo);
    this.setState({
      errors,
    });
    if (Object.keys(errors).length === 0) {
      this.setState({
        edit: !this.state.edit,
      });
      const previousMeal = Object.keys(formerState.mealInfo);
      // checks if changes are made
      const isMealUpdated = previousMeal.every(key =>
        Object.is(formerState.mealInfo[key], this.state.mealInfo[key]) === true);
      return isMealUpdated ? null : this.props.updateMeal(this.state.mealInfo);
    }
  }

  // function to upload meal image to cloudinary
  upload = async (event) => {
    try {
      const response = await uploadImage(event.target.files[0]);
      const { data } = response;
      const fileURL = data.secure_url;
      this.setState({
        mealInfo: { ...this.state.mealInfo, image: fileURL },
      });
    } catch (err) {
      return err;
    }
  }


  /**
   * @description renders a view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    return (
      <div className="m-c-container">
        <div className="m-c-imgcontainer">
          <img className="" src={this.state.mealInfo.image} alt="my food" />
          <div className={this.state.edit ? 'food-E-overlay' : 'hide'} />
          <div className={this.state.edit ? 'foodies-info' : 'hide'}>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={this.upload}
            />

          </div>
        </div>
        <div className="meal-input-info">
          <div className="meal-i-p">
            <input
              className={this.state.edit ?
              'myInputs card-input meal-name-input' :
               'meal-name-input clear-default'}
              onChange={this.onChange}
              name="name"
              type="text"
              value={this.state.mealInfo.name}
              disabled={!this.state.edit}
            />
            <div className="meal-currency">
              <h5>&#8358;</h5>
              <input
                className={this.state.edit ?
                'myInputs card-input meal-currency-input' :
                 'clear-default meal-currency-input'}
                onChange={this.onChange}
                name="price"
                type="text"
                value={this.state.mealInfo.price}
                disabled={!this.state.edit}
              />
            </div>
          </div>
          <textarea
            className={this.state.edit ? 'myInputs meal-i-t' :
           'meal-i-t clear-default'}
            onChange={this.onChange}
            id="advanced"
            name="description"
            value={this.state.mealInfo.description}
            disabled={!this.state.edit}
            rows="3"
            cols="33"
            maxLength="120"
            wrap="hard"
          />
        </div>
        <div className={this.state.edit ? 'hide' : 'down-btn'} >
          <button
            className="btn-style edit-meal-btn left-area"
            onClick={this.edit}
          >Edit
          </button>
          <button
            onClick={() => this.deleteMeal()}
            className="btn-style delete-btn right-area"
          > Delete
          </button>
        </div>
        <div className={this.state.edit ? 'down-btn' : 'hide'}>
          <button
            className="btn-style save-meal-update left-area"
            onClick={this.updateMeal}
          >Save
          </button>
          <button
            className="btn-style right-area"
            onClick={this.cancel}
          >Cancel
          </button>
        </div>
      </div>
    );
  }
}

MealOptions.propTypes = {
  meal: PropTypes.object.isRequired,
  updateMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
};

export default MealOptions;
