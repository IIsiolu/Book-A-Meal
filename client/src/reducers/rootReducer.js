import { combineReducers } from 'redux';
import user from './user';
import imageUpload from './imageUpload';
import menu from './menu';
import order from './order';
import isOverlayOpened from './isOverlayOpened';
import orderHistory from './orderHistory';
import apiResponse from './apiResponse';
import spinner from './spinner';
import meals from './meals';
import { LOGOUT } from '../actions/actionsTypes';

/**
 * @summary turns an object whose values are different reducing functions
 *  into a single reducing function
 * @returns {function} combineReducers
 */
const reducers = combineReducers({
  user,
  imageUpload,
  meals,
  menu,
  order,
  orderHistory,
  isOverlayOpened,
  apiResponse,
  spinner,
});

const rootReducer = (state, action) => {
  let updatedState = { ...state };

  if (action.type === LOGOUT) {
    updatedState = undefined;
  }

  return reducers(updatedState, action);
};

export default rootReducer;
