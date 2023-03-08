import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';

import PhoneAPP from 'assets/images/phone.png';

const View = ({ isPreview }) => {
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
      <Box padding={2} marginBottom={8}>
        <Box marginBottom={2}>
          <Typography marginTop={5} textAlign="center" variant="h1">
            Tanadon Chiraphaisansakun
          </Typography>
          <Typography marginTop={1} textAlign="center" variant="body2">
            Nayoo Coporation
          </Typography>
          <Typography marginTop={2} textAlign="center" variant="body2">
            I like developer
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
          <Grid item xs={3} textAlign="center">
            <img
              src={PhoneAPP}
              alt=""
              width="100%"
              height="auto"
              style={{ maxWidth: '100px' }}
            />
            <Typography variant="caption" lineHeight={0.5} marginBottom={1.2}>
              Phone
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default View;
