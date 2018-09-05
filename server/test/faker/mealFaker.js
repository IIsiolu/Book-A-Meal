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
    name: 'yam',
    description: 'very wonderful meal',
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal5: {
    name: 'Jollof',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
  newMeal6: {
    name: 'spagetti',
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
  },
};

export default mealFaker;
