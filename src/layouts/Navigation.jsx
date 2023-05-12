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

import pagePath from '@/data/jsons/page-path.json';

const ProfilePart = () => {
  const profileActivation = useSelector((state) => state.account.activation);
  const isScanDouble = useSelector((state) => state.device.isScanDouble);

  const navigate = useNavigate();

  const [type, setType] = useState('primary');
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();

  const setPrimary = useCallback(() => {
    setType('primary');
    dispatch(
      setProfileInUse({
        profileState: 'primary',
        profileId: profileActivation.primaryProfile,
      })
    );
  }, [dispatch, profileActivation]);

  const setSecondary = useCallback(() => {
    setType('secondary');
    dispatch(
      setProfileInUse({
        profileState: 'secondary',
        profileId: profileActivation.secondaryProfile,
      })
    );
    if (!profileActivation.secondaryProfile) {
      navigate('/app/profile', { replace: true });
    }
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
      <Box pb={1}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{
            height: '40px',
            backgroundColor: '#e8e8e8',
            borderRadius: '25px',
            margin: 'auto',
            width: '96%',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            overflow: 'hidden',
          }}
          onChange={changeActiveScan}
        >
          <BottomNavigationAction
            disableRipple
            onClick={setPrimary}
            label={
              <>
                <Typography variant="caption">นามบัตร 1</Typography>
                <Typography fontSize={10} lineHeight={1}>
                  สแกนซ้าย
                </Typography>
              </>
            }
            sx={{
              maxWidth: 'none',
              backgroundColor: '#ededed',
              '&.Mui-selected': {
                color: '#000000',
                backgroundColor: '#e6e6e6',
              },
            }}
          />
          <BottomNavigationAction
            disableRipple
            onClick={setSecondary}
            label={
              <>
                <Typography variant="caption">นามบัตร 2</Typography>
                <Typography fontSize={10} lineHeight={1}>
                  สแกนขวา
                </Typography>
              </>
            }
            sx={{
              maxWidth: 'none',
              backgroundColor: '#ededed',
              '&.Mui-selected': {
                color: '#000000',
                backgroundColor: '#e6e6e6',
              },
            }}
          />
        </BottomNavigation>
      </Box>
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
