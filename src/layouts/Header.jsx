import { useEffect, useRef, useCallback } from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderHeight } from '@/stores/offset';
import { menuToggle } from '@/stores/drawer';
import { useParams } from 'react-router-dom';
import { Img } from 'react-image';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Logo from '@/assets/images/logo.png';

const TitleProfileState = () => {
  const profileState = useSelector(
    (state) => state.controller.profileInUse.profileState
  );

  if (profileState === 'primary') {
    return <Typography variant="h3">นามบัตร 1</Typography>;
  }

  if (profileState === 'secondary') {
    return <Typography variant="h3">นามบัตร 2</Typography>;
  }

  return <Box />;
};

const Header = ({ component }) => {
  const dispatch = useDispatch();
  const headerRef = useRef();

  const { page } = useParams();

  const isScanDouble = useSelector((state) => state.device.isScanDouble);

  const setHeaderHeightHandler = useCallback(() => {
    if (headerRef.current) {
      dispatch(setHeaderHeight(headerRef.current.offsetHeight));
    }
  }, [dispatch]);

  useEffect(() => {
    setHeaderHeightHandler();
  }, [setHeaderHeightHandler, page]);

  const menuToggleHandler = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  return (
    <Container ref={headerRef}>
      <Box paddingX={2} paddingTop={1} paddingBottom={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {isScanDouble ? (
            <TitleProfileState />
          ) : (
            <Img src={Logo} alt="" height="22px" />
          )}
          <IconButton onClick={menuToggleHandler}>
            <MoreHorizIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
        {component}
      </Box>
    </Container>
  );
};

export default Header;
