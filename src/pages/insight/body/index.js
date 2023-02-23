import { Box, Divider, Typography } from '@mui/material';
import InsightContact from 'pages/insight/body/InsightContact';

const InsightBody = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Typography variant="h4">สถิติ</Typography>
        <Typography variant="caption">7 วัน ล่าสุด</Typography>
      </Box>
      <Divider sx={{ width: '60px', margin: 'auto' }} />
      <InsightContact />
      <InsightContact />
      <InsightContact />
      <InsightContact />
      <InsightContact />
      <InsightContact />
      <Divider sx={{ width: '60px', margin: 'auto' }} />
    </>
  );
};

export default InsightBody;
