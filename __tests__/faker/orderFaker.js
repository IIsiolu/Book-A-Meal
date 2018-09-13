
const orderFaker = {
  bisi_order: {
    order: {
      meals: [
        { mealId: 211, quantity: 40 }, { mealId: 212, quantity: 17 },
      ],
      address: 'london road andela',
    },

  },
  invalidOrder: {
    order: {
      meals: {
        mealId: 211, quantity: 40,
      },
      address: 'no 3, moruff street, oshodi',
    },
  },

  wrongMeal: {
    order: {
      meals: [
        { mealId: 7, quantity: 40 },
      ],
      address: 'london road andela',
    },

  },

  bisi_meal_update: {
    status: 'cancelled',
  },

  wrongStatus: {
    status: 'invalid',
  },

  inValidMealId: {
    quantity: 'x',
  },

  nikeOrder: {
    order: {
      meals: [
        { mealId: 'x', quantity: 'quantity' },
      ],
      address: 'london road andela',
    },
  },

  emptyOrder: {
  },

};

export default orderFaker;
