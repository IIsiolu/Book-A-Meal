import React, { Component } from 'react';
import validator from 'validator';
import { Form, Button, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InlineError from '../messages/inlineError';
/**
 * @class SignupForm
 *
 * @extends {React.Component}
 */
class SignupForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        role: props.role,
      },
      loading: false,
      errors: {},
    }
  }
    
  // handle change events
  onChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  // sets the role
  check = (check) => {
    check.target.checked ? this.setState({
      data: {...this.state.data, role: 'admin'}
    }) : this.setState({
      data: {...this.state.data, role: 'user'}
    })
  }
  
  // makes an api call once submit button is clicked
  onSubmit =(e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length==0){
      this.props.submit(this.state.data)
    }
  }

  // validates form inputs
  validate(data) {
    const errors = {};
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let letterRegex =  /^[a-zA-Z]+$/;

    if (!emailRegex.test(data.email)
     || !data.email) errors.email = 'Invalid email';
    if (!data.password || data.password.length<6)
     errors.password = "Can't be blank and must be minimum 6";
    if(!data.firstname || !letterRegex.test(data.firstname))
     errors.firstname = 'firstname must be a valid letter'
    if(!data.lastname || !letterRegex.test(data.lastname))
     errors.lastname = 'name must be a valid letter'
    return errors;
  }

  /**
   * @description renders user view
   * @method render
   * @returns {JSX} jsx
   */
  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={this.props.loading} >
        { this.props.error && <Message negative>
            <Message.Header> Something went wrong </Message.Header>
            <p>{this.props.error} </p>
        </Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'> Email </label>
          <input
            type='email'
            id='email' name='email'
            value={data.email}
            onChange={this.onChange}
            placeholder='example@example.com' />
            {errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'> Password </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Make it secure'
            value={data.password}
            onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} /> }

        </Form.Field>
        <Form.Field error={!!errors.firstname}>
          <label htmlFor='firstname'> First Name </label>
          <input
            type='text'
            id='firstname' name='firstname'
            value={data.firstname}
            onChange={this.onChange}
            placeholder='example@example.com' />
            {errors.firstname && <InlineError text={errors.firstname} /> }
        </Form.Field>
        <Form.Field error={!!errors.lastname}>
          <label htmlFor='lastname'> Last Name </label>
          <input
            type='text'
            id='lastname' name='lastname'
            value={data.lastname}
            onChange={this.onChange}
            placeholder='example@example.com' />
            {errors.lastname && <InlineError text={errors.lastname} /> }
        </Form.Field>
        <Form.Field>
          <input
            className="ui checkbox"
            type="checkbox"
            onChange={this.check}
            name="role" />
          <label>Signup As A Caterer</label>
        </Form.Field>
        { errors.right && <Message negative>
          <Message.Header> Something went wrong </Message.Header>
          <p>{errors.right} </p>
        </Message>}
        <div className="log-sign">
          <Button
            type="submit"
            primary
          >Signup
        </Button>
        <Link to="/login">Already have an Account? SIGN IN</Link>
        </div>
        
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignupForm;
