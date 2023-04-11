import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Fade,
  Grow,
  Typography,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import openAppUri from '@/functions/openAppUri';

const ContactLists = (contacts) => {
  return contacts?.map((contact, index) => {
    return (
      <Grid key={contact.id} item xs={3} textAlign="center">
        <Fade
          in={true}
          timeout={{ enter: 1000 }}
          style={{
            transitionDelay: `${40 * index}ms`,
          }}
        >
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
        </Fade>
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
      <Grow
        in={true}
        sx={{
          position: 'absolute',
          left: 20,
          top: isPreview ? 135 : 75,
        }}
        timeout={{ enter: 1000 }}
      >
        <Box>
          <Avatar
            sx={{
              width: 140,
              height: 140,
              border: '4px solid white',
            }}
          />
          <Avatar
            sx={{
              position: 'absolute',
              left: 110,
              top: 80,
              width: 60,
              height: 60,
              border: '4px solid white',
            }}
          />
        </Box>
      </Grow>
      <Box padding={2} minHeight="100vh">
        <Fade in={true} timeout={{ enter: 1000 }}>
          <Box>
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
            <Grid container spacing={1} sx={{ marginY: 2 }}>
              <Grid item xs={7}>
                <Button variant="contained" fullWidth size="large">
                  ฝากข้อมูลติดต่อ
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color="secondary"
                  startIcon={<PersonAddIcon />}
                >
                  บันทึก
                </Button>
              </Grid>
            </Grid>
            <Divider variant="middle" />
          </Box>
        </Fade>
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
