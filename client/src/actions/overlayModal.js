import { IS_OVERLAY_OPENED, IS_OVERLAY_ID } from './actionsTypes';

const isOverlayOpened = (opened, id) => (dispatch) => {
  dispatch({
    type: IS_OVERLAY_OPENED,
    payload: opened,
  });
  return dispatch({
    type: IS_OVERLAY_ID,
    payload: id,
  });
};
export default isOverlayOpened;
