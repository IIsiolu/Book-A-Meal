import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  isloading: false,
  success: false,
  isError: false,
  error: null,
  orders: {},
};
const userOrders = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCHING_USER_ORDERS:
      return {
        ...state,
        isloading: action.payload,
      };
    case actionsTypes.USER_ORDERS:
      return {
        ...state,
        isloading: false,
        error: null,
        isError: false,
        orders: action.payload,
      };
    case actionsTypes.USER_ORDER_ERRORR:
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

export default userOrders;
