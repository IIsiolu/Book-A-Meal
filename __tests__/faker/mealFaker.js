import faker from 'faker';

const mealFaker = {
  amala: {
    name: 'Amala',
    description: 'very cool nigerian meal',
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  wrongMeal: {
    id: 1,
    name: 'Eba',
    description: 'very cool nigerian meal',
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  caramel_edit: {
    name: 'cereal',
    price: 700,
  },
};

export default mealFaker;
