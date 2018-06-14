import * as actionsTypes from '../actions/actionsTypes';

const init = {
  open: false,
  id: null,
};
const isModalOpened = (state = init, action) => {
  switch (action.type) {
    case actionsTypes.IS_MODAL_OPENED:
      return {
        ...state,
        open: action.payload,
      };
    case actionsTypes.MODAL_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};
export default isModalOpened;
