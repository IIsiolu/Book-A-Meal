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
  newCenter6: {
    name: 'center name updated',
    city: faker.address.city(),
    address: faker.address.streetAddress(),
    facility: ['car pack', 'free wifi', 'sound system'],
    about: 'this is a test',
    availability: 'availability',
    imageurl: 'pictue.png',
    publicUrlId: 'picture'
  },
  newCenter33: {
    name: faker.name.findName(),
    city: faker.address.city(),
    address: 'no 3 adestreet',
    facility: faker.random.arrayElement(),
    about: 'this is a test',
    availability: 'availability',
    imageurl: '',
    publicUrlId: 'pictue.png'
  },
};

export default mealFaker;
