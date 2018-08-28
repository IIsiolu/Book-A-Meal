import instance from './instance';

/**
 * @description method to make api requests
 * @function api
 * @param {string} url - the url
 * @param {string} method - http method
 * @param {object} obj - data to be sent
 * @returns {object} data - response
 */
const api = async (url, method, obj = {}) => {
  try {
    const response = await instance[method](url, obj);
    const { data } = response;
    return data;
  } catch (err) {
    let error = null;
    if (err.response) {
      error = (err.response.data.errorMessage) ?
        err.response.data.errorMessage[0] : err.response.data.message;
      throw (error);
    }

    error = 'propblem connecting to server';
    throw (error);
  }
};

export default api;
