import faker from 'faker';

const menuFaker = {
  newMenu: {
    mealId: [1, 2, 3, 4],
    date: '2018-01-01',

  },
  newMenu1: {
    mealId: [1, 2, 3, 4],
    date: '2018-01-01',
  },
  newMenu2: {
    mealId: [1, 2, 3, 4],
    date: '2018-01-01',
  },
  newMenu3: {
    mealId: '',
    date: '2018-01-01',
  },
  newMenu4: {
    mealId: [1, 2, 3, 4],
    date: '',
  },
  newMenu5: {
    mealId: [1, 2, 3, 4],
    date: '2018-01-01',
  },
  newMenu6: {
    mealId: [1, 2, 3, 4],
    date: '2018-01-10',
  },
  newMenu7: {
    mealId: { x: 'femi' },
    date: '2018-01-10',
  },
  newMenu8: {
    mealId: [1, 2, 3, 'y'],
    date: '2018-01-10',
  },
};

export default menuFaker;
