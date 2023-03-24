import { Divider, Typography } from '@mui/material';
import ProfileList from '@/pages/connection/body/ProfileList';

const ConnectionBody = () => {
  return (
    <>
      <Typography variant="caption">ทั้งหมด 12</Typography>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <ProfileList />
      <Divider sx={{ width: '60px', margin: 'auto' }} />
    </>
  );
};

export default ConnectionBody;
