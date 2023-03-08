import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { previewToggle } from 'stores/drawer';
import DrawerWrapper from 'components/drawer/DrawerWrapper';

import View from 'pages/view';

const Preview = () => {
  const open = useSelector((state) => state.drawer.previewDrawer);

  const dispatch = useDispatch();

  const previewToggleHandler = useCallback(() => {
    dispatch(previewToggle());
  }, [dispatch]);

  return (
    <DrawerWrapper
      open={open}
      onClose={previewToggleHandler}
      onOpen={previewToggleHandler}
      title="ตัวอย่าง"
    >
      <View isPreview />
    </DrawerWrapper>
  );
};

export default Preview;
