import { START_LOADER } from '../../src/actions/actionsTypes';
import spinner from '../../src/reducers/spinner';
import { spinnerState } from '../../src/reducers/initState';

describe('Spinner Reducer', () => {
  it(
    'returns initial state',
    () => {
      expect(spinner(undefined, {})).toEqual(spinnerState);
    },
  );

  it(
    'should set isLoading to true when START_LOADER is dispatched',
    () => {
      const action = {
        type: START_LOADER,
        payload: true,
      };
      const newState = spinner(spinnerState, action);
      expect(newState.isLoading).toBe(true);
    },
  );
});
