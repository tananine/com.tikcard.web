import { useEffect } from 'react';
import createCache from '@emotion/cache';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import whiteTheme from '@/data/themes/white';
import darkTheme from '@/data/themes/dark';

import App from '@/App';
import Landing from '@/Landing';
import Scanner from '@/Scanner';

const createEmotionCache = createCache({ key: 'css', prepend: true });

import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const Router = () => {
  const darkMode = useSelector((state) => state.controller.darkMode);

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
          <Routes>
            <Route path="/app/:page" element={<App />} />
            <Route path="/scan/:scannerId" element={<Scanner />} />
            <Route path="/:linkId" element={<Landing />} />
            <Route path="*" element={<Navigate to="/app/profile" replace />} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
      <Toaster />
    </>
  );
};

export default Router;
