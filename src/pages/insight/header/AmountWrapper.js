import { Box, Typography } from '@mui/material';

const AmountWrapper = ({ amount, title, sx }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f7f7',
        border: '1px solid #e8e8e8',
        borderRadius: 0,
        ...sx,
      }}
    >
      <Box padding={1} textAlign="center">
        <Typography variant="h4">{amount}</Typography>
        <Typography variant="caption">{title}</Typography>
      </Box>
    </Box>
  );
};

export default AmountWrapper;
