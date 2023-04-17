import { useCallback, useEffect, useState } from 'react';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editCardToggle } from '@/stores/popup';
import { reloadCurrentProfile } from '@/stores/reload';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import useGet from '@/hooks/axios/useGet';
import usePut from '@/hooks/axios/usePut';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import ProfileImageHead from '@/components/popup/popups/edit-card/ProfileImageHead';
import { LoadingButton } from '@mui/lab';

import toast from 'react-hot-toast';

const EditCard = () => {
  const [mainProfileImage, setMainProfileImage] = useState(null);
  const [subProfileImage, setSubProfileImage] = useState(null);

  const open = useSelector((state) => state.popup.editCardPopup);
  const profileId = useSelector(
    (state) => state.controller.profileInUse.profileId
  );

  const dispatch = useDispatch();

  const [getInformationAction] = useGet(profileServicePath.profileInformation);
  const [updateInformationAction, updateInformationLoading] = usePut(
    profileServicePath.profileInformation
  );

  const { register, handleSubmit, setValue } = useForm();

  const editCardToggleHandler = useCallback(() => {
    dispatch(editCardToggle());
  }, [dispatch]);

  useEffect(() => {
    if (profileId && open) {
      getInformationAction().then((res) => {
        setValue('cardName', res.data.cardName);
        setValue('name', res.data.name);
        setValue('work', res.data.work);
        setValue('company', res.data.company);
        setValue('position', res.data.position);
        setValue('address', res.data.address);
        setValue('bio', res.data.bio);
        setMainProfileImage(res.data.profileImage);
        setSubProfileImage(res.data.companyImage);
      });
    }
  }, [getInformationAction, profileId, setValue, open]);

  const save = async (form) => {
    const formData = new FormData();
    formData.append('cardName', form.cardName);
    formData.append('name', form.name);
    formData.append('work', form.work);
    formData.append('company', form.company);
    formData.append('position', form.position);
    formData.append('address', form.address);
    formData.append('bio', form.bio);

    if (mainProfileImage.split(':')[0] === 'blob') {
      const mainProfileImageBlob = await fetch(mainProfileImage);
      const mainProfileImageObject = await mainProfileImageBlob.blob();
      formData.append('profileImage', mainProfileImageObject);
    }
    if (subProfileImage.split(':')[0] === 'blob') {
      const subProfileImageBlob = await fetch(subProfileImage);
      const subProfileImageObject = await subProfileImageBlob.blob();
      formData.append('companyImage', subProfileImageObject);
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
          mainProfileImage={mainProfileImage}
          setMainProfileImage={setMainProfileImage}
          subProfileImage={subProfileImage}
          setSubProfileImage={setSubProfileImage}
        />
        <Box marginTop={8} display="flex" flexDirection="column" gap={2}>
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
      </Box>
    </PopupWrapper>
  );
};

export default EditCard;
