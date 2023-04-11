import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';

import openAppUri from '@/functions/openAppUri';

const ContactLists = (contacts) => {
  return contacts?.map((contact) => {
    return (
      <Grid key={contact.id} item xs={3} textAlign="center">
        <img
          src={contact.ContactItem.imageIcon}
          alt=""
          width="100%"
          height="auto"
          style={{ maxWidth: '100px', cursor: 'pointer' }}
          onClick={() =>
            openAppUri(
              contact.ContactItem.defaultUri,
              contact.ContactItem.androidUri,
              contact.ContactItem.iosUri,
              contact.url
            )
          }
        />
        <Typography variant="caption" lineHeight={0.5} marginBottom={1.2}>
          {contact.ContactItem.name}
        </Typography>
      </Grid>
    );
  });
};

const View = ({ isPreview, profileData }) => {
  const goNewCreate = () => {
    window.open('/app/login');
  };

  return (
    <Box>
      <Box
        height={180}
        bgcolor="#ced4da"
        sx={{ borderBottomRightRadius: 60 }}
      />
      <Avatar
        sx={{
          position: 'absolute',
          left: 20,
          top: isPreview ? 135 : 75,
          width: 140,
          height: 140,
          border: '4px solid white',
        }}
      />
      <Avatar
        sx={{
          position: 'absolute',
          left: 130,
          top: isPreview ? 215 : 155,
          width: 60,
          height: 60,
          border: '4px solid white',
        }}
      />
      <Box padding={2} minHeight="100vh">
        <Box marginBottom={2}>
          <Typography marginTop={5} textAlign="center" variant="h1">
            {profileData?.info.name || 'ไม่มีชื่อ'}
          </Typography>
          <Typography marginTop={1} textAlign="center" variant="body2">
            {profileData?.info.company}
          </Typography>
          <Typography marginTop={2} textAlign="center" variant="body2">
            {profileData?.info.bio}
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid
          container
          rowSpacing={1}
          columnSpacing={3}
          marginTop={2}
          paddingX={2}
        >
          {ContactLists(profileData?.contacts)}
        </Grid>
      </Box>
      {!isPreview && (
        <Box textAlign="center" padding={2}>
          <Typography variant="caption">สร้างโดย</Typography>
          <Typography variant="caption">Tikcard.me</Typography>
          <Button variant="text" size="large" onClick={goNewCreate}>
            สร้างนามบัตรของคุณ ฟรี
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default View;
