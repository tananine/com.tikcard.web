import { Avatar, Box, Typography } from '@mui/material';
import CardList from '@/components/CardList';

const ProfileList = () => {
  return (
    <CardList>
      <Box display="flex" gap={2} flexGrow={1} alignItems="center">
        <Avatar sx={{ width: 46, height: 46 }} />
        <Box height="100%">
          <Typography variant="h3" lineHeight="26.5px">
            Name
          </Typography>
          <Typography variant="caption">Company Name</Typography>
        </Box>
      </Box>
    </CardList>
  );
};

export default ProfileList;
