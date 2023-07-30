import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container } from '@mui/material';

import useGet from '@/hooks/axios/useGet';
import usePost from '@/hooks/axios/usePost';
import deviceServicePath from '@/data/jsons/services/device.service.json';

const Scanner = () => {
  const [showActivate, setShowActivate] = useState(false);

  const [redirectAction] = useGet(deviceServicePath.getRedirect, true);
  const [activationAction] = usePost(deviceServicePath.activation, false);

  const navigate = useNavigate();
  const { scannerId, key } = useParams();

  const checkLogin = () => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate(`/app/login?redirect=/scan/${scannerId}/${key}&connect=1`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    redirectAction(`${scannerId}/${key}`).then((res) => {
      if (res.data?.setAccountAction) {
        checkLogin();
        return setShowActivate(true);
      }
      navigate(`/${res.data.linkId}`, { replace: true });
    });
  }, []);

  const activation = () => {
    const body = {
      scannerId: scannerId,
      key: key,
    };
    activationAction(body).then(() => {
      window.location.reload();
    });
  };

  if (showActivate) {
    return (
      <Container>
        <Box>Connect to this account</Box>
        <Button onClick={activation}>Connect</Button>
      </Container>
    );
  }

  return (
    <Box textAlign="center" marginTop={6}>
      <CircularProgress disableShrink />
    </Box>
  );
};

export default Scanner;
