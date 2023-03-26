import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import useGet from '@/hooks/axios/useGet';
import deviceServicePath from '@/data/jsons/services/device.service.json';

const Scanner = () => {
  const [redirectAction] = useGet(deviceServicePath.getRedirect);

  const navigate = useNavigate();
  const { scannerId } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  useEffect(() => {
    redirectAction(`${scannerId}/${key}`).then((res) => {
      navigate(`/${res.data.linkId}`, { replace: true });
    });
  }, []);

  return (
    <Box textAlign="center" marginTop={6}>
      <CircularProgress disableShrink />
    </Box>
  );
};

export default Scanner;
