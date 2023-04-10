import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addContactToggle } from '@/stores/popup';

import AddIcon from '@mui/icons-material/Add';

const ProfileFooter = () => {
  const dispatch = useDispatch();

  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={<AddIcon />}
      onClick={addContactToggleHandler}
      disabled={!profileActivationId}
    >
      เพิ่มข้อมูลติดต่อ
    </Button>
  );
};

export default ProfileFooter;
