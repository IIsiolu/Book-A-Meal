import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  loading: false,
  success: false,
  error: null,
  orderHistory: {},
  isError: false,
};
const orderHistories = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCHING_ORDER_HISTORY:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.GET_ORDER_HISTORY:
      return {
        ...state,
        loading: false,
        error: null,
        orderHistory: action.payload,
      };
    case actionsTypes.ORDER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default orderHistories;
