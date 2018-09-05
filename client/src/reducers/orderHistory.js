import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  loading: false,
  success: false,
  error: null,
  orders: [],
  orderHistory: [],
  isError: false,
  pagination: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    totalCount: 0,
  },
};
const orderHistories = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCHING_ORDER_HISTORY:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.FETCHING_USER_ORDERS:
      return {
        ...state,
        loading: action.payload,
      };
    case actionsTypes.USER_ORDERS:
      return {
        ...state,
        loading: false,
        error: null,
        isError: false,
        orders: action.payload.data,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case actionsTypes.GET_ORDER_HISTORY:
      return {
        ...state,
        loading: false,
        error: null,
        orderHistory: action.payload.data,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination.pagination,
        },
      };
    case actionsTypes.RECENT_ORDER:
      return {
        ...state,
        orderHistory: [action.payload, ...state.orderHistory],
      };
    case actionsTypes.ORDER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isError: true,
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

export default orderHistories;
