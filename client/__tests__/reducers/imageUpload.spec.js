import {
  IMAGE_LOADING, IMAGE_UPLOADED,
  IMAGE_UPLOAD_ERROR,
} from '../../src/actions/actionsTypes';
import imageUpload from '../../src/reducers/imageUpload';
import { imageInitState } from '../../src/reducers/initState';

describe('Image Upload Reducer Reducer', () => {
  it(
    'returns initial state',
    () => {
      expect(imageUpload(undefined, {})).toEqual(imageInitState);
    },
  );

  it(
    'should set success to false when IMAGE_UPLOAD_ERROR is dispatched ',
    () => {
      const action = {
        type: IMAGE_UPLOAD_ERROR,
        payload: 'image error',
      };
      const newState = imageUpload(imageInitState, action);
      expect(newState.success).toBe(false);
      expect(newState.error).toEqual('image error');
    },
  );

  it('should set image url when IMAGE_UPLOADED is dispatched', () => {
    const action = {
      type: IMAGE_UPLOADED,
      payload: 'http://www.image.com',
    };
    const newState = imageUpload(imageInitState, action);
    expect(newState.success).toBe(true);
    expect(newState.imageUrl).toEqual('http://www.image.com');
  });

  it('should set loading state when IMAGE_LOADING is dispatched', () => {
    const action = {
      type: IMAGE_LOADING,
      payload: true,
    };
    const newState = imageUpload(imageInitState, action);
    expect(newState.loading).toBe(true);
  });
});
