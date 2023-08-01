import {
  Container,
  CircularProgress,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import View from '@/pages/view';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';
import { useEffect } from 'react';

const Landing = () => {
  const [getProfileAction, getProfileLoading, getProfileData] = useGet(
    profileServicePath.useLink,
    true
  );

  const { linkId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
    document.getElementsByTagName('html')[0].style.height = 'auto';
  }, []);

  useEffect(() => {
    getProfileAction(linkId);
  }, [getProfileAction, linkId]);

  if (!getProfileData && !getProfileLoading) {
    return (
      <Container>
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          height="100vh"
          padding={2}
        >
          <Typography variant="h2" marginBottom={2}>
            404
          </Typography>
          <Typography marginBottom={2}>
            ไม่พบนามบัตรนี้หรือนามบัตรนี้ถูกเปลี่ยนแล้ว
          </Typography>
          <Button onClick={() => navigate('/app/login', { replace: true })}>
            กลับ
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      {!getProfileData || getProfileLoading ? (
        <Box textAlign="center" marginTop={6}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <View profileData={getProfileData.data} />
      )}
    </Container>
  );
};

export default Landing;
