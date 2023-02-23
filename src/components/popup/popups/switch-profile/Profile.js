import { Avatar, Box, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Select = (isSelect) => {
  if (isSelect) {
    return (
      <>
        <CheckCircleIcon
          sx={{ position: 'absolute', left: -8, top: -8, fontSize: 35 }}
          color="success"
        />
      </>
    );
  }
};

const Profile = ({ profileName, company, isSelect }) => {
  return (
    <Box
      textAlign="center"
      position="relative"
      bgcolor="#f7f7f7"
      borderRadius={4}
      padding={3}
    >
      {Select(isSelect)}
      <Avatar
        sx={{ width: 76, height: 76, marginX: 'auto', marginBottom: 2 }}
      />
      <Typography variant="h3">{profileName}</Typography>
      <Typography variant="caption">{company}</Typography>
    </Box>
  );
};

export default Profile;
