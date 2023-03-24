import { Avatar, Box } from '@mui/material';

const ProfileImageHead = () => {
  return (
    <Box marginY={2}>
      <Box
        height={180}
        bgcolor="#ced4da"
        sx={{ borderBottomRightRadius: 60 }}
      />
      <Avatar
        sx={{
          position: 'absolute',
          left: 40,
          top: 145,
          width: 140,
          height: 140,
          border: '4px solid white',
        }}
      />
      <Avatar
        sx={{
          position: 'absolute',
          left: 140,
          top: 225,
          width: 60,
          height: 60,
          border: '4px solid white',
        }}
      />
    </Box>
  );
};

export default ProfileImageHead;
