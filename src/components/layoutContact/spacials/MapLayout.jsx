import { Typography, Box, Skeleton } from '@mui/material';

const MapLayout = () => {
  return (
    <Box
      bgcolor="#f1f1f1"
      borderRadius={4}
      padding={{ xs: 1, md: 1.5, lg: 2 }}
      sx={{ cursor: 'pointer' }}
    >
      <Typography variant="h4" marginBottom={1}>
        Map
      </Typography>
      <Typography variant="caption" marginBottom={1}>
        อุทยานวิทยาศาสตร์ 88/3 ขอนแก่น 40000
      </Typography>
      <Skeleton
        animation="wave"
        variant="rounded"
        width="100%"
        height="150px"
      />
    </Box>
  );
};

export default MapLayout;
