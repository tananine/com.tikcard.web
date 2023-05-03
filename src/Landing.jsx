import { Container, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

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

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
    document.getElementsByTagName('html')[0].style.height = 'auto';
  }, []);

  useEffect(() => {
    getProfileAction(linkId);
  }, [getProfileAction, linkId]);

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
