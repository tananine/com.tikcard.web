import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

const BackdropOnFetch = () => {
  const fetchQueue = useSelector((state) => state.controller.fetchQueue);
  const [fetchLoading, setFetchLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (fetchQueue > 0) {
      document.getElementsByTagName('html')[0].style.pointerEvents = 'none';
      timeoutRef.current = setTimeout(() => {
        setFetchLoading(true);
      }, 1200);
    } else {
      document.getElementsByTagName('html')[0].style.pointerEvents = 'auto';
      clearTimeout(timeoutRef.current);
      setFetchLoading(false);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [fetchQueue]);

  return (
    <Backdrop open={fetchLoading} sx={{ zIndex: 1400 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default BackdropOnFetch;
