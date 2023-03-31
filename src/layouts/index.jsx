import { Container, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActivationProfile } from '@/stores/account';
import { setProfileInUse } from '@/stores/controller';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import Header from '@/layouts/Header';
import Body from '@/layouts/Body';
import Footer from '@/layouts/Footer';

import Welcome from '@/pages/welcome';

import Loading from '@/pages/loading';

const Application = ({ header, body, footer }) => {
  const dispatch = useDispatch();

  const [showWelcomePage, setShowWelcomePage] = useState(false);

  const reloadLayoutsIndex = useSelector((state) => state.reload.layoutsIndex);

  const [getActivationAction, getActivationLoading, getActivationData] = useGet(
    profileServicePath.getActivation
  );

  useEffect(() => {
    getActivationAction().then((res) => {
      const primary = res.data.primary;
      const secondary = res.data.secondary;
      if (!primary) {
        setShowWelcomePage(true);
      } else {
        setShowWelcomePage(false);
      }
      dispatch(
        setActivationProfile({
          primaryProfile: primary,
          secondaryProfile: secondary,
        })
      );
      dispatch(
        setProfileInUse({
          profileState: 'primary',
          profileId: primary,
        })
      );
    });
  }, [getActivationAction, dispatch, reloadLayoutsIndex]);

  if (showWelcomePage) {
    return (
      <>
        <Container>
          <Paper elevation={3}>
            <Welcome />
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Paper elevation={3}>
          {!getActivationData || getActivationLoading ? (
            <Loading />
          ) : (
            <>
              <Header component={header} />
              <Body component={body} />
              <Footer component={footer} />
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Application;
