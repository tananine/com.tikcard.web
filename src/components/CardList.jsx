import { Card } from '@mui/material';

const CardList = ({ children, sx, forwardedRef, onClick }) => {
  return (
    <Card
      ref={forwardedRef}
      elevation={0}
      sx={{ marginY: 1, bgcolor: '#f7f7f7', borderRadius: '25px', ...sx }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default CardList;
