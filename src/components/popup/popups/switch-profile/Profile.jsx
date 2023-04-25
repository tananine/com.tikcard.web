import { Avatar, Box, Typography, Badge } from '@mui/material';

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

const Profile = ({
  profileImage,
  logoImage,
  cardName,
  name,
  company,
  isSelect,
}) => {
  return (
    <Box
      textAlign="center"
      position="relative"
      bgcolor="#f7f7f7"
      borderRadius={4}
      padding={3}
      height={212}
    >
      {Select(isSelect)}
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ marginBottom: 2 }}
        badgeContent={
          <Avatar
            sx={{ width: 32, height: 32, border: '2px solid #ffffff' }}
            src={logoImage}
          />
        }
      >
        <Avatar sx={{ width: 76, height: 76 }} src={profileImage} />
      </Badge>
      <Typography variant="h3">{cardName}</Typography>
      <Typography variant="caption" fontSize={14}>
        {name}
      </Typography>
      <Typography variant="caption">{company}</Typography>
    </Box>
  );
};

export default Profile;
