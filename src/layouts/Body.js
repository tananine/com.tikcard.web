import { Box, Container } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const mobileSafeZone = 96;

const Body = ({ component }) => {
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const footerHeight = useSelector((state) => state.layout.footerHeight);

  const isShowFooter = useSelector((state) => state.layout.isShow.footer);

  return (
    <Container>
      <Scrollbars
        style={{
          height: `calc(100vh - ${headerHeight}px - ${
            isShowFooter ? `${footerHeight}px` : '0px'
          })`,
        }}
      >
        <Box
          paddingX={2}
          paddingY={1}
          marginBottom={
            isShowFooter
              ? `${mobileSafeZone}px`
              : `calc(${mobileSafeZone}px + ${footerHeight}px)`
          }
          bgcolor="#ffffff"
        >
          {component}
        </Box>
      </Scrollbars>
    </Container>
  );
};

export default Body;
