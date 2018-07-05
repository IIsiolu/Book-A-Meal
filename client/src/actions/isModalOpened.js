import * as actionTypes from './actionsTypes';

const isModalOpened = (shouldOpen, id) => (dispatch) => {
  dispatch({
    type: actionTypes.IS_MODAL_OPENED,
    payload: shouldOpen,
  });
  return dispatch({
    type: actionTypes.MODAL_ID,
    payload: id,
  });
};

export default isModalOpened;

