import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.17:8080';

const authToken = Cookies.get('authToken');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      window.location.replace('/app/login');
    }
    return Promise.reject(error);
  }
);
