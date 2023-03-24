import { Box, Grid } from '@mui/material';

import AmountWrapper from '@/pages/insight/header/AmountWrapper';

const InsightHeader = () => {
  return (
    <>
      <Box>
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <AmountWrapper
              amount="1,342"
              title="เข้าชม"
              sx={{ borderTopLeftRadius: 40 }}
            />
          </Grid>
          <Grid item xs={6}>
            <AmountWrapper
              amount="435"
              title="คลิก"
              sx={{ borderTopRightRadius: 40 }}
            />
          </Grid>
          <Grid item xs={6}>
            <AmountWrapper
              amount="3"
              title="แชร์ต่อ"
              sx={{ borderBottomLeftRadius: 40 }}
            />
          </Grid>
          <Grid item xs={6}>
            <AmountWrapper
              amount="2"
              title="ถูกใจ"
              sx={{ borderBottomRightRadius: 40 }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InsightHeader;
