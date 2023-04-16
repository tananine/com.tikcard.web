import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { previewToggle } from '@/stores/drawer';
import DrawerWrapper from '@/components/drawer/DrawerWrapper';

import View from '@/pages/view';
import useGet from '@/hooks/axios/useGet';
import profileServicePath from '@/data/jsons/services/profile.service.json';
import { Box, CircularProgress } from '@mui/material';

const Preview = () => {
  const [getViewProfileAction, getViewProfileLoading] = useGet(
    profileServicePath.viewProfile
  );

  const [profileData, setProfileData] = useState(null);

  const profileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const open = useSelector((state) => state.drawer.previewDrawer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      getViewProfileAction(profileId).then((res) => {
        setProfileData(res.data);
      });
    }
  }, [getViewProfileAction, open, profileId]);

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
      {getViewProfileLoading ? (
        <Box display="flex" justifyContent="center" marginY={4}>
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <View isPreview profileData={profileData} />
      )}
    </DrawerWrapper>
  );
};

export default Preview;
