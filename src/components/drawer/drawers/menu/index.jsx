import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import { Button } from '@mui/material';
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
    </DrawerWrapper>
  );
};

export default Menu;
