import React, { Component } from 'react';
import validator from 'validator';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InlineError from '../messages/inlineError';
/**
 * @class Login
 *
 * @extends {React.Component}
 */
class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      data: {
        email: '',
        password: '',
      },
      loading: false,
      errors: {},
    }
  }
    
  
  onChange =(e) => {
    console.log(e.target.value)
    this.setState({
      data: { ...this.state.data, [e.target.name]: [e.target.value] },
    });
  }
  onSubmit =(e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length==0){
      this.props.submit(this.state.data)
    }
  }

  validate(data) {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    return (
            <Form onSubmit={this.onSubmit} >
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

              <Button
                type="submit"
                primary
              >Login
              </Button>
            </Form>
    );
  }
}

LoginForm.prototypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm;
