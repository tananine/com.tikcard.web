import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default Loading;
