import { useState, useCallback, useEffect } from 'react';
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { useSelector, useDispatch } from 'react-redux';
import { setProfileInUse } from '@/stores/controller';
import { reloadCurrentProfile, reloadContactList } from '@/stores/reload';

import pagePath from '@/data/jsons/page-path.json';

import Tutorial from '@/utils/turtorial';

import profile1sim from '@/assets/svg/profile-1-sim.svg';
import profile2sim from '@/assets/svg/profile-2-sim.svg';

const ProfilePart = () => {
  const profileActivation = useSelector((state) => state.account.activation);
  const isScanDouble = useSelector((state) => state.device.isScanDouble);

  const navigate = useNavigate();

  const [type, setType] = useState('primary');
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const reloadWhenDuplicateProfileState = () => {
    if (
      profileActivation.primaryProfile === profileActivation.secondaryProfile
    ) {
      dispatch(reloadCurrentProfile());
      dispatch(reloadContactList());
    }
  };

  const setPrimary = useCallback(() => {
    setType('primary');
    dispatch(
      setProfileInUse({
        profileState: 'primary',
        profileId: profileActivation.primaryProfile,
      })
    );
    navigate('/app/profile', { replace: true });
    reloadWhenDuplicateProfileState();
  }, [dispatch, profileActivation]);

  const setSecondary = useCallback(() => {
    setType('secondary');
    dispatch(
      setProfileInUse({
        profileState: 'secondary',
        profileId: profileActivation.secondaryProfile,
      })
    );
    navigate('/app/profile', { replace: true });
    reloadWhenDuplicateProfileState();
  }, [dispatch, profileActivation]);

  const changeActiveScan = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (type === 'primary') {
      setPrimary();
    } else if (type === 'secondary') {
      setSecondary();
    }
  }, [setPrimary, setSecondary, type]);

  if (isScanDouble) {
    return (
      <>
        <Box pb={1} bgcolor="#ffffff">
          <BottomNavigation
            showLabels
            value={value}
            sx={{
              height: '40px',
              backgroundColor: '#ededed',
              borderRadius: '25px',
              margin: 'auto',
              width: '96%',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
              overflow: 'hidden',
            }}
            onChange={changeActiveScan}
          >
            <BottomNavigationAction
              id="primary-change-button"
              disableRipple
              onClick={setPrimary}
              disabled={value === 0}
              label={
                <Box display="flex" gap={1} alignItems="center">
                  <img src={profile1sim} height="24px" />
                  <Box>
                    <Typography variant="caption" lineHeight={1.2}>
                      นามบัตร 1
                    </Typography>
                    <Typography fontSize={10} lineHeight={1.2} textAlign="left">
                      สแกนซ้าย
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{
                maxWidth: 'none',
                backgroundColor: '#ededed',
                '&.Mui-selected': {
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: '0.5px solid grey',
                  borderRadius: '25px',
                },
              }}
            />
            <BottomNavigationAction
              id="secondary-change-button"
              disableRipple
              onClick={setSecondary}
              disabled={value === 1}
              label={
                <Box display="flex" gap={1} alignItems="center">
                  <img src={profile2sim} height="24px" />
                  <Box>
                    <Typography variant="caption" lineHeight={1.2}>
                      นามบัตร 2
                    </Typography>
                    <Typography fontSize={10} lineHeight={1.2} textAlign="left">
                      สแกนขวา
                    </Typography>
                  </Box>
                </Box>
              }
              sx={{
                maxWidth: 'none',
                backgroundColor: '#ededed',
                '&.Mui-selected': {
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: '0.5px solid grey',
                  borderRadius: '25px',
                },
              }}
            />
          </BottomNavigation>
        </Box>
        <Tutorial step="profileScan" delay={100} />
        {type === 'secondary' && (
          <Tutorial step="profileSecondary" delay={200} />
        )}
      </>
    );
  }
};

const Navigation = () => {
  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const [value, setValue] = useState();

  const { page } = useParams();

  const setValueNavigation = useCallback(() => {
    switch (page) {
      case 'profile':
        setValue(0);
        break;
      case 'share':
        setValue(1);
        break;
      case 'connection':
        setValue(2);
        break;
      default:
        setValue(0);
        break;
    }
  }, [page, setValue]);

  useEffect(() => {
    setValueNavigation();
  }, [setValueNavigation]);

  const navigate = useNavigate();

  const navigatePageProfile = useCallback(() => {
    navigate(pagePath.profile, { replace: true });
  }, [navigate]);

  const navigatePageShare = useCallback(() => {
    navigate(pagePath.share, { replace: true });
  }, [navigate]);

  const navigatePageConnection = useCallback(() => {
    navigate(pagePath.connection, { replace: true });
  }, [navigate]);

  const changeActivePageHandler = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Container>
      <BottomNavigation
        showLabels
        value={value}
        sx={{ borderTop: '1px solid #F1F1F1' }}
        onChange={changeActivePageHandler}
      >
        <BottomNavigationAction
          onClick={navigatePageProfile}
          label="นามบัตร"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          id="share-button-navigation"
          onClick={navigatePageShare}
          label="แชร์"
          icon={<QrCode2Icon />}
          disabled={!profileActivationId}
        />
        <BottomNavigationAction
          onClick={navigatePageConnection}
          label="สมุดรายชื่อ"
          icon={<ConnectWithoutContactIcon />}
          disabled={!profileActivationId}
        />
      </BottomNavigation>
      {ProfilePart()}
    </Container>
  );
};

export default Navigation;
