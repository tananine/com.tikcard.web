import { Box, Typography } from '@mui/material';

const GridLayout = ({ imageIcon, title, onClick }) => {
  return (
    <Box sx={{ cursor: 'pointer' }} lineHeight={1} onClick={onClick}>
      <Box textAlign="center" style={{ aspectRatio: '1' }}>
        <img src={imageIcon} alt="" width="100%" height="100%" />
      </Box>
      <Typography variant="caption" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default GridLayout;
