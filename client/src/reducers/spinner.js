import { START_LOADER } from '../actions/actionsTypes';
import { spinnerState } from './initState';

const spinner = (state = spinnerState, action) => {
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default spinner;
