import { useCallback, useEffect } from 'react';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editCardToggle } from '@/stores/popup';
import { reloadCurrentProfile } from '@/stores/reload';
import { Box, CircularProgress, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import useGet from '@/hooks/axios/useGet';
import usePut from '@/hooks/axios/usePut';
import profileService from '@/data/jsons/services/profile.service.json';

import ProfileImageHead from '@/components/popup/popups/edit-card/ProfileImageHead';
import { LoadingButton } from '@mui/lab';

import toast from 'react-hot-toast';

const EditCard = () => {
  const open = useSelector((state) => state.popup.editCardPopup);
  const profileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const dispatch = useDispatch();

  const [getInformationAction, getInformationLoading] = useGet(
    profileService.profileInformation
  );
  const [updateInformationAction, updateInformationLoading] = usePut(
    profileService.profileInformation
  );

  const { register, handleSubmit, setValue } = useForm();

  const editCardToggleHandler = useCallback(() => {
    dispatch(editCardToggle());
  }, [dispatch]);

  useEffect(() => {
    if (profileId && open) {
      getInformationAction().then((res) => {
        setValue('profileName', res.data.profileName);
        setValue('name', res.data.name);
        setValue('work', res.data.work);
        setValue('company', res.data.company);
        setValue('position', res.data.position);
        setValue('address', res.data.address);
        setValue('bio', res.data.bio);
      });
    }
  }, [getInformationAction, profileId, setValue, open]);

  const save = (form) => {
    const body = {
      profileName: form.profileName,
      name: form.name,
      work: form.work,
      company: form.company,
      position: form.position,
      address: form.address,
      bio: form.bio,
    };
    updateInformationAction(body).then(() => {
      dispatch(reloadCurrentProfile());
      dispatch(editCardToggle());
      toast.success('แก้ไขสำเร็จ');
    });
  };

  return (
    <PopupWrapper
      open={open}
      onClose={editCardToggleHandler}
      onOpen={editCardToggleHandler}
    >
      <Box paddingY={1}>
        {getInformationLoading ? (
          <Box textAlign="center">
            <CircularProgress disableShrink />
          </Box>
        ) : (
          <>
            <TextField
              label="ชื่อนามบัตร"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('profileName')}
            />
            <ProfileImageHead />
            <Box marginTop={4} display="flex" flexDirection="column" gap={2}>
              <TextField
                label="ชื่อ"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('name')}
              />
              <TextField
                label="อาชีพ"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('work')}
              />
              <TextField
                label="บริษัท"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('company')}
              />
              <TextField
                label="ตำแหน่ง"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('position')}
              />
              <TextField
                label="ที่อยู่"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('address')}
              />
              <TextField
                label="เกี่ยวกับฉัน"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('bio')}
                multiline
                rows={3}
              />
            </Box>
            <Box
              paddingY={1}
              marginTop={8}
              position="sticky"
              bottom={0}
              zIndex={9}
              bgcolor="#ffffff"
            >
              <LoadingButton
                variant="contained"
                fullWidth
                size="large"
                color="secondary"
                onClick={handleSubmit(save)}
                loading={updateInformationLoading}
              >
                บันทึก
              </LoadingButton>
            </Box>
            <Box textAlign="center">
              <LoadingButton variant="text" color="error" sx={{ marginTop: 1 }}>
                ลบโพรไฟล์
              </LoadingButton>
            </Box>
          </>
        )}
      </Box>
    </PopupWrapper>
  );
};

export default EditCard;
