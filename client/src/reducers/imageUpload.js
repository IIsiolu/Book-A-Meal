import isEmpty from 'lodash/isEmpty';
import * as actionsTypes from '../actions/actionsTypes';
import { imageInitState } from './initState';

const imageUpload = (state = imageInitState, action) => {
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
