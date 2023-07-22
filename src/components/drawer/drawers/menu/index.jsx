import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import { Box, Button, Typography } from '@mui/material';
import Account from '@/components/drawer/drawers/menu/Account';
import Device from '@/components/drawer/drawers/menu/Device';
import { Img } from 'react-image';

import Logo from '@/assets/images/logo.png';

const Menu = () => {
  const open = useSelector((state) => state.drawer.menuDrawer);

  const dispatch = useDispatch();

  const menuToggleHandler = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  const logout = () => {
    window.location.href = '/app/login';
  };

  return (
    <DrawerWrapper
      open={open}
      onClose={menuToggleHandler}
      onOpen={menuToggleHandler}
      title="เมนู"
    >
      <Account />
      <Device />
      <Button
        variant="text"
        color="error"
        sx={{
          marginTop: 4,
          marginBottom: 2,
          marginX: 'auto',
          display: 'block',
        }}
        onClick={logout}
      >
        ออกจากระบบ
      </Button>
      <Box textAlign="center" marginTop={4} marginBottom={1}>
        <Img src={Logo} alt="" height="28px" />
        <Typography variant="caption" sx={{ marginBottom: 2 }}>
          version 1.0.00
        </Typography>
        {/* <Button variant="text" size="small" sx={{ marginY: 2 }}> // TODO Privacy Policy
          นโยบายความเป็นส่วนตัว
        </Button> */}
      </Box>
    </DrawerWrapper>
  );
};

export default Menu;
