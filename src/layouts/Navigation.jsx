import { useState, useCallback, useEffect } from 'react';
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { useSelector, useDispatch } from 'react-redux';
import { setProfileInUse } from '@/stores/controller';

import pagePath from '@/data/jsons/page-path.json';

import EditIcon from '@mui/icons-material/Edit';

const ProfilePart = () => {
  const profileActivation = useSelector((state) => state.account.activation);

  const navigate = useNavigate();

  const [type, setType] = useState('primary');

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

  useEffect(() => {
    if (type === 'primary') {
      setPrimary();
    } else if (type === 'secondary') {
      setSecondary();
    }
  }, [setPrimary, setSecondary, type]);

  return (
    <Paper elevation={2}>
      <Grid container>
        <Grid item xs={6}>
          <Button
            fullWidth
            sx={{ borderRadius: 0, opacity: type === 'primary' ? 1 : 0.5 }}
            onClick={setPrimary}
            startIcon={type === 'primary' && <EditIcon />}
          >
            โพรไฟล์หลัก
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            sx={{ borderRadius: 0, opacity: type === 'secondary' ? 1 : 0.5 }}
            onClick={setSecondary}
            startIcon={type === 'secondary' && <EditIcon />}
          >
            โพรไฟล์รอง
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
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
          label="โพรไฟล์"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          onClick={navigatePageShare}
          label="แชร์ QR"
          icon={<QrCode2Icon />}
          disabled={!profileActivationId}
        />
        <BottomNavigationAction
          onClick={navigatePageConnection}
          label="คอนเนคชั่น"
          icon={<ConnectWithoutContactIcon />}
          disabled={!profileActivationId}
        />
      </BottomNavigation>
      {ProfilePart()}
    </Container>
  );
};

export default Navigation;
