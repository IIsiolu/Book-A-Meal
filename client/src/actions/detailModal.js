import * as actionTypes from './actionsTypes';

const isOverlayOpened = (opened, id) => (dispatch) => {
  dispatch({
    type: actionTypes.IS_OVERLAY_OPENED,
    payload: opened,
  });
  return dispatch({
    type: actionTypes.IS_OVERLAY_ID,
    payload: id,
  });
};
export default isOverlayOpened;

