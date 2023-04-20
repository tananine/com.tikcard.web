import { useCallback, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PopupWrapper from '@/components/popup/PopupWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { addContactToggle, editContactDynamicToggle } from '@/stores/popup';
import { reloadContactList } from '@/stores/reload';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import openAppUri from '@/functions/openAppUri';

import usePost from '@/hooks/axios/usePost';
import usePut from '@/hooks/axios/usePut';
import useDelete from '@/hooks/axios/useDelete';
import profileServicePath from '@/data/jsons/services/profile.service.json';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import toast from 'react-hot-toast';

const EditContact = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [addContactAction, addContactLoading] = usePost(
    profileServicePath.contactData
  );
  const [updateContactAction, updateContactLoading] = usePut(
    profileServicePath.contactData
  );
  const [deleteContactAction, deleteContactLoading] = useDelete(
    profileServicePath.contactData
  );

  const addContactListHeight = useSelector(
    (state) => state.layout.addContactListHeight
  );

  const appData = {
    contactId: useSelector((state) => state.editContactDynamic.data.contactId),
    contactItemId: useSelector(
      (state) => state.editContactDynamic.data.contactItemId
    ),
    name: useSelector((state) => state.editContactDynamic.data.name),
    data: useSelector((state) => state.editContactDynamic.data.data),
    imageIcon: useSelector((state) => state.editContactDynamic.data.imageIcon),
    uri: useSelector((state) => state.editContactDynamic.data.uri),
    typeLayout: useSelector(
      (state) => state.editContactDynamic.data.typeLayout
    ),
  };

  const isChild = useSelector((state) => state.editContactDynamic.isChild);

  const open = useSelector((state) => state.popup.editContactDynamicPopup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setValue('data', appData.data);
    }
  }, [setValue, appData.data, open]);

  const editContactDynamicToggleHandler = useCallback(() => {
    dispatch(editContactDynamicToggle());
  }, [dispatch]);

  const closePopupHandler = () => {
    dispatch(editContactDynamicToggle());
    dispatch(reloadContactList());
  };

  const save = (form) => {
    const body = {
      contactId: appData.contactId,
      contactItemId: appData.contactItemId,
      data: form.data,
    };
    if (appData.contactId) {
      return updateContactAction(body).then(() => {
        closePopupHandler();
        toast.success('แก้ไขสำเร็จ');
      });
    }
    return addContactAction(body).then(() => {
      closePopupHandler();
      dispatch(addContactToggle());
      toast.success('เพิ่มสำเร็จ');
    });
  };

  const deleteContact = () => {
    deleteContactAction(appData.contactId).then(() => {
      closePopupHandler();
      toast.success('ลบสำเร็จ');
    });
  };

  const goContact = () => {
    if (getValues('data')) {
      openAppUri(
        appData.uri.defaultUri,
        appData.uri.androidUri,
        appData.uri.iosUri,
        getValues('data')
      );
    } else {
      alert('กรุณากรอกข้อมูลติดต่อ');
    }
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
            <Button onClick={goContact}>ตัวอย่างเมื่อคลิก</Button>
          </Box>
          <Box textAlign="center" padding={2}>
            <img src={appData.imageIcon} alt="" width="70px" height="70px" />
          </Box>
          <TextField
            label={appData.name}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('data')}
          />
          {appData.typeLayout === 'block' && (
            <TextField
              label="Note"
              multiline
              rows={3}
              fullWidth
              sx={{ marginTop: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          )}
          <Button
            sx={{
              marginTop: 1,
              display: 'flex',
              marginX: 'auto',
            }}
            endIcon={<InfoOutlinedIcon />}
          >
            คำแนะนำ
          </Button>
        </Box>
        <Box textAlign="center">
          {appData.contactId && (
            <LoadingButton
              variant="text"
              color="error"
              sx={{ marginBottom: 2 }}
              onClick={deleteContact}
              loading={deleteContactLoading}
            >
              ลบ
            </LoadingButton>
          )}
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
