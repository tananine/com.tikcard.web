import { useCallback, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PopupWrapper from 'components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { editContactDynamicToggle } from 'stores/popup';
import { reloadContactList } from 'stores/reload';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import usePost from 'hooks/axios/usePost';
import usePut from 'hooks/axios/usePut';
import profileService from 'data/jsons/services/profile.service.json';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import PhoneAPP from 'assets/images/phone.png';

const EditContact = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [addContactAction, addContactLoading] = usePost(
    profileService.contactData
  );
  const [updateContactAction, updateContactLoading] = usePut(
    profileService.contactData
  );

  const addContactListHeight = useSelector(
    (state) => state.layout.addContactListHeight
  );

  const appData = {
    profileId: useSelector((state) => state.controller.profileInUse.profileId),
    contactId: useSelector((state) => state.editContactDynamic.data.contactId),
    contactItemId: useSelector(
      (state) => state.editContactDynamic.data.contactItemId
    ),
    name: useSelector((state) => state.editContactDynamic.data.name),
    contact: useSelector((state) => state.editContactDynamic.data.contact),
  };

  const isChild = useSelector((state) => state.editContactDynamic.isChild);

  const open = useSelector((state) => state.popup.editContactDynamicPopup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setValue('contact', appData.contact);
    }
  }, [setValue, appData.contact, open]);

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  const closePopupHandler = () => {
    dispatch(editContactDynamicToggle());
    dispatch(reloadContactList());
  };

  const save = (form) => {
    const body = {
      profileId: appData.profileId,
      contactId: appData.contactId,
      contactItemId: appData.contactItemId,
      urlUnique: form.contact,
    };
    if (appData.contactId) {
      return updateContactAction(body).then(() => {
        closePopupHandler();
      });
    }
    return addContactAction(body).then(() => {
      closePopupHandler();
    });
  };

  return (
    <PopupWrapper
      open={open}
      onClose={editContactDynamicToggleHandler}
      onOpen={editContactDynamicToggleHandler}
    >
      <Box
        height={isChild ? `calc(${addContactListHeight}px - 38px)` : 'auto'}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h2">{appData.name}</Typography>
            <Button>ตัวอย่างเมื่อคลิก</Button>
          </Box>
          <Box textAlign="center" padding={2}>
            <img src={PhoneAPP} alt="" width="70px" height="70px" />
          </Box>
          <TextField variant="outlined" fullWidth {...register('contact')} />
          <Button
            sx={{
              marginTop: 1,
              marginBottom: 4,
              display: 'flex',
              marginX: 'auto',
            }}
            endIcon={<InfoOutlinedIcon />}
          >
            คำแนะนำ
          </Button>
        </Box>
        <Box>
          <LoadingButton
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={handleSubmit(save)}
            loading={addContactLoading || updateContactLoading}
          >
            บันทึก
          </LoadingButton>
        </Box>
      </Box>
    </PopupWrapper>
  );
};

export default EditContact;
