import {
  API_ERR_RESPONSE, API_SUCCESS_RESPONSE,
  API_ERR_STATE, API_SUCCESS_STATE,
} from '../actions/actionsTypes';
import { apiResponseState } from './initState';

const apiResponse = (state = apiResponseState, action) => {
  switch (action.type) {
    case API_ERR_RESPONSE:
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
    case API_ERR_STATE:
      return {
        ...state,
        isError: action.payload,
      };
    case API_SUCCESS_RESPONSE:
      return {
        ...state,
        isSuccessful: true,
        message: action.payload,
      };
    case API_SUCCESS_STATE:
      return {
        ...state,
        isSuccessful: action.payload,
      };
    default:
      return state;
  }
};

export default apiResponse;
