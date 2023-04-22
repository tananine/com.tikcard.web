import { Typography, Grid, Box } from '@mui/material';

const BlockLayout = ({ imageIcon, name, note }) => {
  return (
    <Box bgcolor="#fafafa" borderRadius={6} padding={2}>
      <Grid container columnSpacing={3}>
        <Grid item xs={3} display="flex" alignSelf="center">
          <img src={imageIcon} alt="" width="100%" height="100%" />
        </Grid>
        <Grid item xs={9} alignSelf="center">
          <Typography variant="h4">{name || 'ชื่อบล็อค'}</Typography>
          <Typography variant="caption">{note}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlockLayout;
