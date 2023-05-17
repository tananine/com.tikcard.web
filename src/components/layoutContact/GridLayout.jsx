import { Box, Typography, Skeleton } from '@mui/material';
import { Img } from 'react-image';

const GridLayout = ({ imageIcon, title, onClick }) => {
  return (
    <Box sx={{ cursor: 'pointer' }} lineHeight={1} onClick={onClick}>
      <Box textAlign="center" style={{ aspectRatio: '1' }}>
        <Img
          src={imageIcon}
          alt=""
          width="100%"
          height="100%"
          loader={
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="100%"
            />
          }
          unloader={
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="100%"
            />
          }
        />
      </Box>
      <Typography variant="caption" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default GridLayout;
