import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import { Button } from '@mui/material';

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
      <Button
        variant="text"
        color="error"
        sx={{ marginY: 2, marginX: 'auto', display: 'block' }}
        onClick={logout}
      >
        ออกจากระบบ
      </Button>
    </DrawerWrapper>
  );
};

export default Menu;
