import { useCallback } from 'react';
import { IconButton } from '@mui/material';
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
    <IconButton
      variant="contained"
      onClick={addContactToggleHandler}
      disabled={!profileActivationId}
      sx={{
        backgroundColor: '#ffffff',
        position: 'absolute',
        boxShadow:
          'rgba(0, 0, 0, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        top: -86,
        right: 44,
        width: 60,
        height: 60,
        '&:hover': {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default ProfileFooter;
