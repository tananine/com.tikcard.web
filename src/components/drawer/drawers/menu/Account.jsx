import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Account = () => {
  const email = useSelector((state) => state.account.accountData.email);

  return (
    <Box padding={2}>
      <Box
        display="flex"
        gap={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
          บัญชีของฉัน
        </Typography>
        <Typography
          variant="h4"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {email}
        </Typography>
      </Box>
      {/* <Box> // TODO: แผน
        <Typography display="inline" variant="body2">
          แผน :{' '}
        </Typography>
        <Typography display="inline" variant="h5">
          เริ่มต้น
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Account;
