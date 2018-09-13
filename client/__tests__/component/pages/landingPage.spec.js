import React from 'react';
import { LandingPage } from '../../../src/components/pages/LandingPage';

describe('Landing Page test-suite', () => {
  const props = {
    logout: jest.fn(),
    isAuthenticated: false,
  };

  it('renders properly', () => {
    const MealPageWrapper = shallow(<LandingPage {...props} />);
    expect(MealPageWrapper.exists()).toBeTruthy();
  });
});
