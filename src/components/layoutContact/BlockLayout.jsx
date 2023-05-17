import { Typography, Grid, Box, Skeleton } from '@mui/material';
import { Img } from 'react-image';

const BlockLayout = ({ title, imageIcon, name, note, onClick }) => {
  return (
    <Box
      bgcolor="#f1f1f1"
      borderRadius={4}
      padding={{ xs: 1, md: 1.5, lg: 2 }}
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Grid container columnSpacing={{ xs: 1.5, md: 2, lg: 3 }}>
        <Grid item xs={3} display="flex" alignSelf="center">
          <Box display="flex" width="100%" style={{ aspectRatio: '1' }}>
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
        </Grid>
        <Grid item xs={9} alignSelf="center">
          <Typography variant="h4">{name || title}</Typography>
          <Typography variant="caption">{note}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlockLayout;
