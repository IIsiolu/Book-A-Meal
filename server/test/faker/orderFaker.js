
const orderFaker = {
  newOrder: {
    orders: [
      {
        mealId: 2,
        quantity: 5,
      },
      {
        mealId: 2,
        quantity: 5,
      },
    ],

  },
  newOrder1: {
    orders: [
      {
        mealId: 2,
        quantity: 5,
      },
      {
        mealId: 2,
        quantity: 5,
      },
    ],
  },
  newOrder2: {
    mealId: '',
    quantity: 6,
  },
  newOrder3: {
    mealId: '',
    quantity: 4,
  },
  newOrder4: {
    mealId: 1,
    quantity: '',
  },
  bunmiOrder: {
    order: {
      meals: [
        {
          mealId: 2,
          quantity: 5,
        },
        {
          mealId: 2,
          quantity: 5,
        },
      ],
      address: 'andelean way',
    },
  },
  waleOrder: {
    order: {
      meals: [
        {
          mealId: 2,
          quantity: 5,
        },
        {
          mealId: 2,
          quantity: 5,
        },
      ],
      address: 'andelean way',
    },
  },
  newUpdate: {
    orders: { quantity: 4, status: 'pending' },
  },

  newUpdate2: {
    orders: [
      {
        mealId: 1,
        quantity: 9,
      },
      {
        mealId: 1,
        quantity: 3,
      },
    ],
  },
  newOrder6: {
    orders: [
      {
        mealId: 2,
        quantity: 5,
      },
      {
        mealId: 2,
        quantity: 5,
      },
    ],
  },
  newOrder7: {
    order: {
      meals: [],
      address: 'london way',
    },
  },
  newOrder8: {
    order: {
      meals: [],
      address: 'ggggggggg',
    },
  },
  newOrder9: {
    order: {
      meals: [
        {
          mealId: 'y',
          quantity: 5,
        },
        {
          mealId: 2,
          quantity: 5,
        },
      ],
      address: 'hello world',
    },
  },
};

export default orderFaker;
