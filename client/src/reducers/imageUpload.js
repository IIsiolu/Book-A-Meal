import isEmpty from 'lodash/isEmpty';
import * as actionsTypes from '../actions/actionsTypes';
// loading state
// most suitable things to have in a token
const initialState = {
  loading: false,
  success: false,
  error: null,
  imageUrl: null,
  id: null,
};
const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.IMAGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.IMAGE_UPLOADED:
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        imageUrl: action.payload,
      };
    case actionsTypes.IMAGE_ID:
      return {
        ...state,
        id: action.payload,
      };
    case actionsTypes.IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
        imageUrl: null,
      };
    default:
      return state;
  }
};

export default imageUpload;
