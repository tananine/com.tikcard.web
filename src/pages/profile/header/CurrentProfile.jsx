import { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Typography,
  Badge,
  Skeleton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { switchProfileToggle } from '@/stores/popup';
import { setProfiles } from '@/stores/account';
import { Img } from 'react-image';

import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';

const Profile = ({
  profileImage,
  logoImage,
  cardName,
  name,
  showSelectProfileText,
}) => {
  if (showSelectProfileText) {
    return <>เลือกใช้งานนามบัตร</>;
  }
  return (
    <>
      <Box display="flex" gap={2} flexGrow={1} alignItems="center">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Avatar sx={{ width: 26, height: 26, border: '2px solid #ffffff' }}>
              <Img
                src={logoImage}
                alt=""
                width="100%"
                height="100%"
                loader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="100%"
                    height="100%"
                  />
                }
                unloader={
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="100%"
                    height="100%"
                  />
                }
              />
            </Avatar>
          }
        >
          <Avatar sx={{ width: 46, height: 46 }}>
            <Img
              src={profileImage}
              alt=""
              width="100%"
              height="100%"
              loader={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="100%"
                />
              }
              unloader={
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="100%"
                />
              }
            />
          </Avatar>
        </Badge>
        <Box height="100%">
          <Typography variant="h3" lineHeight="26.5px">
            {cardName}
          </Typography>
          <Typography variant="caption" fontSize={14}>
            {name}
          </Typography>
        </Box>
      </Box>
      <ExpandMoreIcon sx={{ fontSize: '38px' }} />
    </>
  );
};

const CurrentProfile = ({ profileActivationId }) => {
  const reloadCurrentProfile = useSelector(
    (state) => state.reload.currentProfile
  );

  const [showSelectProfileText, setShowSelectProfileText] = useState(false);

  const dispatch = useDispatch();

  const [activationProfileData, setActivationProfileData] = useState();

  const [getProfileAction, getProfileLoading, getProfileData] = useGet(
    profileServicePath.getProfile,
    true
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
      if (!profileData[0]) {
        setShowSelectProfileText(true);
      } else {
        setShowSelectProfileText(false);
        setActivationProfileData(profileData[0]);
      }
    });
  }, [getProfileAction, dispatch, profileActivationId, reloadCurrentProfile]);

  return (
    <Card
      id="select-profile-card"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginTop: 0.5,
        height: 70,
        borderRadius: '25px',
      }}
      elevation={3}
      onClick={switchProfileToggleHandler}
    >
      {!getProfileData || getProfileLoading ? (
        <CircularProgress disableShrink />
      ) : (
        <Profile
          profileImage={activationProfileData?.profileImage}
          logoImage={activationProfileData?.logoImage}
          cardName={activationProfileData?.cardName}
          name={activationProfileData?.name}
          showSelectProfileText={showSelectProfileText}
        />
      )}
    </Card>
  );
};

export default CurrentProfile;
