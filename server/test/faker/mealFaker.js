import faker from 'faker';

const mealFaker = {
  newMeal: {
    name: faker.name.title(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),

  },
  newMeal2: {
    name: faker.name.findName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal1: {
    name: '',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal3: {
    name: faker.name.findName(),
    description: '',
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal4: {
    name: 'Eba',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal5: {
    name: 'Ewela',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal6: {
    name: 'Ewel',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
};

export default mealFaker;
