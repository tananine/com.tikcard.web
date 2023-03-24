import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';

const Menu = () => {
  const open = useSelector((state) => state.drawer.menuDrawer);

  const dispatch = useDispatch();

  const menuToggleHandler = useCallback(() => {
    dispatch(menuToggle());
  }, [dispatch]);

  return (
    <DrawerWrapper
      open={open}
      onClose={menuToggleHandler}
      onOpen={menuToggleHandler}
      title="เมนู"
    ></DrawerWrapper>
  );
};

export default Menu;
