import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addContactToggle } from 'stores/popup';

import AddIcon from '@mui/icons-material/Add';

const ProfileFooter = () => {
  const dispatch = useDispatch();

  const addContactToggleHandler = useCallback(() => {
    dispatch(addContactToggle());
  }, [dispatch]);

  return (
    <Button
      variant="contained"
      fullWidth
      startIcon={<AddIcon />}
      onClick={addContactToggleHandler}
    >
      เพิ่มข้อมูลติดต่อ
    </Button>
  );
};

export default ProfileFooter;
