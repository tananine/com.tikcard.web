import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8080';

const authToken = Cookies.get('authToken');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error?.response?.status) {
      case 401:
        window.location.replace('/app/login');
        break;
      default:
        toast.error(error?.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
    return Promise.reject(error);
  }
);
