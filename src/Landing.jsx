import { ThemeProvider, Container, CircularProgress } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useParams } from 'react-router-dom';

import whiteTheme from '@/data/themes/white';

import View from '@/pages/view';

import useGet from '@/hooks/axios/useGet';
import profileService from '@/data/jsons/services/profile.service.json';
import { useEffect } from 'react';

const createEmotionCache = createCache({ key: 'css', prepend: true });

const Landing = () => {
  const [getProfileAction, getProfileLoading, getProfileData] = useGet(
    profileService.useLink
  );

  const { linkId } = useParams();

  useEffect(() => {
    getProfileAction(linkId);
  }, [getProfileAction, linkId]);

  return (
    <CacheProvider value={createEmotionCache}>
      <ThemeProvider theme={whiteTheme}>
        <CssBaseline />
        <Container>
          {!getProfileData || getProfileLoading ? (
            <CircularProgress disableShrink />
          ) : (
            <View profileData={getProfileData.data} />
          )}
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Landing;
