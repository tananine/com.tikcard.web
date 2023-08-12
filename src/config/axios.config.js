import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://info.tikcard.me:9000';

const authToken = Cookies.get('authToken');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      window.location.replace('/app/login');
    } else {
      console.error(
        error.response?.data || 'เกิดข้อผิดพลาดที่ไม่มี response data'
      );
    }

    if (
      error.response?.data.showClientMessage &&
      error.response?.data.message
    ) {
      toast.error(error.response?.data.message);
    }

    return Promise.reject(error.response?.data);
  }
);
