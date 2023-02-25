import { Box, SwipeableDrawer } from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';

const PopupWrapper = ({
  children,
  sx,
  open,
  onClose,
  onOpen,
  forwardedRef,
  fullHeight,
}) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{ ...sx }}
    >
      <Box
        height={4}
        width={40}
        bgcolor="#8e8e8e"
        marginTop={1}
        marginBottom={2}
        marginX="auto"
        borderRadius={4}
      />
      <Box ref={forwardedRef} height={fullHeight ? '75vh' : 'auto'}>
        <Scrollbars autoHeight autoHeightMax="75vh">
          <Box paddingX={2} paddingBottom={2}>
            {children}
          </Box>
        </Scrollbars>
      </Box>
    </SwipeableDrawer>
  );
};

export default PopupWrapper;
