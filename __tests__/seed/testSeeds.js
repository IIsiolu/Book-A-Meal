import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Meal, Order, OrderMeal, Menu } from '../../server/models';


const users = [
  {
    id: 20,
    firstname: 'yummy',
    email: 'yummyKitchen@gmail.com',
    lastname: 'Kitchen',
    role: 'caterer',
    password: 'mykitchen',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 21,
    firstname: 'donald',
    email: 'donaldKitchen@gmail.com',
    lastname: 'Kitchen',
    role: 'caterer',
    password: 'mykitchen',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 22,
    firstname: 'kunle',
    email: 'kunle@gmail.com',
    lastname: 'Kitchen',
    role: 'user',
    password: 'userpassword',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const hashPassword = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};

const testUsers = [
  {
    id: 50,
    firstname: 'walex',
    email: 'walenco@gmail.com',
    lastname: 'dikana',
    role: 'user',
    password: hashPassword('mykitchen'),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 51,
    firstname: 'dika',
    email: 'donaldKitchen@gmail.com',
    lastname: 'chi',
    role: 'user',
    password: 'mykitchen',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export const generateToken = (id, role) => {
  const { SECRET } = process.env;
  const token = jwt.sign({
    id,
    role,
  }, SECRET, { expiresIn: '500h' });
  return token;
};

export const yummyKitchenToken = generateToken(1, users[0].role);

export const donaldKitchenToken = generateToken(2, users[1].role);

export const invalidIdToken = generateToken('x', 'caterer');

export const invalidUserToken = generateToken('x', 'user');

export const kunleToken = generateToken(3, users[2].role);


const meals = [
  {

    name: 'caramel',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
  {

    name: 'basil',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
  {
    // id: 3,
    name: 'gouda',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
  {
    id: 300,
    name: 'longre',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
];

const mondayMeals = [
  {
    id: 211,
    name: 'bronance',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 20,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
  {
    id: 212,
    name: 'longresco',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 20,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
];

const mondayMenu = [
  {
    id: 91,
    name: 'bronance',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 72,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
  {
    id: 92,
    name: 'longresco',
    description: 'very cool for breakfast',
    price: 5000,
    image: 'https://www.image.jpg',
    userId: 72,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deletedAt: null,
  },
];

const menus = [
  {
    userId: 72,
    mealId: [91, 92],
    date: '2018-10-17',
  },
  {
    userId: 72,
    mealId: [91, 92],
    date: '2018-01-11',
  },
];

const orders = [
  {
    address: 'andelean way',
    userId: 1,
  },
  {
    address: 'way',
    userId: 1,
  },
];

const orderMeal = [
  {
    status: 'pending',
    orderId: 1,
    mealId: 1,
    quantity: 10,
  },
  {
    status: 'pending',
    orderId: 1,
    mealId: 2,
    quantity: 15,
  },
  {
    status: 'cancelled',
    orderId: 1,
    mealId: 1,
    quantity: 15,
  },
];


export const insertUserSeed = () => (
  User.bulkCreate(users)
);

export const insertOrderSeed = () => (
  Order.bulkCreate(orders)
);

export const insertTestUser = () => (
  User.bulkCreate(testUsers)
);

export const insertOrderMeal = () => (
  OrderMeal.bulkCreate(orderMeal)
);

export const insertMealSeed = () => (
  Meal.bulkCreate(meals)
);

export const insertMenuSeed = () => (
  Menu.bulkCreate(menus)
);

export const mondayMeal = () => (
  Meal.bulkCreate(mondayMeals)
);

export const mondayMenus = () => (
  Meal.bulkCreate(mondayMenu)
);
