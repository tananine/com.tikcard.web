import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Scrollbars } from 'react-custom-scrollbars-2';

const DrawerWrapper = ({ open, onClose, onOpen, children, title }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        '& .MuiDrawer-paperAnchorBottom': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      }}
    >
      <Scrollbars autoHeight autoHeightMax="100vh">
        <Box
          padding={1}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="sticky"
          top={0}
          zIndex={9}
          bgcolor="#ffffff"
          borderBottom="1px solid #F1F1F1"
        >
          <Typography
            flexGrow={1}
            paddingLeft={5}
            variant="h4"
            textAlign="center"
          >
            {title}
          </Typography>
          <IconButton sx={{ width: 'fit-content' }} onClick={onClose}>
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {children}
          <Box flexGrow={1} minHeight={74} bgcolor="#f5f5f5" />
        </Box>
      </Scrollbars>
    </SwipeableDrawer>
  );
};

export default DrawerWrapper;
