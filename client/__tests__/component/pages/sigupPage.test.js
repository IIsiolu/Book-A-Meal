import React from 'react';
import { SignupPage } from '../../../src/components/pages/SignupPage';

describe('Signup Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
      goBack: jest.fn(),
    },
    role: 'user',
    signup: jest.fn(),
    isAuthenticated: false,
  };

  it('renders properly', () => {
    const SignupWrapper = shallow(<SignupPage {...props} />);
    expect(SignupWrapper.exists()).toBeTruthy();
  });

  it('should redirect to previous page if user is authenticated', () => {
    const user = { ...props, isAuthenticated: true };
    shallow(<SignupPage {...user} />);
    expect(props.history.goBack).toHaveBeenCalled();
  });

  it('should navigate to index page if signup is successful', () => {
    const SignupWrapper = shallow(<SignupPage {...props} />);
    SignupWrapper.setProps({
      isAuthenticated: true,
    });
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should call the signup action when the form is submitted', () => {
    const SignupWrapper = shallow(<SignupPage {...props} />);
    SignupWrapper.instance().submit('data');
    expect(props.signup).toHaveBeenCalled();
  });
});
