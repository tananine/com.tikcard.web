import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import { Button, Typography, Box } from '@mui/material';
import Account from '@/components/drawer/drawers/menu/Account';
import Device from '@/components/drawer/drawers/menu/Device';

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
      <Typography
        variant="caption"
        textAlign="end"
        position="fixed"
        marginRight={1}
        bottom={0}
        right={0}
      >
        v1.0.0
      </Typography>
    </DrawerWrapper>
  );
};

export default Menu;
