import { IS_MODAL_OPENED, MODAL_ID } from './actionsTypes';

const isModalOpened = (shouldOpen, id) => (dispatch) => {
  dispatch({
    type: IS_MODAL_OPENED,
    payload: shouldOpen,
  });
  return dispatch({
    type: MODAL_ID,
    payload: id,
  });
};

export default isModalOpened;

