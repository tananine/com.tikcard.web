import { useEffect, useRef, useCallback } from 'react';
import { Box, Container, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setHeaderHeight } from 'stores/offset';
import { menuToggle } from 'stores/drawer';
import { useParams } from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Logo from 'assets/images/logo.png';

const Header = ({ component }) => {
  const dispatch = useDispatch();
  const headerRef = useRef();

  const { page } = useParams();

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
      <Box paddingX={2} paddingTop={1} paddingBottom={1} bgcolor="#ffffff">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <img src={Logo} alt="" height="22px" />
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
