import { useCallback, useEffect, useState } from 'react';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editCardToggle } from '@/stores/popup';
import { reloadCurrentProfile } from '@/stores/reload';
import { Box, Divider, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import useGet from '@/hooks/axios/useGet';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import ProfileImageHead from '@/components/popup/popups/edit-card/ProfileImageHead';
import { LoadingButton } from '@mui/lab';

import toast from 'react-hot-toast';

const EditCard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);

  const open = useSelector((state) => state.popup.editCardPopup);
  const profileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const dispatch = useDispatch();

  const [getInformationAction] = useGet(
    profileServicePath.profileInformation,
    true
  );
  const [updateInformationAction, updateInformationLoading] = usePut(
    profileServicePath.profileInformation,
    false
  );

  const { register, handleSubmit, setValue, reset } = useForm();

  const editCardToggleHandler = useCallback(() => {
    dispatch(editCardToggle());
  }, [dispatch]);

  const clearData = () => {
    reset();
    setProfileImage(null);
    setLogoImage(null);
  };

  useEffect(() => {
    if (profileId && open) {
      clearData();
      getInformationAction().then((res) => {
        setValue('cardName', res.data.cardName);
        setValue('name', res.data.name);
        setValue('job', res.data.job);
        setValue('company', res.data.company);
        setValue('bio1', res.data.bio1);
        setValue('bio2', res.data.bio2);
        setValue('bio3', res.data.bio3);
        setProfileImage(res.data.profileImage);
        setLogoImage(res.data.logoImage);
      });
    }
  }, [getInformationAction, profileId, setValue, open]);

  const save = async (form) => {
    const formData = new FormData();
    formData.append('cardName', form.cardName);
    formData.append('name', form.name);
    formData.append('job', form.job);
    formData.append('company', form.company);
    formData.append('bio1', form.bio1);
    formData.append('bio2', form.bio2);
    formData.append('bio3', form.bio3);

    if (profileImage?.split(':')[0] === 'blob') {
      const profileImageBlob = await fetch(profileImage);
      const profileImageObject = await profileImageBlob.blob();
      formData.append('profileImage', profileImageObject);
    }
    if (logoImage?.split(':')[0] === 'blob') {
      const logoImageBlob = await fetch(logoImage);
      const logoImageObject = await logoImageBlob.blob();
      formData.append('logoImage', logoImageObject);
    }

    updateInformationAction(formData).then(() => {
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
        <TextField
          label="ชื่อนามบัตร"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register('cardName')}
        />
        <ProfileImageHead
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          logoImage={logoImage}
          setLogoImage={setLogoImage}
        />
        <Box marginTop={8} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="ชื่อ - นามสกุล"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('name')}
          />
          <TextField
            label="ตำแหน่ง หรือ งานที่ฉันทำ"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('job')}
          />
          <TextField
            label="ชื่อบริษัท"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('company')}
          />
          <Divider sx={{ marginTop: 2 }}>
            <Typography variant="body2">เกี่ยวกับฉัน</Typography>
          </Divider>
          <TextField
            label="บรรทัด 1"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('bio1')}
          />
          <TextField
            label="บรรทัด 2"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('bio2')}
          />
          <TextField
            label="บรรทัด 3"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('bio3')}
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
      </Box>
    </PopupWrapper>
  );
};

export default EditCard;
