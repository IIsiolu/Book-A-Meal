import { combineReducers } from 'redux';
import user from './user';
import imageUpload from './imageUploadReducer';
import createMeal from './createMeal';

export default combineReducers({
  user, imageUpload, createMeal,
});

