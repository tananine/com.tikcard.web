import { useCallback } from 'react';
import { Grid, Button } from '@mui/material';
import CurrentProfile from '@/pages/profile/header/CurrentProfile';
import { useDispatch, useSelector } from 'react-redux';
import { editCardToggle } from '@/stores/popup';
import { previewToggle } from '@/stores/drawer';

import EditIcon from '@mui/icons-material/Edit';

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const profileActivationId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const editCardToggleHandler = useCallback(() => {
    dispatch(editCardToggle());
  }, [dispatch]);

  const previewToggleHandler = useCallback(() => {
    dispatch(previewToggle());
  }, [dispatch]);

  return (
    <>
      <CurrentProfile profileActivationId={profileActivationId} />
      <Grid container marginTop={0} spacing={1.5}>
        <Grid item xs={6}>
          <Button
            id="edit-profile-button"
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={editCardToggleHandler}
            disabled={!profileActivationId}
          >
            แก้ไขบัตร
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            id="preview-button"
            fullWidth
            variant="contained"
            onClick={previewToggleHandler}
            disabled={!profileActivationId}
          >
            ดูตัวอย่าง
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileHeader;
