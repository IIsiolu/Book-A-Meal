import React from 'react';
import axios from 'axios';

const ImageUpload = (file) => {
  // Push all the axios request promise into a single array
  // Initial FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', 'codeinfuse, medium, gist');
  formData.append('upload_preset', 'xeuxcwjy'); // Replace the preset name with your own
  formData.append('api_key', '322796628279911'); // Replace API key with your own Cloudinary key
  formData.append('timestamp', (Date.now() / 1000) | 0);

  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  return axios.post('https://api.cloudinary.com/v1_1/dtioo2hf0/image/upload',
   formData, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  }).then((response) => {
    const {data} = response;
    const fileURL = data.secure_url; // You should store this URL for future references in your app
  }).catch((err) => {
    console.log(err);
  });
};


export default ImageUpload;
