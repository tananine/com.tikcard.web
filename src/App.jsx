import { useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Layouts from '@/layouts';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';

import ProfileHeader from '@/pages/profile/header';
import ProfileBody from '@/pages/profile/body';
import ProfileFooter from '@/pages/profile/Footer';
import ConnectionBody from '@/pages/connection/body';
import ShareBody from '@/pages/share/body';

import Tutorial from '@/utils/turtorial';

const App = () => {
  const authToken = Cookies.get('authToken');

  const { page } = useParams();

  const CurrentPage = useCallback(() => {
    switch (page) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'profile':
        return (
          <Layouts
            header={<ProfileHeader />}
            body={<ProfileBody />}
            footer={<ProfileFooter />}
            tutorial={<Tutorial step="profilePage" />}
          />
        );
      case 'share':
        return <Layouts body={<ShareBody />} />;
      case 'connection':
        return <Layouts body={<ConnectionBody />} />;
      default:
        return <Navigate to="/app/profile" replace />;
    }
  }, [page]);

  if (!authToken && page !== 'login' && page !== 'register') {
    return window.location.replace('/app/login');
  }

  return <>{CurrentPage()}</>;
};

export default App;
