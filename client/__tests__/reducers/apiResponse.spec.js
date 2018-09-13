import {
  API_ERR_RESPONSE, API_SUCCESS_RESPONSE,
  API_SUCCESS_STATE, API_ERR_STATE,
} from '../../src/actions/actionsTypes';
import apiResponse from '../../src/reducers/apiResponse';
import { apiResponseState } from '../../src/reducers/initState';

describe('API Response Reducer', () => {
  it(
    'returns initial state',
    () => {
      expect(apiResponse(undefined, {})).toEqual(apiResponseState);
    },
  );

  it(
    'should set isError to true when API_ERR_RESPONSE is dispatched ',
    () => {
      const action = {
        type: API_ERR_RESPONSE,
        payload: 'api error',
      };
      const newState = apiResponse(apiResponseState, action);
      expect(newState.isError).toBe(true);
      expect(newState.error).toEqual('api error');
    },
  );

  it('should change isError state when API_ERR_STATE is dispatched', () => {
    const action = {
      type: API_ERR_STATE,
      payload: false,
    };
    const newState = apiResponse(apiResponseState, action);
    expect(newState.isError).toBe(false);
  });

  it('should set isSuccesful to true when API_SUCCESS_RESPONSE is dispatched', () => {
    const action = {
      type: API_SUCCESS_RESPONSE,
      payload: 'successfully created',
    };
    const newState = apiResponse(apiResponseState, action);
    expect(newState.isSuccessful).toBe(true);
    expect(newState.message).toEqual('successfully created');
  });

  it('sets isSuccessful to false when API_SUCCESS_STATE is dispatched ', () => {
    const action = {
      type: API_SUCCESS_STATE,
      payload: false,
    };
    const newState = apiResponse(apiResponseState, action);
    expect(newState.isSuccessful).toBe(false);
  });
});
