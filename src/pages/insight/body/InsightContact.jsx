import CardList from '@/components/CardList';

import { Box, Typography } from '@mui/material';

const InsightContact = () => {
  return (
    <CardList>
      <Box display="flex">
        <Box display="flex" gap={2} width="100%" sx={{ cursor: 'pointer' }}>
          <img src={''} alt="" width="46px" height="46px" />
          <Box>
            <Typography variant="h3" lineHeight="26.5px">
              Phone
            </Typography>
            <Typography variant="caption">01 2345 6789</Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Typography variant="body1" lineHeight="26.5px">
            0
          </Typography>
          <Typography variant="caption">คลิก</Typography>
        </Box>
      </Box>
    </CardList>
  );
};

export default InsightContact;
