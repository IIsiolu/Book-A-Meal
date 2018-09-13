import faker from 'faker';

const menuFaker = {
  mondayMenu: {
    mealId: [1, 2],
    date: '2018-01-01',

  },
  createdMenu: {
    date: '2018-10-17',
    mealId: [1, 2],
  },
  invalidMenuDate: {
    date: '25-14-2018',
    mealId: [1, 2],
  },
  invalidMealId: {
    date: '2018-10-17',
    mealId: ['x', 'y'],
  },
  septemberMenu: {
    date: '2018-10-17',
    mealId: [],
  },
};

export default menuFaker;
