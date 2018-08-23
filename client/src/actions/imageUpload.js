import * as actionTypes from './actionsTypes';
import uploadImage from '../utils/uploadImage';

export const isLoading = state => ({
  type: actionTypes.IMAGE_LOADING,
  payload: state,
});

export const mealImage = url => ({
  type: actionTypes.ADDED_MEAL_IMAGE,
  payload: url,
});

export const imageUploaded = link => ({
  type: actionTypes.IMAGE_UPLOADED,
  payload: link,
});

export const uploadError = error => ({
  type: actionTypes.IMAGE_UPLOAD_ERROR,
  payload: error,
});

export const addMealImgErr = error => ({
  type: actionTypes.ADD_MEAL_IMAGE_ERR,
  payload: error,
});

/**
 * @function imageUpload
 * @param {string} file
 * @param {string} caller
 * @returns {void}
 */
export const imageUpload = (file, caller) => async (dispatch) => {
  try {
    const response = await uploadImage(file);
    const { data } = response;
    const fileURL = data.secure_url;
    if (fileURL && caller === 'addMeal') {
      dispatch(mealImage(fileURL));
      dispatch(isLoading(false));
    }
  } catch (err) {
    dispatch(addMealImgErr(err));
    dispatch(isLoading(false));
  }
};

/**
 * @function clearMealImage
 * @returns {object} dispatch
 */
export const clearMealImage = () => dispatch => (
  dispatch({
    type: actionTypes.CLEAR_MEAL_IMAGE,
  })
);
