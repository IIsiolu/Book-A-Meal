import React from 'react';
import { DashboardPage } from '../../../src/components/pages/DashboardPage';

describe('Dashboard Page test-suite', () => {
  const props = {
    history: {
      push: jest.fn(),
    },
    logout: jest.fn(),
    role: 'caterer',
    orderHistory: jest.fn(),
    pageCount: 1,
    page: 1,
    orders: [
      {
        id: 1,
        name: 'Efosky',
        address: 'niger way',
        price: 10000,
        description: 'describe your meal',
        user: 'user',
      },
    ],
  };

  it('renders properly', () => {
    const DashboardWrapper = shallow(<DashboardPage {...props} />);
    expect(DashboardWrapper.exists()).toBeTruthy();
  });

  it('dispatch a orderHistory action upon successfully mount', () => {
    shallow(<DashboardPage {...props} />);
    expect(props.orderHistory).toHaveBeenCalled();
  });

  it('should take you to guest homepage if role is not caterer', () => {
    const user = { ...props, role: 'user' };
    shallow(<DashboardPage {...user} />);
    expect(props.history.push).toHaveBeenCalled();
  });

  it('fetch new orderHistory page when pagination button is clicked', () => {
    const DashboardWrapper = shallow(<DashboardPage {...props} />);
    DashboardWrapper.instance().handlePageChange({ selected: 1 });
    expect(props.orderHistory).toHaveBeenCalled();
  });
});
