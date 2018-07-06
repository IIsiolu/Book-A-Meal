import * as actionsTypes from '../actions/actionsTypes';

const init = {
  open: false,
  id: null,
};
const isOverlayOpened = (state = init, action) => {
  switch (action.type) {
    case actionsTypes.IS_OVERLAY_OPENED:
      return {
        ...state,
        open: action.payload,
      };
    case actionsTypes.IS_OVERLAY_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};
export default isOverlayOpened;
