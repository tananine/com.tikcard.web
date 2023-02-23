import { Box, Container } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const Body = ({ component }) => {
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const footerHeight = useSelector((state) => state.layout.footerHeight);

  return (
    <Container>
      <Scrollbars
        style={{
          height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`,
        }}
      >
        <Box paddingX={2} paddingY={1} marginBottom={12} bgcolor="#ffffff">
          {component}
        </Box>
      </Scrollbars>
    </Container>
  );
};

export default Body;
