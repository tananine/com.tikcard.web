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
import saveVCard from '@/functions/saveVCard';

import Lead from '@/pages/view/Lead';

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
            style={{ maxWidth: '100px', cursor: 'pointer', aspectRatio: '1' }}
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
        <Typography variant="caption" marginBottom={1.2}>
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
    <>
      <Box>
        <Box
          height={180}
          bgcolor="#ced4da"
          sx={{ borderBottomRightRadius: 60, overflow: 'hidden' }}
        >
          <img
            src="https://img.freepik.com/free-vector/minimal-white-gray-background-with-wavy-lines_1017-25099.jpg?w=2000"
            alt="cover image"
            width="100%"
            height="100%"
          />
        </Box>
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
            <Box sx={{ border: '4px solid white', borderRadius: '50%' }}>
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  boxShadow:
                    'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
                }}
                src={profileData?.info.profileImage}
              />
            </Box>
            <Box
              sx={{
                border: '2px solid white',
                borderRadius: '50%',
                position: 'absolute',
                left: 100,
                top: 80,
              }}
            >
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
                }}
                src={profileData?.info.logoImage}
              />
            </Box>
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
                  <Lead isPreview={isPreview} />
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    color="secondary"
                    startIcon={<PersonAddIcon />}
                    onClick={() => saveVCard(profileData?.info)}
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
    </>
  );
};

export default View;
