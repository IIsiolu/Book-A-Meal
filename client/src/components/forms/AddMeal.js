import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/inlineError';

/**
 * @summary creates a new meal
 * @class
 */
class AddMeal extends Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      mealInformation: {
        name: '',
        price: '',
        description: '',
        image: '',
      },
      errors: {},
    };
  }

  /**
   * @param {object} prevProps
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.props.isImageSuccess === true) {
      this.setMealState();
      this.props.clearMealImage();
    }
    if (this.props.isMealAdded === true) {
      this.props.mealSuccessState(false);
      this.setState({
        mealInformation: {
          ...this.state.mealInformation,
          name: '',
          price: '',
          description: '',
          image: '',
          file: '',
        },
      });
    }
  }

  // handles meal for change events
  onChange = (e) => {
    this.setState({
      mealInformation: { ...this.state.mealInformation, [e.target.name]: e.target.value },
    });
  }

  // makes an api call after form is filled
  onSubmit = (e) => {
    const errors = this.validate(this.state.mealInformation);
    this.setState({ errors });
    if (Object.keys(errors).length == 0) {
      this.props.createMeal(this.state.mealInformation);
    }
  }

  /**
   * @function setMealState
   * @param {void} void
   * @returns {object} state
   */
  setMealState = () => (
    this.setState({
      mealInformation: {
        ...this.state.mealInformation,
        image: this.props.mealImageUrl,
      },
    })
  );

  /**
   * @summary validates meal inputs
   * @param {object} mealInformation
   * @returns {object} errors
   */
  validate = (mealInformation) => {
    const errors = {};
    const nameRegex = /^([a-z']+(-| )?)+$/i;
    if (!nameRegex.test(mealInformation.name) || !mealInformation.name) { errors.name = 'Invalid name input'; }
    if (!mealInformation.description && !nameRegex.test(mealInformation.description)) { errors.description = 'invalid description'; }
    if (!mealInformation.image) errors.image = 'upload a valid image';
    if (isNaN(mealInformation.price)) errors.price = "Can't be blank";
    return errors;
  }

  // uploads an image to cloudinary
  upload =(e) => {
    this.props.imageUpload(e.target.files[0], 'addMeal');
  }

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { mealInformation, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={this.props.creatingMeal} >
        <div className="add-m-header">
          <h1>Create Meal</h1><i
            onClick={this.props.open}
            className="fa fa-times"
          />
        </div>

        { this.props.addMealError && <Message negative>
          <Message.Header> Something went wrong </Message.Header>
          <p>{this.props.addMealError} </p>
                                     </Message>}
        <Form.Field error={!!errors.name}>
          <label htmlFor="name"> Meal Name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={mealInformation.name}
            onChange={this.onChange}
            placeholder="meal name"
          />
          {errors.name && <InlineError text={errors.name} /> }
        </Form.Field>
        <Form.Field error={!!errors.description}>
          {/* <label htmlFor='description'> Meal Name </label> */}
          <Form.TextArea
            label="description"
            placeholder="Input meal description..."
            name="description"
            value={mealInformation.description}
            maxLength="120"
            onChange={this.onChange}
          />
          {errors.description && <InlineError text={errors.description} /> }
        </Form.Field>
        <Form.Field error={!!errors.price}>
          <label htmlFor="price"> Price </label>
          <input
            type="number"
            id="price"
            name="price"
            value={mealInformation.price}
            min={1}
            onChange={this.onChange}
            placeholder="meal price"
          />
          {errors.price && <InlineError text={errors.price} /> }
        </Form.Field>
        <Form.Field error={!!errors.image}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            value={mealInformation.file}
            onChange={this.upload}
          />
          {errors.image && <InlineError text={errors.image} /> }
        </Form.Field>
        { this.state.mealInformation.image !== '' &&
          <div className="img-preview postedImg">
            <img className="imgup" src={this.state.mealInformation.image} alt="image" />
          </div>
        }
        <Button
          type="submit"
          primary
        >Post
        </Button>
      </Form>
    );
  }
}

AddMeal.propTypes = {
  imageUpload: PropTypes.func.isRequired,
  createMeal: PropTypes.func.isRequired,
  isImageSuccess: PropTypes.bool.isRequired,
  clearMealImage: PropTypes.func.isRequired,
  mealImageUrl: PropTypes.string.isRequired,
  isMealAdded: PropTypes.bool.isRequired,
  mealSuccessState: PropTypes.func.isRequired,
  creatingMeal: PropTypes.bool.isRequired,
  addMealError: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
};

export default AddMeal;
