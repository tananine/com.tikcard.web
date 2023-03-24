import { useCallback, useEffect, useRef } from 'react';
import { Box, Container, Fade } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFooterHeight } from '@/stores/offset';
import { useLocation } from 'react-router-dom';

import Navigation from '@/layouts/Navigation';

const Footer = ({ component }) => {
  const dispatch = useDispatch();
  const footerRef = useRef();

  const isShow = useSelector((state) => state.layout.isShow.footer);

  const { pathname } = useLocation();

  const setFooterHeightHandler = useCallback(() => {
    if (footerRef.current) {
      dispatch(setFooterHeight(footerRef.current.offsetHeight));
    }
  }, [dispatch]);

  useEffect(() => {
    setFooterHeightHandler();
  }, [setFooterHeightHandler, pathname]);

  return (
    <Fade in={isShow}>
      <Box ref={footerRef} position="sticky" bottom={0}>
        <Container>
          <Box
            paddingX={component ? 2 : 0}
            paddingTop={component ? 1 : 0}
            paddingBottom={component ? 1.5 : 0}
            bgcolor="#ffffff"
          >
            {component}
          </Box>
        </Container>
        <Navigation />
      </Box>
    </Fade>
  );
};

export default Footer;
