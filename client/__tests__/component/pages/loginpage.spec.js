import React from 'react';
import { LoginPage } from '../../../src/components/pages/LoginPage';

describe('Login Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    role: 'user',
    logIn: jest.fn(),
    isAuthenticated: false,
  };

  it('renders properly', () => {
    const LoginWrapper = shallow(<LoginPage {...props} />);
    expect(LoginWrapper.exists()).toBeTruthy();
  });

  it('should redirect to user home page if user is authenticated', () => {
    const user = { ...props, isAuthenticated: true };
    shallow(<LoginPage {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should navigate to index page if login is successful', () => {
    const SignupWrapper = shallow(<LoginPage {...props} />);
    SignupWrapper.setProps({
      isAuthenticated: true,
    });
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should call the signup action when the form is submitted', () => {
    const SignupWrapper = shallow(<LoginPage {...props} />);
    SignupWrapper.instance().submit('data');
    expect(props.logIn).toHaveBeenCalled();
  });
});
