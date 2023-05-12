import { Container, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActivationProfile, setAccount } from '@/stores/account';
import { setProfileInUse } from '@/stores/controller';
import { setDevice, setIsScanDouble } from '@/stores/device';

import useGet from '@/hooks/axios/useGet';
import accountServicePath from '@/data/jsons/services/auth.service.json';
import profileServicePath from '@/data/jsons/services/profile.service.json';
import deviceServicePath from '@/data/jsons/services/device.service.json';

import Header from '@/layouts/Header';
import Body from '@/layouts/Body';
import Footer from '@/layouts/Footer';

import Welcome from '@/pages/welcome';

import Loading from '@/pages/loading';

import Popups from '@/utils/Popups';
import Drawers from '@/utils/Drawers';
import BackdropOnFetch from '@/components/BackdropOnFetch';

const Application = ({ header, body, footer, tutorial }) => {
  const dispatch = useDispatch();

  const [showWelcomePage, setShowWelcomePage] = useState(false);

  const reloadLayoutsIndex = useSelector((state) => state.reload.layoutsIndex);

  const [getActivationAction, getActivationLoading] = useGet(
    profileServicePath.getActivation,
    true
  );
  const [getDeviceAllAction, getDeviceAllLoading] = useGet(
    deviceServicePath.getDeviceAll,
    true
  );
  const [accountDataAction] = useGet(accountServicePath.accountData, true);

  useEffect(() => {
    accountDataAction().then((res) => {
      const email = res.data.email;
      const tutorial = res.data.tutorial;
      dispatch(setAccount({ email: email, tutorial: tutorial }));
    });
    getDeviceAllAction().then((res) => {
      if (res.data.some((item) => item.DeviceType.typeScan === 'double')) {
        dispatch(setIsScanDouble(true));
      }
      dispatch(setDevice(res.data));
    });
  }, []);

  useEffect(() => {
    getActivationAction().then((res) => {
      const primary = res.data.activation.primary;
      const secondary = res.data.activation.secondary;
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
  }, [reloadLayoutsIndex]);

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

  if (getActivationLoading && getDeviceAllLoading) {
    return (
      <Container>
        <Paper elevation={3}>
          <Loading />
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Paper elevation={3}>
          <Header component={header} />
          <Body component={body} />
          <Footer component={footer} />
        </Paper>
      </Container>
      {Popups()}
      {Drawers()}
      {tutorial}
      <BackdropOnFetch />
    </>
  );
};

export default Application;
