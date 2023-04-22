import { Box, Typography } from '@mui/material';

const GridLayout = ({ imageIcon, title }) => {
  return (
    <Box>
      <Box
        textAlign="center"
        style={{ maxWidth: '100px', cursor: 'pointer', aspectRatio: '1' }}
      >
        <img src={imageIcon} alt="" width="100%" height="100%" />
      </Box>
      <Typography variant="caption" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default GridLayout;
