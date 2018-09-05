import { API_SUCCESS_STATE, API_ERR_STATE } from './actionsTypes';

export const changeErrState = () => dispatch => (
  dispatch({
    type: API_ERR_STATE,
    payload: false,
  })
);

export const changeSuccessState = () => dispatch => (
  dispatch({
    type: API_SUCCESS_STATE,
    payload: false,
  })
);

