import { combineReducers } from 'redux';
import user from './user';
import imageUpload from './imageUploadReducer';
import isModalOpened from './isModalOpened';
import menu from './menu';
import order from './order';
import isOverlayOpened from './isOverlayOpened';
import orderHistories from './orderHistory';
import apiResponse from './apiResponse';
import spinner from './spinner';
import meals from './meals';

/**
 * @summary turns an object whose values are different reducing functions
 *  into a single reducing function
 * @returns {function} combineReducers
 */
export default combineReducers({
  user,
  imageUpload,
  meals,
  isModalOpened,
  menu,
  order,
  orderHistories,
  isOverlayOpened,
  apiResponse,
  spinner,
});
