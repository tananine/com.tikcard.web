import PopupWrapper from '@/components/popup/PopupWrapper';
import { Box, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { switchProfileToggle, addProfileToggle } from '@/stores/popup';
import { setPrimaryProfile, setSecondaryProfile } from '@/stores/account';
import { useCallback, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

import usePost from '@/hooks/axios/usePost';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import toast from 'react-hot-toast';

const AddProfile = () => {
  const open = useSelector((state) => state.popup.addProfilePopup);

  const { register, handleSubmit, setValue } = useForm();

  const [addProfileAction, addProfileLoading] = usePost(
    profileServicePath.getProfile
  );
  const [setPrimaryAction, setPrimaryLoading] = usePut(
    profileServicePath.setPrimaryProfile
  );

  const switchProfileHeight = useSelector(
    (state) => state.layout.switchProfileHeight
  );

  useEffect(() => {
    if (open) {
      setValue('cardName', '');
    }
  }, [open]);

  const dispatch = useDispatch();

  const addProfileToggleHandler = useCallback(() => {
    dispatch(addProfileToggle());
  }, [dispatch]);

  const type = useSelector(
    (state) => state.controller.profileInUse.profileState
  );

  const save = (form) => {
    const body = {
      cardName: form.cardName,
    };
    addProfileAction(body).then(async (res) => {
      const profileId = res.data.returnData.id;
      if (type === 'primary') {
        await setPrimaryAction({}, profileId).then(() => {
          dispatch(setPrimaryProfile(profileId));
          toast.success('เพิ่มสำเร็จ');
        });
      } else if (type === 'secondary') {
        await setSecondaryAction({}, profileId).then(() => {
          dispatch(setSecondaryProfile(profileId));
          toast.success('เพิ่มสำเร็จ');
        });
      }
      addProfileToggleHandler();
      dispatch(switchProfileToggle());
    });
  };

  return (
    <PopupWrapper
      open={open}
      onClose={addProfileToggleHandler}
      onOpen={addProfileToggleHandler}
    >
      <Box height={`calc(${switchProfileHeight}px - 38px)`} position="relative">
        <Typography textAlign="center" marginBottom={2}>
          เพิ่มนามบัตร
        </Typography>
        <TextField
          label="ชื่อนามบัตร"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('cardName')}
        />
        <Box position="absolute" width="100%" bottom={0}>
          <LoadingButton
            variant="contained"
            fullWidth
            size="large"
            color="secondary"
            onClick={handleSubmit(save)}
            loading={addProfileLoading || setPrimaryLoading}
          >
            เพิ่ม
          </LoadingButton>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default AddProfile;
