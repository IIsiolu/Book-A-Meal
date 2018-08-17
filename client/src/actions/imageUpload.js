import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const isLoading = state => ({
  type: actionTypes.IMAGE_LOADING,
  payload: state,
});

export const imageUploaded = link => ({
  type: actionTypes.IMAGE_UPLOADED,
  payload: link,
});
export const uploadError = error => ({
  type: actionTypes.IMAGE_UPLOAD_ERROR,
  payload: error,
});
// read on define plugin for webpack
export const imageUpload = (file, cb) => (dispatch) => {
  // Push all the axios request promise into a single array
  // Initial FormData
  dispatch(isLoading(true));
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', 'book-a-meal');
  formData.append('upload_preset', 'xeuxcwjy'); // Replace the preset name with your own
  formData.append('api_key', '322796628279911'); // Replace API key with your own Cloudinary key
  formData.append('timestamp', (Date.now() / 1000) || 0);

  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  return axios.post(
    'https://api.cloudinary.com/v1_1/dtioo2hf0/image/upload',
    formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    },
  ).then((response) => {
    const { data } = response;
    const fileURL = data.secure_url; // You should store this URL for future references in your app
    dispatch(imageUploaded(fileURL));
    dispatch(isLoading(false));
    cb(data.secure_url);
  }).catch((err) => {
    dispatch(uploadError(err));
  });
};
