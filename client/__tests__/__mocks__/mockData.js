const mockData = {
  authResponse: {
    success: true,
    data: {
      firstname: 'oluwafemi',
      lastname: 'adekunle',
      role: 'user',
      email: 'phem4@gmail.ciu',
    },
  },
  loginResponse: {
    success: true,
    message: 'Welcome oluwafemi',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJ1c2VyIiwiZmlyc3RuYW1lIjoib2x1d2FmZW1pIiwiaWF0IjoxNTM0MTE0MzQ0LCJleHAiOjE1MzU5MTQzNDR9.nrCV-E_kCU4ZNSnz8Z9fG34wSdvGTyOrBmru5DdvPF4',
  },
  signUpData: {
    firstname: 'oluwafemi',
    lastname: 'adekunle',
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  signinData: {
    password: 'user123',
    email: 'phem4@gmail.ciu',
  },
  signupFailure: {
    message: 'User already exist',
  },
  mealData: {
    name: 'ofadas',
    price: 2000,
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  mealData2: {
    name: 'ofadas',
    price: 'yyy',
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  mealData3: {
    name: '123ofadas',
    price: 2000,
    description: 'Users  are very much satisfied with such delicacy',
    image: 'https://medium.com/the-andela-way/a-simple',
  },
  mealUpdate: {
    id: 1,
    price: 17000,
  },
  mealSuccess: {
    success: true,
    data: {
      id: 1,
      description: 'Users  are very much satisfied with such delicacy',
      price: 2000,
      image: 'https://medium.com/the-andela-way/a-simple',
      name: 'Ofadas',
      updatedAt: '2018-08-25T09:34:46.290Z',
      createdAt: '2018-08-25T09:34:46.290Z',
      userId: 1,
    },
  },
  mealExist: {
    success: false,
    message: 'Meal already exist',
  },
  inValidMealPrice: {
    success: false,
    message: 'invalid meal price',
  },
  invalidMealName: {
    success: false,
    message: 'invalid meal name',
  },
  mealUpdateSuccess: {
    success: true,
    message: 'updated',
  },
  mealUpdate2: {
    id: 1,
    price: 'price',
  },
  invalidPriceUdate: {
    success: false,
    message: 'invalid meal price',
  },
  mealDeleted: {
    success: true,
    message: 'meal successfully deleted!',
  },
  deleteMealError: {
    success: false,
    message: 'There is no meal with that id!!',
  },
  userOrder: {
    orders: [
      { mealId: 1, quantity: 2 }, { mealId: 2, quantity: 3 },
    ],
  },
  userOrderSuccess: {
    success: true,
    data: [
      {
        id: 5,
        quantity: 2,
        status: 'pending',
        mealId: 1,
        userId: 1,
        createdAt: '2018-08-25T22:42:43.266Z',
        updatedAt: '2018-08-25T22:42:43.267Z',
      },
      {
        id: 6,
        quantity: 3,
        status: 'pending',
        mealId: 1,
        userId: 1,
        createdAt: '2018-08-25T22:42:43.266Z',
        updatedAt: '2018-08-25T22:42:43.267Z',
      },
    ],
  },
  userOrder2: {
    orders: [
      { mealId: 'two', quantity: 2 }, { mealId: 2, quantity: 3 },
    ],
  },
  userOrder3: {
    orders: [
      { mealId: 2, quantity: 2 }, { mealId: 2, quantity: 'four' },
    ],
  },
  userOrderError: {
    success: false,
    message: 'Meal Id and quantity must be an Integer',
  },

  fetchMealSuccess: {
    success: true,
    pagination: {
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 2,
        totalCount: 2,
      },
    },
    data: [
      {
        id: 3,
        name: 'food',
        description: 'Users  are very much satisfied with such delicacy',
        price: 200,
        image: 'https://medium.com/the-andela-way/a-simple',
        userId: 1,
        createdAt: '2018-08-25T22:42:12.009Z',
        updatedAt: '2018-08-25T22:42:12.009Z',
      },
      {
        id: 2,
        name: 'joloofRice',
        description: 'Users  are very much satisfied with such delicacy',
        price: 2000,
        image: 'https://medium.com/the-andela-way/a-simple',
        userId: 1,
        createdAt: '2018-08-25T12:58:34.198Z',
        updatedAt: '2018-08-25T12:58:34.198Z',
      },
    ],
  },
  menuData: {
    mealId: [1, 2],
    date: '2018-06-10',
  },
  menuMeals: [{ id: 1 }, { id: 2 }],
  menuSUccess: {
    createdAt: '2018-08-25T09:34:46.290Z',
    description: 'Users  are very much satisfied with such delicacy',
    id: 1,
    image: 'https://medium.com/the-andela-way/a-simple',
    name: 'Ofadas',
    price: 2000,
    updatedAt: '2018-08-25T09:34:46.290Z',
    userId: 1,
  },
  invalidMenuInput: {
    mealId: [1, 2],
    date: '10-2018',
  },
  menuFailure: {
    message: 'invalid date input',
  },
};
export default mockData;
