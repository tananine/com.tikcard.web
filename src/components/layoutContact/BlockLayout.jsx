import { Typography, Grid, Box } from '@mui/material';

const BlockLayout = ({ imageIcon, name, note, onClick }) => {
  return (
    <Box
      bgcolor="#f1f1f1"
      borderRadius={6}
      padding={2}
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Grid container columnSpacing={3}>
        <Grid item xs={3} display="flex" alignSelf="center">
          <Box display="flex" width="100%" style={{ aspectRatio: '1' }}>
            <img src={imageIcon} alt="" width="100%" height="100%" />
          </Box>
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
