import { useEffect, useState } from 'react';
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

import GridLayout from '@/components/layoutContact/GridLayout';
import BlockLayout from '@/components/layoutContact/BlockLayout';

import Verify from '@/assets/images/verify.png';

const jobTitle = (job, company) => {
  if (job && company) {
    return `${job} ที่ ${company}`;
  } else if (job) {
    return job;
  } else {
    return company;
  }
};

const ContactLists = (contactItems) => {
  return contactItems?.map((section, index) => {
    return section.typeLayout === 'grid' ? (
      <Grid
        key={section.id}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1.5, md: 2, lg: 3 }}
        marginY={{ xs: 1, md: 1.5, lg: 2 }}
        paddingX={{ xs: 1, md: 1.5, lg: 2 }}
      >
        {section.contacts?.map((item) => {
          return (
            <Grid key={item.id} item xs={3} textAlign="center">
              <GridLayout
                onClick={() =>
                  openAppUri(
                    item.ContactItem.defaultUri,
                    item.ContactItem.androidUri,
                    item.ContactItem.iosUri,
                    item.data
                  )
                }
                imageIcon={item.ContactItem.imageIcon}
                title={item.ContactItem.name}
              />
            </Grid>
          );
        })}
      </Grid>
    ) : (
      section.contacts?.map((item) => {
        return (
          <Box key={item.id} width="100%" marginY={{ xs: 1, md: 1.5, lg: 2 }}>
            <BlockLayout
              onClick={() =>
                openAppUri(
                  item.ContactItem.defaultUri,
                  item.ContactItem.androidUri,
                  item.ContactItem.iosUri,
                  item.data
                )
              }
              imageIcon={item.ContactItem.imageIcon}
              name={item.name}
              note={item.note}
            />
          </Box>
        );
      })
    );
  });
};

const View = ({ isPreview, profileData }) => {
  const [contactItems, setContactItems] = useState([]);

  const setListContactItems = () => {
    const contactSection = [];
    let contactList = [];

    const pushContactSection = () => {
      contactSection.push({
        id: contactSection.length,
        typeLayout: contactList[0].ContactItem.typeLayout,
        contacts: contactList,
      });
    };

    profileData?.contacts.forEach((contact, index) => {
      if (index === 0) {
        contactList.push(contact);
        if (profileData.contacts.length - 1 === 0) {
          pushContactSection();
        }
        return;
      }
      const lastIndexItem = contactList.length - 1;
      if (
        contactList[lastIndexItem]?.ContactItem.typeLayout ===
        contact?.ContactItem.typeLayout
      ) {
        contactList.push(contact);
      } else {
        pushContactSection();
        contactList = [];
        contactList.push(contact);
      }
      if (index === profileData.contacts.length - 1) {
        pushContactSection();
      }
    });
    setContactItems(contactSection);
  };

  useEffect(() => {
    setListContactItems();
  }, [profileData, setContactItems]);

  const goNewCreate = () => {
    window.open('/app/login');
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box marginBottom={8}>
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
        <Box padding={2} minHeight={500}>
          <Fade in={true} timeout={{ enter: 1000 }}>
            <Box marginBottom={2}>
              <Box px={2} marginBottom={2}>
                <Typography
                  marginTop={5}
                  textAlign="center"
                  alignSelf="center"
                  variant="h1"
                >
                  {profileData?.info.name || 'ไม่มีชื่อ'}
                  {false && (
                    <img
                      src={Verify}
                      alt=""
                      width="22px"
                      style={{
                        verticalAlign: 'middle',
                        filter: 'grayscale(100%)',
                        marginLeft: '4px',
                      }}
                    />
                  )}
                </Typography>
                <Typography marginTop={2} textAlign="center">
                  {jobTitle(profileData?.info.job, profileData?.info.company)}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography textAlign="center" variant="body2">
                  {profileData?.info.bio1}
                </Typography>
                <Typography mt={1} textAlign="center" variant="body2">
                  {profileData?.info.bio2}
                </Typography>
                <Typography mt={1} textAlign="center" variant="body2">
                  {profileData?.info.bio3}
                </Typography>
              </Box>
              <Grid
                container
                spacing={1}
                sx={{ marginTop: 2, marginBottom: { lg: 4 } }}
              >
                <Grid item xs={7}>
                  <Lead
                    isPreview={isPreview}
                    profileId={profileData?.info.profileId}
                  />
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
            </Box>
          </Fade>
          <Fade
            in={true}
            timeout={{ enter: 1000 }}
            style={{
              transitionDelay: '100ms',
            }}
          >
            <Box>{ContactLists(contactItems)}</Box>
          </Fade>
        </Box>
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
