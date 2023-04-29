import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Account = () => {
  const email = useSelector((state) => state.account.accountData.email);

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">บัญชีของฉัน</Typography>
        <Typography variant="h4">{email}</Typography>
      </Box>
      <Box>
        <Typography display="inline" variant="body2">
          แผน :{' '}
        </Typography>
        <Typography display="inline" variant="h5">
          Free
        </Typography>
      </Box>
    </Box>
  );
};

export default Account;
