import axios from 'axios';

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tags', 'book-a-meal');
  // Replace the preset name with your own
  formData.append('upload_preset', 'xeuxcwjy');
  // Replace API key with your own Cloudinary key
  formData.append('api_key', '322796628279911');
  formData.append('timestamp', (Date.now() / 1000) || 0);

  return axios.post(
    'https://api.cloudinary.com/v1_1/dtioo2hf0/image/upload',
    formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    },
  );
};

export default uploadImage;
