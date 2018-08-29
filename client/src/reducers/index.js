import { combineReducers } from 'redux';
import user from './user';
import imageUpload from './imageUploadReducer';
import createMeal from './createMeal';
import fetchMeals from './fetchMeals';
import isModalOpened from './isModalOpened';
import updateMeals from './updateMeal';
import deleteMeal from './deleteMeal';
import menu from './menu';
import menuForToday from './menuForToday';
import order from './order';
import isOverlayOpened from './isOverlayOpened';
import orderHistories from './orderHistory';
import userOrders from './userOrders';

/**
 * @summary turns an object whose values are different reducing functions
 *  into a single reducing function
 * @returns {function} combineReducers
 */
export default combineReducers({
  user,
  imageUpload,
  createMeal,
  fetchMeals,
  isModalOpened,
  updateMeals,
  deleteMeal,
  menu,
  menuForToday,
  order,
  orderHistories,
  userOrders,
  isOverlayOpened,
});
