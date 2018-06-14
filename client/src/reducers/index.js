import { combineReducers } from 'redux';
import user from './user';
import imageUpload from './imageUploadReducer';
import createMeal from './createMeal';
import fetchMeals from './fetchMeals';
import isModalOpened from './isModalOpened';
import updateMeals from './updateMeal';
import deleteMeal from './deleteMeal';

export default combineReducers({
  user, imageUpload, createMeal, fetchMeals, isModalOpened, updateMeals, deleteMeal,
});

