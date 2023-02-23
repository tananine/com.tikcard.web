import { useState, useCallback } from 'react';
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import pagePath from 'data/jsons/page-path.json';

const Navigation = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const navigatePageProfile = useCallback(() => {
    navigate(pagePath.profile, { replace: true });
  }, [navigate]);

  const navigatePageShare = useCallback(() => {
    navigate(pagePath.share, { replace: true });
  }, [navigate]);

  const navigatePageInsight = useCallback(() => {
    navigate(pagePath.insight, { replace: true });
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
        />
        <BottomNavigationAction
          onClick={navigatePageInsight}
          label="สถิติ"
          icon={<LeaderboardIcon />}
        />
        <BottomNavigationAction
          onClick={navigatePageConnection}
          label="คอนเนคชั่น"
          icon={<ConnectWithoutContactIcon />}
        />
      </BottomNavigation>
      <Grid container>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth sx={{ borderRadius: 0 }}>
            โพรไฟล์หลัก
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth sx={{ borderRadius: 0 }}>
            โพรไฟล์รอง
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Navigation;
