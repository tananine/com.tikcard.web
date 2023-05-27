import { Avatar, Box, Typography, Badge } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import profile1sim from '@/assets/svg/profile-1-sim.svg';
import profile2sim from '@/assets/svg/profile-2-sim.svg';

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

const inUseDoubleScan = (isPrimary, isSecondary) => {
  return (
    <Box position="absolute" right={14} top={10}>
      {(isPrimary || isSecondary) && (
        <Typography variant="caption">กำลังใช้ใน</Typography>
      )}
      <Box display="flex" gap={0.5} justifyContent="center">
        {isPrimary && <img src={profile1sim} height="18px" />}
        {isSecondary && <img src={profile2sim} height="18px" />}
      </Box>
    </Box>
  );
};

const Profile = ({
  profileImage,
  logoImage,
  cardName,
  name,
  company,
  isSelect,
  isScanDouble,
  isPrimary,
  isSecondary,
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
      {isScanDouble && inUseDoubleScan(isPrimary, isSecondary)}
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
