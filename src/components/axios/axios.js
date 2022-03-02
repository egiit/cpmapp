import axios from 'axios';
const theUrl = window.location.hostname;
const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${theUrl}:3001`,
});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
export default instance;
