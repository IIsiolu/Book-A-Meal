import * as actionsTypes from '../actions/actionsTypes';
import { profileState } from './initState';

const userOrders = (state = profileState, action) => {
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
        orders: action.payload.data,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
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
