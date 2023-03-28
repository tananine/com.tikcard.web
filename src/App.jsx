import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useSelector } from 'react-redux';

import Popups from '@/utils/Popups';
import Drawers from '@/utils/Drawers';

import whiteTheme from '@/data/themes/white';
import darkTheme from '@/data/themes/dark';

import Layouts from '@/layouts';

import Login from '@/pages/auth/Login';

import ProfileHeader from '@/pages/profile/header';
import ProfileBody from '@/pages/profile/body';
import ProfileFooter from '@/pages/profile/Footer';
import ConnectionBody from '@/pages/connection/body';
import InsightHeader from '@/pages/insight/header';
import InsightBody from '@/pages/insight/body';
import ShareBody from '@/pages/share/body';

const createEmotionCache = createCache({ key: 'css', prepend: true });

import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const App = () => {
  const darkMode = useSelector((state) => state.controller.darkMode);

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
        break;
    }
  }, [page]);

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <CacheProvider value={createEmotionCache}>
        <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
          <CssBaseline />
          {CurrentPage()}
          {Popups()}
          {Drawers()}
        </ThemeProvider>
      </CacheProvider>
      <Toaster />
    </>
  );
};

export default App;
