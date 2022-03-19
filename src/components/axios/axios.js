import axios from 'axios';
const theUrl = window.location.hostname;
const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${theUrl}:3001`,
});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
