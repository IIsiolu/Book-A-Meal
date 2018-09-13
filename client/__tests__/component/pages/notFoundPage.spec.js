import React from 'react';
import NotFoundPage from '../../../src/components/pages/NotFoundPage';

describe('Not Found Page test-suite', () => {
  it('renders properly', () => {
    const NotFoundPageWrapper = shallow(<NotFoundPage />);
    expect(NotFoundPageWrapper.exists()).toBeTruthy();
  });
});
