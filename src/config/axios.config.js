import Cookies from 'js-cookie';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const authToken = Cookies.get('authToken');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      window.location.replace('/app/login');
    } else {
      console.error(
        error?.response?.data || 'เกิดข้อผิดพลาดที่ไม่มี response data'
      );
    }
    return Promise.reject(error);
  }
);
