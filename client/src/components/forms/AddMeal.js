import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/inlineError';
import swal from 'sweetalert';

import { isLoading } from '../../actions/imageUpload';
// import ImageUpload from './ImageUpload';

class AddMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        price: '',
        description: '',
        image: null
      },
      loading: false,
      errors: {},
    };
  }
  componentDidUpdate(prevProps){
    if(this.props.imageUrl !== prevProps.imageUrl){
      this.setState({
        data: {
          ...this.state.data,
        image: this.props.imageUrl
        }
        
      })
    }
    if(this.props.isMealAdded === true ){
      console.log('meal added ')
      swal("Meal Added", "Your meal has been added successfully!", "success")
      this.props.mealSuccessState(false);
      this.setState({
        data: {
          ...this.state.data,
          name: '',
          price: '',
          description: '',
          image: ''
        }
      })
    }
    console.log('prevProps>>>>', prevProps)
  }
  onChange =(e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  onSubmit =(e) => {
    e.preventDefault();
    console.log(e);
    
    // console.log(this.state.data);
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length==0){
      this.props.createMeal(this.state.data)
    }
  }
  validate(data) {
    const errors = {};
    const nameRegex = /^([a-z']+(-| )?)+$/i

    if (!nameRegex.test(data.name) || !data.name) errors.name = 'Invalid name input';
    if (!data.description && !nameRegex.test(data.description)) errors.description = "invalid description";
    if (!data.image) errors.image = "upload a valid image"
    if (!data.price) errors.price = "Can't be blank"
    return errors;
  }
  upload =(e) => {
    console.log(e.target.files[0])
    this.props.imageUpload(e.target.files[0], (secure_url) => {
      this.setState({
        data: {...this.state.data, image: secure_url}
      })
    })
    
  }

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={this.props.creatingMeal} >
        <h1>Create Meal</h1>
      { this.props.addMealError && <Message negative>
                <Message.Header> Something went wrong </Message.Header>
                <p>{this.props.addMealError} </p>
            </Message>}
        <Form.Field error={!!errors.name}>
          <label htmlFor='name'> Meal Name </label>
          <input
            type='text'
            id='name' name='name'
            value={data.name}
            onChange={this.onChange}
            placeholder='meal name' />
            {errors.name && <InlineError text={errors.name} /> }
        </Form.Field>
        <Form.Field error={!!errors.description}>
          {/* <label htmlFor='description'> Meal Name </label> */}
          <Form.TextArea label='description'
          placeholder='Input meal description...'
          name='description'
          value={data.description}
          maxLength="120"
          onChange={this.onChange} />
          {errors.description && <InlineError text={errors.description} /> }
        </Form.Field>
        <Form.Field error={!!errors.price}>
          <label htmlFor='price'> Price </label>
          <input
            type='number'
            id='price' name='price'
            value={data.price}
            min={1}
            onChange={this.onChange}
            placeholder='meal price' />
            {errors.price && <InlineError text={errors.price} /> }
        </Form.Field>
        <Form.Field error={!!errors.image}>
          <input
            type='file'
            id='file' name='file'
            accept='image/*'
            value={data.file}
            onChange={this.upload}
             />
            {errors.image && <InlineError text={errors.image} /> }
        </Form.Field>
        {this.props.imageUrl ? 
        <div className="postedImg">
          <img className="imgup" src={this.state.data.image} alt="image" />
        </div> : ''}
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
  isLoading: PropTypes.bool.isRequired,
}

export default AddMeal;
