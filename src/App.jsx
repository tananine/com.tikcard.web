import { useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import Popups from '@/utils/Popups';
import Drawers from '@/utils/Drawers';

import Layouts from '@/layouts';

import Login from '@/pages/auth/Login';

import ProfileHeader from '@/pages/profile/header';
import ProfileBody from '@/pages/profile/body';
import ProfileFooter from '@/pages/profile/Footer';
import ConnectionBody from '@/pages/connection/body';
import InsightHeader from '@/pages/insight/header';
import InsightBody from '@/pages/insight/body';
import ShareBody from '@/pages/share/body';

const App = () => {
  const { page } = useParams();

  const CurrentPage = useCallback(() => {
    switch (page) {
      case 'login':
        return <Login />;
      case 'profile':
        return (
          <Layouts
            header={<ProfileHeader />}
            body={<ProfileBody />}
            footer={<ProfileFooter />}
          />
        );
      case 'share':
        return <Layouts body={<ShareBody />} />;
      case 'insight':
        return <Layouts header={<InsightHeader />} body={<InsightBody />} />;
      case 'connection':
        return <Layouts body={<ConnectionBody />} />;
      default:
        return <Navigate to="/app/profile" replace />;
    }
  }, [page]);

  return (
    <>
      {CurrentPage()}
      {Popups()}
      {Drawers()}
    </>
  );
};

export default App;
