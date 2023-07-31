import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useGet from '@/hooks/axios/useGet';
import usePost from '@/hooks/axios/usePost';
import deviceServicePath from '@/data/jsons/services/device.service.json';
import authServicePath from '@/data/jsons/services/auth.service.json';

import LinkIcon from '@mui/icons-material/Link';

const Scanner = () => {
  const [showActivate, setShowActivate] = useState(false);
  const [tikDeviceId, setTikDeviceId] = useState(false);

  const [redirectAction] = useGet(deviceServicePath.getRedirect, true);
  const [activationAction, activationLoading] = usePost(
    deviceServicePath.activation,
    false
  );

  const navigate = useNavigate();
  const { scannerId, key } = useParams();

  const [email, setEmail] = useState(null);

  const [accountDataAction] = useGet(authServicePath.accountData, true);
  useEffect(() => {
    accountDataAction().then((res) => {
      const email = res.data.email;
      setEmail(email);
    });
  }, []);

  const checkLogin = () => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate(`/app/login?redirect=/scan/${scannerId}/${key}&connected=true`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    redirectAction(`${scannerId}/${key}`).then((res) => {
      if (res.data?.setAccountAction) {
        checkLogin();
        setTikDeviceId(res.data.tikDeviceId);
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

  const changeAccount = () => {
    navigate(`/app/login?redirect=/scan/${scannerId}/${key}&connected=true`, {
      replace: true,
    });
  };

  if (showActivate) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box padding={2}>
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h4" marginBottom={4}>
              เชื่อมต่อกับ Tik Device
            </Typography>
            <Card variant="outlined" sx={{ display: 'grid', gap: 1 }}>
              <Typography>Email : {email}</Typography>
              <LinkIcon sx={{ marginX: 'auto' }} />
              <Typography>Tik Device ID : {tikDeviceId}</Typography>
            </Card>
          </Box>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={activation}
            loading={activationLoading}
            sx={{ marginBottom: 2 }}
          >
            เชื่อมต่อ
          </LoadingButton>
          <Button fullWidth onClick={changeAccount}>
            เปลี่ยนบัญชี
          </Button>
        </Box>
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
