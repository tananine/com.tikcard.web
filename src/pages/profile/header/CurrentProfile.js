import { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Card, CircularProgress, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { switchProfileToggle } from 'stores/popup';
import { setProfiles } from 'stores/account';

import useGet from 'hooks/axios/useGet';
import profileServicePath from 'data/jsons/services/profile.service.json';

const Profile = ({ profileName, name }) => {
  return (
    <>
      <Box display="flex" gap={2} flexGrow={1} alignItems="center">
        <Avatar sx={{ width: 46, height: 46 }} />
        <Box height="100%">
          <Typography variant="h3" lineHeight="26.5px">
            {profileName}
          </Typography>
          <Typography variant="caption" fontSize={14}>{name}</Typography>
        </Box>
      </Box>
      <ExpandMoreIcon sx={{ fontSize: '38px' }} />
    </>
  );
};

const CurrentProfile = () => {
  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const dispatch = useDispatch();

  const [activationProfileData, setActivationProfileData] = useState();

  const [getProfileAction, getProfileLoading, getProfileData] = useGet(
    profileServicePath.getProfile
  );

  const switchProfileToggleHandler = useCallback(() => {
    if (getProfileData?.data.length > 0) {
      dispatch(setProfiles(getProfileData.data));
      dispatch(switchProfileToggle());
    }
  }, [dispatch, getProfileData]);

  useEffect(() => {
    getProfileAction().then((res) => {
      const profileData = res.data.filter((item) => {
        return item.profileId === profileActivationId;
      });
      setActivationProfileData(profileData[0]);
    });
  }, [getProfileAction, dispatch, profileActivationId]);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginTop: 0.5,
        height: 70,
      }}
      elevation={3}
      onClick={switchProfileToggleHandler}
    >
      {!getProfileData || getProfileLoading ? (
        <CircularProgress disableShrink />
      ) : (
        <Profile
          profileName={activationProfileData?.profileName}
          name={activationProfileData?.name}
        />
      )}
    </Card>
  );
};

export default CurrentProfile;
